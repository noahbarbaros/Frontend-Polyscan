"use client";

import { useEffect, useState } from "react";
import LottiePlayer from "react-lottie-player";

export default function HeroSection() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Load the local blue animation file
    fetch("/firebar-animation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) =>
        console.error("Error loading Lottie animation:", error)
      );
  }, []);

  return (
    <section className="bg-[#0A0A1A] min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full h-[400px] transform-gpu">
        {animationData && (
          <LottiePlayer
            loop
            animationData={animationData}
            play
            style={{ width: "100%", height: "400px" }}
          />
        )}
      </div>
    </section>
  );
}