"use client";

import {FormEvent, useEffect, useState} from "react";
import {Department, departments} from "@/data/departments";
import FranceVisx from "@/components/FranceVisx";
import {DepartmentInformation} from "@/components/DepartmentInformation";
import {levenshteinDistance} from "@/lib/levenshteinDistance";
import MapModal from "@/components/MapModal";

export type GameStatus = "playing" | "correct" | "incorrect";
export type GameMode = "random" | "all101departments" | "inOrder";

// Sort departments by code in the correct sequence (01, 2A, 2B, 03, 04, etc.)
const sortDepartmentsByCode = (depts: Department[]): Department[] => {
  return [...depts].sort((a, b) => {
    // Handle special cases for Corsica (2A and 2B)
    if (a.code === "2A") return a.code.localeCompare("20") > 0 ? 1 : -1;
    if (a.code === "2B") return a.code.localeCompare("20") > 0 ? 1 : -1;
    if (b.code === "2A") return b.code.localeCompare("20") > 0 ? -1 : 1;
    if (b.code === "2B") return b.code.localeCompare("20") > 0 ? -1 : 1;
    
    // For all other cases, compare codes directly
    return a.code.localeCompare(b.code);
  });
};

export default function DepartmentGuessingGame() {
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [gameMode, setGameMode] = useState<GameMode>("all101departments");
  const [remainingDepartments, setRemainingDepartments] = useState<Department[]>([]);
  const [targetScore, setTargetScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderedDepartments, setOrderedDepartments] = useState<Department[]>([]);

  const initializeGame = () => {
    if (window === undefined) {
      selectRandomDepartment();
      setTargetScore(0);
      return;
    }
    
    if (gameMode === "random") {
      selectRandomDepartment();
      setTargetScore(0);
    } else if (gameMode === "all101departments") {
      const shuffledDepartments = [...departments].sort(() => Math.random() - 0.5);
      setRemainingDepartments(shuffledDepartments.slice(1));
      setCurrentDepartment(shuffledDepartments[0]);
      setTargetScore(101);
    } else if (gameMode === "inOrder") {
      const sorted = sortDepartmentsByCode(departments);
      setOrderedDepartments(sorted.slice(1));
      setCurrentDepartment(sorted[0]);
      setTargetScore(101);
    }
    
    setUserGuess("");
    setFeedback("");
    setGameStatus("playing");
    setGameCompleted(false);
  };

  const selectRandomDepartment = () => {
    if (gameMode === "random") {
      // Random mode: select a random department
      const randomIndex = Math.floor(Math.random() * departments.length);
      setCurrentDepartment(departments[randomIndex]);
    } else if (gameMode === "all101departments") {
      // All 101 departments mode: select from remaining shuffled departments
      if (remainingDepartments.length === 0) {
        // If no departments remain, select a random one
        const randomIndex = Math.floor(Math.random() * departments.length);
        setCurrentDepartment(departments[randomIndex]);
      } else {
        // Select the next department from the shuffled list
        const randomIndex = Math.floor(Math.random() * remainingDepartments.length);
        const nextDepartment = remainingDepartments[randomIndex];
        setCurrentDepartment(nextDepartment);

        const updatedRemainingDepartments = [...remainingDepartments];
        updatedRemainingDepartments.splice(randomIndex, 1);
        setRemainingDepartments(updatedRemainingDepartments);
      }
    } else if (gameMode === "inOrder") {
      // In Order mode: select the next department in sequence
      if (orderedDepartments.length === 0) {
        // If no departments remain, restart with the first department
        const sorted = sortDepartmentsByCode(departments);
        setCurrentDepartment(sorted[0]);
        setOrderedDepartments(sorted.slice(1));
      } else {
        // Select the first department from the ordered list
        const nextDepartment = orderedDepartments[0];
        setCurrentDepartment(nextDepartment);

        const updatedOrderedDepartments = [...orderedDepartments];
        updatedOrderedDepartments.shift(); // Remove the first element
        setOrderedDepartments(updatedOrderedDepartments);
      }
    }
    
    setUserGuess("");
    setFeedback("");
    setGameStatus("playing");
  };

  const handleGameModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as GameMode;
    setGameMode(newMode);
    setScore(0);
    setTotalGuesses(0);
    // Re-initialize the game with the new mode
    setTimeout(() => {
      if (newMode === "random") {
        selectRandomDepartment();
        setTargetScore(0);
      } else if (newMode === "all101departments") {
        const shuffledDepartments = [...departments].sort(() => Math.random() - 0.5);
        setRemainingDepartments(shuffledDepartments.slice(1));
        setCurrentDepartment(shuffledDepartments[0]);
        setTargetScore(101);
      } else if (newMode === "inOrder") {
        const sorted = sortDepartmentsByCode(departments);
        setOrderedDepartments(sorted.slice(1));
        setCurrentDepartment(sorted[0]);
        setTargetScore(101);
      }
      setGameCompleted(false);
    }, 0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!currentDepartment) return;
    
    setTotalGuesses(totalGuesses + 1);
    
    // Check if the guess is correct or close enough (using Levenshtein distance)
    const trimmedGuess = userGuess.trim().toLowerCase();
    const correctAnswer = currentDepartment.name.toLowerCase();
    
    // Calculate Levenshtein distance
    const distance = levenshteinDistance(trimmedGuess, correctAnswer);
    
    // Determine threshold based on the length of the department name
    // Allow approximately 20% error margin with a minimum of 1
    const threshold = Math.max(1, Math.floor(correctAnswer.length * 0.2));
    
    let isCorrect = false;
    
    if (distance === 0) {
      // Perfect match
      setFeedback("Correct! " + currentDepartment.code + " is indeed " + currentDepartment.name + ".");
      setScore(score + 1);
      setGameStatus("correct");
      isCorrect = true;
    } else if (distance <= threshold) {
      // Close enough (within threshold)
      setFeedback("Close enough! " + currentDepartment.code + " is " + currentDepartment.name + ". Your answer was very close.");
      setScore(score + 1);
      setGameStatus("correct");
      isCorrect = true;
    } else {
      // Too far off
      setFeedback("Incorrect. " + currentDepartment.code + " stands for " + currentDepartment.name + ".");
      setGameStatus("incorrect");
    }
    
    // Check if game is completed (reached target score in all101departments mode)
    if (gameMode === "all101departments" && totalGuesses + 1 >= targetScore) {
      setGameCompleted(true);
      setFeedback(prevFeedback => prevFeedback + ` Congratulations! You've correctly guessed ${score} departments!`);
    }
  };

  const handleNextRound = () => {
    if (gameCompleted && gameMode === "all101departments") {
      return;
    }
    selectRandomDepartment();
  };

  const handleReset = () => {
    setScore(0);
    setTotalGuesses(0);
    setGameCompleted(false);
    
    // Re-initialize the game with the current mode
    if (gameMode === "random") {
      selectRandomDepartment();
    } else {
      const shuffledDepartments = [...departments].sort(() => Math.random() - 0.5);
      setRemainingDepartments(shuffledDepartments.slice(1));
      setCurrentDepartment(shuffledDepartments[0]);
    }
  };

  if (!currentDepartment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-around">
      <div className="w-full max-w-md mx-auto p-6 bg-background border border-foreground/10 rounded-lg shadow-md">
        <div className="flex flex-col justify-between items-center mb-4">
          <div className="flex gap-2 items-center justify-start">
            <label htmlFor="gameMode">Game Mode:</label>
            <div className="flex items-center">
              <select
                id="gameMode"
                name="gameMode"
                value={gameMode}
                onChange={handleGameModeChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
              >
                <option value="random">Random Mode</option>
                <option value="all101departments">All {departments.length} Departments Mode</option>
                <option value="inOrder">In Order Mode</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="my-6">
          <p className="text-sm mb-2">Score: {score} / {gameMode === "all101departments" ? `${targetScore} (${totalGuesses} guessed)` : totalGuesses}</p>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: totalGuesses > 0 ? `${(score / totalGuesses) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">What department has this code?</p>
          <p className="text-4xl font-bold">{currentDepartment.code}</p>
        </div>

        {gameCompleted ? (
          <div className="text-center">
            <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="font-bold mb-2">Congratulations! 🎉</p>
              <p>{`You've successfully guessed ${score} departments!`}</p>
              <p className="mt-2">Final Score: {score}/{totalGuesses}</p>
              <p className="text-sm mt-2">Accuracy: {Math.round((score / totalGuesses) * 100)}%</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            >
              Play Again
            </button>
          </div>
        ) : gameStatus === "playing" ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter department name..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Guess
            </button>
          </form>
        ) : (
          <div>
            <p className={`text-center text-orange-500 font-semibold`}>
              Your input: {userGuess}
            </p>
            <p className={`text-center mb-4 ${gameStatus === "correct" ? "text-green-500" : "text-red-500"} font-semibold`}>
              {feedback}
            </p>

            {gameStatus === "correct" && currentDepartment && (
              <DepartmentInformation currentDepartment={currentDepartment} />
            )}

            <button
              onClick={handleNextRound}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus={gameStatus === "correct" || gameStatus === "incorrect"}
              disabled={gameCompleted}
            >
              Next Department
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Reset Game
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{`Try to guess all ${departments.length} French departments from their codes!`}</p>
        </div>
      </div>

      {currentDepartment && (
        <div className="flex flex-col items-center">
          <FranceVisx currentDepartment={currentDepartment} gameStatus={gameStatus} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Show Fullscreen Map
          </button>
          
          <MapModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mapType="france"
            currentDepartment={currentDepartment}
            gameStatus={gameStatus}
          />
        </div>
      )}
    </div>
  );
}