"use client"

import { useEffect, useState } from "react"
import LottiePlayer from "react-lottie-player"

export default function FirebarAnimation({ className }: { className?: string }) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    const url = "/firebar-animation.json?v=3"
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error))
  }, [])

  return (
    <div
      className={`transform-gpu ${className || "w-full h-[200px] md:h-[300px]"}`}
      style={{ background: "transparent" }}
    >
      {animationData ? (
        <LottiePlayer
          loop
          animationData={animationData}
          play
          renderer="svg"
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            clearCanvas: true,
            progressiveLoad: false,
            hideOnTransparent: true,
          }}
        />
      ) : (
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  )
}

