"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/questioNFL_logo_profile_3.png"
import gavinLogo from "../../assets/gavin_profile_pic.png"
import jamesLogo from "../../assets/jamesprofile.png"
import sethLogo from "../../assets/seth_profile_pic.png"
import nickLogo from "../../assets/nick_profile_2.png"
import tiktok from "../../assets/tiktok-icon-free-png.webp"
import instagram from "../../assets/instragram_lgoo.webp"
import "./AboutUs.css"
const AboutUs: React.FC = () => {
  return (
    <div className="bg-picker min-h-screen bg-cover bg-center bg-fixed font-sans text-center text-[#222]">
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
      <header className="flex justify-center">
        <a href="home.html">
            <Image src={logo} alt="MatchPoint Logo" width={1000}/>

        </a>
      </header>

      {/* Article */}
      <article className="bg-white/90 text-left m-8 p-8 rounded-2xl max-w-3xl mx-auto shadow-lg leading-relaxed">
        <h1 className="text-2xl font-bold text-[#9d6718] mb-5 text-center">About Us</h1>
        <p className="mb-4">
          At <strong className="text-green-700">QuestioNFL</strong>, we believe that fantasy football is more than just a
          game, it’s a way to connect, grow, and build lasting friendships. But sometimes determining a player's health
          can be challenging.
        </p>
        <p className="mb-4">
          That’s why we created QuestioNFL: a platform designed give the top of the line statistics on a player's{" "}
          <strong className="text-green-700">health, history, rating on returning, and much more.</strong>
        </p>
        <p>
          Our mission is to provide users with a reliable source on whether a player is looking good to{" "}
          <strong className="text-green-700">play</strong> this upcoming week. We have top of the line{" "}
          <strong className="text-green-700">statisticians and coders</strong> to get you the right info to win your
          next fantasy football game!
        </p>
      </article>

      {/* Creators Section */}
      <section className="bg-white/95 m-8 p-10 rounded-2xl max-w-5xl mx-auto shadow-lg">
        <h2 className="text-xl font-semibold text-[#9d6718] mb-8 text-center">Meet the Developers</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Gavin Frankberg",
              img: gavinLogo,
              desc: "University of Pittsburgh student, graduating in 2027, implemented Front End and Back End for QuestioNFL, and loves the Eagles!",
            },
            {
              name: "Nick Marra",
              img: nickLogo,
              desc: "Proud Pitt panther, graduating in 2028, instrumental in backend development and overall product design. Wants to remind everyone that the Steelers have won 6 super bowls.",
            },
            {
              name: "Seth Omeike",
              img: sethLogo,
              desc: "Student at CWRU, graduating in 2027. I enjoy watching movies and I helped preprocess and design the statistical model.",
            },
            {
              name: "James Casella",
              img: jamesLogo,
              desc: "Student at Pitt, graduating in 2028. Big Steelers fan and helped design the frontend part of the website.",
            },
          ].map((creator, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md w-64 p-6 text-center hover:-translate-y-2 transition-transform"
            >
                <Image width={112} height={112} src={creator.img} alt={creator.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-[#9d6718]"/>
              <h3 className="text-lg font-semibold text-[#9d6718]">{creator.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{creator.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white/90 m-8 p-8 rounded-2xl max-w-3xl mx-auto shadow-lg text-center">
        <h2 className="text-xl font-semibold text-[#9d6718] mb-4">Follow Us</h2>
        <p className="text-gray-600 mb-6">Stay connected with QuestioNFL through our socials!</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.tiktok.com/@questionfl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tiktok_Account"
          >
            <Image src={tiktok} alt="" className="w-10 h-10 hover:scale-110 hover:opacity-80 transition"/>

          </a>
          <a
            href="https://www.instagram.com/_questionfl_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image src={instagram} alt="" className="w-10 h-10 hover:scale-110 hover:opacity-80 transition" />

          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
