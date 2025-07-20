"use client";

import StateGuessingGame from "@/components/StateGuessingGame";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <header className="row-start-1 w-full flex justify-center items-center py-4">
        <h1 className="text-3xl font-bold">USA State Guessing Game</h1>
      </header>
      
      <main className="row-start-2 w-full flex flex-col items-center justify-center">
        <StateGuessingGame />
      </main>
      
      <footer className="row-start-3 flex flex-col flex-wrap items-center justify-center mt-8">
        <p className="text-sm text-gray-500">
          Test your knowledge of US state abbreviations!
        </p>
        <p className="text-sm text-gray-500 flex gap-1">
          <span>Learn:</span>
          <a href="https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States" target="_blank" className="text-blue-500 hover:underline" rel="noreferrer">
            https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States
          </a>
        </p>
      </footer>
    </div>
  );
}
