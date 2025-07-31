"use client";

import { useState } from "react";
import StateGuessingGame from "@/components/StateGuessingGame";
import DepartmentGuessingGame from "@/components/DepartmentGuessingGame";

type GameType = "usa" | "france";

export default function Home() {
  const [gameType, setGameType] = useState<GameType>("usa");

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <header className="row-start-1 w-full flex flex-col justify-center items-center py-4 gap-4">
        <h1 className="text-3xl font-bold">
          {gameType === "usa" ? "USA State Guessing Game" : "French Department Guessing Game"}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setGameType("usa")}
            className={`px-4 py-2 rounded-md ${
              gameType === "usa"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            USA States
          </button>
          <button
            onClick={() => setGameType("france")}
            className={`px-4 py-2 rounded-md ${
              gameType === "france"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            French Departments
          </button>
        </div>
      </header>
      
      <main className="row-start-2 w-full flex flex-col items-center justify-center">
        {gameType === "usa" ? <StateGuessingGame /> : <DepartmentGuessingGame />}
      </main>
      
      <footer className="row-start-3 flex flex-col flex-wrap items-center justify-center mt-8">
        {gameType === "usa" ? (
          <>
            <p className="text-sm text-gray-500">
              Test your knowledge of US state abbreviations!
            </p>
            <p className="text-sm text-gray-500 flex gap-1">
              <span>Learn:</span>
              <a href="https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States" target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">
                https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              Test your knowledge of French department codes!
            </p>
            <p className="text-sm text-gray-500 flex gap-1">
              <span>Learn:</span>
              <a href="https://en.wikipedia.org/wiki/Departments_of_France" target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">
                https://en.wikipedia.org/wiki/Departments_of_France
              </a>
            </p>
          </>
        )}
      </footer>
    </div>
  );
}
