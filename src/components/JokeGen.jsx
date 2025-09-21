import React, { useEffect, useState } from "react";
import axios from "axios";

import drumSound from "../assets/sounds/joke-drum-effect.mp3";
import laughTrack from "../assets/sounds/90s-sitcom-laugh-track.mp3";
import cricket from "../assets/sounds/cricket.m4a";

import bg from '../assets/backgrounds/microphone.png';

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

  // Sound effect mapping
  const sounds = [
    { key: "a", audio: new Audio(drumSound) },
    { key: "s", audio: new Audio(laughTrack) },
    { key: "d", audio: new Audio(cricket) },
  ];

  // Play sound function
  const playSound = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  // Handle keypress
  const handleKeyPress = (e) => {
    const sound = sounds.find((s) => s.key === e.key.toLowerCase());
    if (sound) playSound(sound.audio);
  };

  useEffect(() => {
    fetchJoke();
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      
      <h1 className="text-3xl w-1/2 bg-black/70 sm:text-4xl md:text-5xl font-serif text-white tracking-wide mb-4 drop-shadow-lg text-center p-8">
        Joke Generator
      </h1>
      <hr className="w-3/4 sm:w-2/3 md:w-1/2 border-gray-400 opacity-50 mb-8" />

      <div className="bg-black/70 text-white w-full sm:w-3/4 md:w-1/2 lg:w-2/5 p-6 sm:p-8 rounded-lg shadow-lg text-center">
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

      {/* Sound Buttons */}
      <div className="mt-6 flex gap-4">
        {sounds.map((s, index) => (
          <button
            key={index}
            onClick={() => playSound(s.audio)}
            className="border border-white bg-black/70 text-black text-xl p-4 rounded-full hover:bg-gray-200 transition duration-300 flex items-center justify-center"
          >
            {index === 0 && "🥁"}
            {index === 1 && "😂"}
            {index === 2 && "🦗"}
            <span className="sr-only">Play sound {index + 1}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-white text-sm italic bg-black/70 p-4">
        Press <strong>A</strong>, <strong>S</strong>, or <strong>D</strong> to play sounds
      </p>

      {/* Bottom-right links */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 text-sm">
        <a
          href="https://icanhazdadjoke.com/submit"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/80 hover:bg-white text-black px-3 py-1 rounded transition"
        >
          Wanna submit a new joke? Go here
        </a>
        <a
          href="https://github.com/your-repo" // replace with your PR link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/80 hover:bg-white text-black px-3 py-1 rounded transition"
        >
          Or open a pull request here
        </a>
      </div>
    </div>
  );
};

export default JokeGen;
