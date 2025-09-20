import React, { useEffect, useState } from "react";
import axios from "axios";

const JokeGen = () => {
  const [joke, setJoke] = useState("Loading joke...");

  const fetchJoke = async () => {
    try {
      const res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      setJoke(res.data.joke);
    } catch (err) {
      setJoke("Oops! Couldn't fetch a joke.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1483104879057-379b6c2fe5a2?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=')",
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4 drop-shadow-lg text-center">
        Joke Generator
      </h1>
      <hr className="w-3/4 sm:w-2/3 md:w-1/2 border-gray-400 opacity-50 mb-8" />

      <div className="bg-black/60 text-white w-full sm:w-3/4 md:w-1/2 lg:w-2/5 p-6 sm:p-8 rounded-lg shadow-lg text-center">
        <p className="text-base sm:text-lg md:text-xl font-serif tracking-wide leading-relaxed italic">
          {joke}
        </p>
      </div>

      <button
        onClick={fetchJoke}
        className="mt-8 px-6 py-2 sm:px-8 sm:py-3 bg-black/70 text-white border border-white rounded-lg transition duration-300 hover:bg-white hover:text-black hover:border-black text-sm sm:text-base"
      >
        New Joke
      </button>
    </div>
  );
};

export default JokeGen;