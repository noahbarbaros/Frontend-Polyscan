"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FirebarAnimation from "@/components/firebar-animation"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Handle waitlist signup here
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-transparent rounded-full blur-3xl" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] opacity-40" />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      <div className="absolute bottom-0 left-0 w-full h-[30vh] z-0 pointer-events-none">
        <FirebarAnimation className="w-full h-full opacity-50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-20 md:pt-36 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center w-full">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-2">
            Polyscan.trade
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 font-mono max-w-2xl mx-auto leading-relaxed mt-8 tracking-wide uppercase">
            First ever in-depth platform for prediction market analysis.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md w-full mt-12">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-none h-12 text-sm font-mono tracking-wide focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-white text-black hover:bg-blue-500 hover:text-white rounded-none h-12 px-8 font-bold uppercase tracking-wide transition-all duration-300"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="max-w-md w-full mt-12 p-6 bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-white text-lg font-mono tracking-tight text-center uppercase">
                <span className="text-blue-400 mr-2">✓</span> You're on the list
              </p>
            </div>
          )}

          <div className="absolute bottom-1/3 w-full left-0 flex gap-12 justify-center text-xs md:text-sm text-neutral-500 font-mono uppercase tracking-widest">
            <div className="text-center">
              <p className="mb-1 text-white">Copy</p>
              <p>Trading</p>
            </div>
            <div className="text-center border-l border-white/10 pl-12">
              <p className="mb-1 text-white">Sentiment</p>
              <p>Analysis</p>
            </div>
            <div className="text-center border-l border-white/10 pl-12">
              <p className="mb-1 text-white">Real Time</p>
              <p>Data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
