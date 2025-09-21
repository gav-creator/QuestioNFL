"use client";
import React from "react";
import logo from "../../assets/questioNFL_logo_profile_3.png"
import Image from "next/image";
import "./Home.css"
const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-center bg-gradient-to-r from-[#774e11] to-[#61461e] shadow-md sticky top-0 z-50">
        <a
          href="./"
          className="px-5 py-4 text-white hover:bg-[#be240c] transition"
        >
          Home
        </a>
        <a
          href="/aboutUs"
          className="px-5 py-4 text-white hover:bg-[#be240c] transition"
        >
          About Us
        </a>
        <a
          href="/players"
          className="px-5 py-4 text-white hover:bg-[#be240c] transition"
        >
          Players
        </a>
        <a
          href="/search"
          className="px-5 py-4 text-white hover:bg-[#be240c] transition"
        >
          Search
        </a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative flex-1 bg-cover bg-center bg-fixed flex items-center justify-center px-5 py-10">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-3xl text-center">
          <header className="flex justify-center mb-6">
            <a href="">
                <Image src={logo}  alt="MatchPoint Logo"/>
            </a>
          </header>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Track Questionable NFL Player Injuries & Status Updates
          </h1>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            Stay ahead of the game with real-time injury reports, predictions,
            and updates for every questionable NFL player.
          </p>
          <a
            href="players.html"
            className="bg-[#be240c] hover:bg-[#9d5d09] text-white px-7 py-3 text-lg rounded-lg transition"
          >
            View Players
          </a>
        </div>
      </section>

      {/* Intro Article */}
      <article className="bg-white text-gray-900 mx-auto my-8 p-8 rounded-xl max-w-3xl shadow-xl text-left leading-relaxed">
        <h2 className="text-2xl font-semibold text-center text-[#9d6718] mb-4">
          Welcome to QuestioNFL
        </h2>
        <p>
          QuestioNFL is your hub for monitoring NFL player injuries and
          statuses. Browse through questionable players to get the insights you
          need. Whether you're managing fantasy football or just staying
          updated, we've got you covered!!!
        </p>
      </article>
    </div>
  );
};

export default Home;
