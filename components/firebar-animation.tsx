"use client"

import { useEffect, useState } from "react"
import LottiePlayer from "react-lottie-player"

export default function FirebarAnimation() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    fetch("/firebar-animation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error))
  }, [])

  return (
    <div className="w-full h-[200px] md:h-[300px] transform-gpu">
      {animationData && (
        <LottiePlayer
          loop
          animationData={animationData}
          play
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  )
}

