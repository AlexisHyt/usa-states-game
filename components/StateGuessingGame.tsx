"use client";

import {FormEvent, useEffect, useState} from "react";
import {State, states} from "@/data/states";
import USAVisx from "@/components/USAVisx";
import {StateInformation} from "@/components/StateInformation";
import {levenshteinDistance} from "@/lib/levenshteinDistance";

export type GameStatus = "playing" | "correct" | "incorrect";
export type GameMode = "random" | "all50states";

export default function StateGuessingGame() {
  const [currentState, setCurrentState] = useState<State | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [gameMode, setGameMode] = useState<GameMode>("all50states");
  const [remainingStates, setRemainingStates] = useState<State[]>([]);
  const [targetScore, setTargetScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const initializeGame = () => {
    if (gameMode === "random" || window === undefined) {
      selectRandomState();
      setTargetScore(0);
    } else {
      const shuffledStates = [...states].sort(() => Math.random() - 0.5);
      setRemainingStates(shuffledStates.slice(1));
      setCurrentState(shuffledStates[0]);
      setTargetScore(50);
    }
    setUserGuess("");
    setFeedback("");
    setGameStatus("playing");
    setGameCompleted(false);
  };

  const selectRandomState = () => {
    if (gameMode === "random" || remainingStates.length === 0) {
      const randomIndex = Math.floor(Math.random() * states.length);
      setCurrentState(states[randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * remainingStates.length);
      const nextState = remainingStates[randomIndex];
      setCurrentState(nextState);

      const updatedRemainingStates = [...remainingStates];
      updatedRemainingStates.splice(randomIndex, 1);
      setRemainingStates(updatedRemainingStates);
    }
    setUserGuess("");
    setFeedback("");
    setGameStatus("playing");
  };

  const handleGameModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = e.target.checked ? "all50states" : "random";
    setGameMode(newMode);
    setScore(0);
    setTotalGuesses(0);
    // Re-initialize the game with the new mode
    setTimeout(() => {
      if (newMode === "random") {
        selectRandomState();
        setTargetScore(0);
      } else {
        const shuffledStates = [...states].sort(() => Math.random() - 0.5);
        setRemainingStates(shuffledStates.slice(1));
        setCurrentState(shuffledStates[0]);
        setTargetScore(50);
      }
      setGameCompleted(false);
    }, 0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!currentState) return;
    
    setTotalGuesses(totalGuesses + 1);
    
    // Check if the guess is correct or close enough (using Levenshtein distance)
    const trimmedGuess = userGuess.trim().toLowerCase();
    const correctAnswer = currentState.name.toLowerCase();
    
    // Calculate Levenshtein distance
    const distance = levenshteinDistance(trimmedGuess, correctAnswer);
    
    // Determine threshold based on the length of the state name
    // Allow approximately 20% error margin with a minimum of 1
    const threshold = Math.max(1, Math.floor(correctAnswer.length * 0.2));
    
    let isCorrect = false;
    
    if (distance === 0) {
      // Perfect match
      setFeedback("Correct! " + currentState.abbreviation + " is indeed " + currentState.name + ".");
      setScore(score + 1);
      setGameStatus("correct");
      isCorrect = true;
    } else if (distance <= threshold) {
      // Close enough (within threshold)
      setFeedback("Close enough! " + currentState.abbreviation + " is " + currentState.name + ". Your answer was very close.");
      setScore(score + 1);
      setGameStatus("correct");
      isCorrect = true;
    } else {
      // Too far off
      setFeedback("Incorrect. " + currentState.abbreviation + " stands for " + currentState.name + ".");
      setGameStatus("incorrect");
    }
    
    // Check if game is completed (reached target score in all50states mode)
    if (isCorrect && gameMode === "all50states" && score + 1 >= targetScore) {
      setGameCompleted(true);
      setFeedback(prevFeedback => prevFeedback + " Congratulations! You've correctly guessed all 50 states!");
    }
  };

  const handleNextRound = () => {
    if (gameCompleted && gameMode === "all50states") {
      return;
    }
    selectRandomState();
  };

  const handleReset = () => {
    setScore(0);
    setTotalGuesses(0);
    setGameCompleted(false);
    
    // Re-initialize the game with the current mode
    if (gameMode === "random") {
      selectRandomState();
    } else {
      const shuffledStates = [...states].sort(() => Math.random() - 0.5);
      setRemainingStates(shuffledStates.slice(1));
      setCurrentState(shuffledStates[0]);
    }
  };

  if (!currentState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-around">
      <div className="w-full max-w-md mx-auto p-6 bg-background border border-foreground/10 rounded-lg shadow-md">
        <div className="flex flex-col justify-between items-center mb-4">
          <div className="flex gap-2 items-center justify-start">
            <label htmlFor="gameMode">Game Mode:</label>
            <div className="flex items-center">
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="gameMode"
                  name="gameMode"
                  checked={gameMode === "all50states"}
                  onChange={handleGameModeChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  style={{
                    right: gameMode === "all50states" ? "0" : "auto",
                    transition: "right 0.2s ease-in-out",
                    borderColor: gameMode === "all50states" ? "#3B82F6" : "#D1D5DB"
                  }}
                />
                <label
                  htmlFor="gameMode"
                  className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: gameMode === "all50states" ? "#3B82F6" : "#D1D5DB"
                  }}
                ></label>
              </div>
              <span>
                {gameMode === "random" ? "Random Mode" : "All 50 States Mode"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="my-6">
          <p className="text-sm mb-2">Score: {score} / {gameMode === "all50states" ? `${targetScore} (${totalGuesses} guessed)` : totalGuesses}</p>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: totalGuesses > 0 ? `${(score / totalGuesses) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">What state has this abbreviation?</p>
          <p className="text-4xl font-bold">{currentState.abbreviation}</p>
        </div>

        {gameCompleted ? (
          <div className="text-center">
            <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="font-bold mb-2">Congratulations! 🎉</p>
              <p>You&apos;ve successfully guessed all 50 states!</p>
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
                placeholder="Enter state name..."
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

            {gameStatus === "correct" && currentState && (
              <StateInformation currentState={currentState} />
            )}

            <button
              onClick={handleNextRound}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus={gameStatus === "correct" || gameStatus === "incorrect"}
              disabled={gameCompleted}
            >
              Next State
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
          <p>{`Try to guess all ${states.length} US states from their abbreviations!`}</p>
        </div>
      </div>

      {currentState && (
        <USAVisx currentState={currentState} gameStatus={gameStatus} />
      )}
    </div>
  );
}