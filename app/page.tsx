"use client"

import { ShaderAnimation } from "@/components/ui/shader-animation"
import { ShaderBar } from "@/components/ui/shader-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-tight">
            Polyscan
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            The data layer that indexes, normalizes, and streams prediction market signals.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 text-base"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 h-12 px-6 font-semibold"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto mt-12 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <p className="text-white text-lg font-medium">
                🎉 You're on the list!
              </p>
              <p className="text-white/70 mt-2">
                We'll notify you when we launch.
              </p>
            </div>
          )}

          <div className="pt-12 flex gap-8 justify-center text-sm text-white/60">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Real-time</p>
              <p className="mt-1">Data Streaming</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Multi-chain</p>
              <p className="mt-1">Support</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Normalized</p>
              <p className="mt-1">Signals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <ShaderBar />
      </div>
    </div>
  )
}

