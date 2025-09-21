"use client";
import React, { useEffect, useState } from "react";
import "./Players.css"
import Image from "next/image";
import logo from "../../assets/questioNFL_logo_profile_3.png"

interface Player {
  name: string;
  team?: string;
  position?: string;
  status?: string;
  injury?: string;
}

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Replace with your real API endpoint
        const response = await fetch(" ");
        const data: Player[] = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="bg-picker min-h-screen bg-[#055529] bg-cover bg-center bg-fixed text-center text-gray-900"
    >
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

      {/* Logo */}
      <header>
        <a href="./">
          <Image src={logo} alt="MatchPoint Logo" className="w-4/5 max-w-[820px] mx-auto my-10" />
          
        </a>
      </header>

      {/* Main Content */}
      <article className="bg-white/90 mx-auto my-8 p-8 rounded-2xl max-w-3xl shadow-lg text-center leading-relaxed">
        <h1 className="text-2xl font-bold mb-6 text-[#9d6718]">Players</h1>

        {loading ? (
          <p>Loading players...</p>
        ) : players.length === 0 ? (
          <p className="text-red-600">⚠️ Failed to load players or no players found.</p>
        ) : (
          <div className="space-y-4">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-xl p-4 shadow-md text-left"
              >
                <h2 className="text-lg font-semibold text-[#0f7a2e] mb-2">
                  {player.name}
                </h2>
                <p>
                  <strong>Team:</strong> {player.team || "N/A"}
                </p>
                <p>
                  <strong>Position:</strong> {player.position || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {player.status || "Unknown"}
                </p>
                <p>
                  <strong>Injury:</strong> {player.injury || "None"}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default Players;
