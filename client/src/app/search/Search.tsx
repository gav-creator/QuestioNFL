"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/matchpoint_logo_2.png";
import "./Search.css";

const positions = ["DL","FB","LB","OL","QB","RB","ST","TE","WR"];
const gameDesignations = [
  "C19",
  "Doubtful",
  "Injured Reserve",
  "Out",
  "Physically Unable to Perform",
  "Questionable",
  "C19 Opt-Out"
];
const injuries = [
  "Achilles","Ankle","Back","Biceps","C19","C19 Opt-Out","Calf","Chest","Concussion","Core","Elbow",
  "Finger","Foot","Glute","Groin","Hamstring","Hamstrings","Hand","Hip","Knee","Left Calf","Left Groin",
  "Left Thumb","Liver","Neck","Oblique","Pectoral","Quadricep","Rib","Ribs","Right Groin","Right Knee",
  "Right Quadricep","Right Shoulder","Right Thumb","Shin","Shoulder","Stinger","Thigh","Thumb","Toe","Triceps","Wrist"
];

const Search: React.FC = () => {
  const [features, setFeatures] = useState({
    Age: 25,
    start_snap: 0,
    weight: 200,
    position: "",
    game_designation: "",
    started: false,
    injury_type: ""
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(features)
      const res = await fetch("api/model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error(err);
      setPrediction("Error fetching prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-picker min-h-screen font-sans text-center bg-cover bg-center bg-fixed">
      {/* Navbar */}
      <nav className="flex justify-center bg-gradient-to-r from-[#774e11] to-[#61461e] shadow-md sticky top-0 z-50">
        <a href="./" className="px-5 py-4 text-white hover:bg-[#be240c] transition">Home</a>
        <a href="/aboutUs" className="px-5 py-4 text-white hover:bg-[#be240c] transition">About Us</a>
        <a href="/players" className="px-5 py-4 text-white hover:bg-[#be240c] transition">Players</a>
        <a href="/search" className="px-5 py-4 text-white hover:bg-[#be240c] transition">Search</a>
      </nav>

      {/* Logo */}
      <header className="flex justify-center">
        <a href="./">
          <Image src={logo} alt="Matchpoint logo" className="w-4/5 max-w-[820px] h-auto my-10" />
        </a>
      </header>

      {/* Feature input form */}
      <article className="text-black bg-white/90 m-8 p-8 rounded-2xl max-w-3xl mx-auto shadow-lg text-left">
        <h1 className="text-2xl font-bold text-[#9d6718] mb-6">Predict Weeks Missed</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Numeric inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1">
              Age:
              <input
                type="number"
                value={features.Age}
                onChange={(e) => handleChange("Age", Number(e.target.value))}
                className="ml-2 border rounded px-2 py-1 w-full"
              />
            </label>
            <label className="flex-1">
              Weight:
              <input
                type="number"
                value={features.weight}
                onChange={(e) => handleChange("weight", Number(e.target.value))}
                className="ml-2 border rounded px-2 py-1 w-full"
              />
            </label>
            <label className="flex-1">
              Start Snap:
              <input
                type="number"
                value={features.start_snap}
                onChange={(e) => handleChange("start_snap", Number(e.target.value))}
                className="ml-2 border rounded px-2 py-1 w-full"
              />
            </label>
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <label className="flex-1">
              Position:
              <select
                value={features.position}
                onChange={(e) => handleChange("position", e.target.value)}
                className="ml-2 border rounded px-2 py-1 w-full"
              >
                <option value="">Select</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </label>

            <label className="flex-1">
              Game Designation:
              <select
                value={features.game_designation}
                onChange={(e) => handleChange("game_designation", e.target.value)}
                className="ml-2 border rounded px-2 py-1 w-full"
              >
                <option value="">Select</option>
                {gameDesignations.map((gd) => (
                  <option key={gd} value={gd}>{gd}</option>
                ))}
              </select>
            </label>

            <label className="flex-1">
              Started:
              <select
                value={features.started ? "Yes" : "No"}
                onChange={(e) => handleChange("started", e.target.value === "Yes")}
                className="ml-2 border rounded px-2 py-1 w-full"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </label>
          </div>

          <label className="mt-2">
            Injury Type:
            <select
              value={features.injury_type}
              onChange={(e) => handleChange("injury_type", e.target.value)}
              className="ml-2 border rounded px-2 py-1 w-full"
            >
              <option value="">Select</option>
              {injuries.map((inj) => (
                <option key={inj} value={inj}>{inj}</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-900 transition"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {/* Prediction result */}
        {prediction && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300 text-center">
            <strong>Predicted Weeks Missed:</strong> {prediction}
          </div>
        )}
      </article>
    </div>
  );
};

export default Search;
