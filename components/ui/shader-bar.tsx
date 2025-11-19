"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader - Volume bars with hero colors
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;

      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float t = time*0.05;
        
        // Create vertical bars (fewer bars = wider bars)
        float numBars = 20.0;
        float barIndex = floor(uv.x * numBars);
        float barX = fract(uv.x * numBars);
        
        // Smooth flowing wave animation
        float wave1 = sin(t * 2.0 + barIndex * 0.4);
        float wave2 = sin(t * 1.5 + barIndex * 0.3 + 1.0);
        float wave3 = sin(t * 2.5 + barIndex * 0.5 + 2.0);
        
        // Combine waves for smooth flowing motion
        float barHeight = 0.4 + (wave1 * 0.2 + wave2 * 0.15 + wave3 * 0.15);
        barHeight = clamp(barHeight, 0.15, 0.85);
        
        // Bar mask with small gap between bars for blocky look
        float barMask = step(barX, 0.92);
        
        // Calculate if we're inside the bar (going UP from bottom)
        float inBar = step(uv.y, barHeight) * barMask;
        
        // Calculate base color from hero shader
        vec2 colorUV = vec2(barIndex / numBars, 0.5);
        vec3 baseColor = vec3(0.0);
        
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            baseColor[j] += 0.002*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - colorUV.x + 0.1);
          }
        }
        
        // Create vertical gradient within each bar
        // Position within the bar (0 at bottom, 1 at top of bar)
        float posInBar = uv.y / barHeight;
        posInBar = clamp(posInBar, 0.0, 1.0);
        
        // Gradient: dark at bottom (0.1) to bright at top (2.0)
        float brightness = mix(0.1, 2.5, smoothstep(0.0, 1.0, posInBar));
        
        vec3 color = baseColor * brightness;
        
        // Apply bar mask
        color *= inBar;
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }
        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-[200px] md:h-[300px]"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}

