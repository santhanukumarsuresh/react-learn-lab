import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

// Procedural 3D "React atom" — a glowing nucleus with three tilted electron
// orbits, generated entirely in-browser (Three.js + React Three Fiber, no
// external assets). Lazy-loaded so the heavy 3D bundle only downloads for
// the home page, after first paint.

const ORBITS = [
  { tilt: [Math.PI / 2, 0, 0], color: '#00a0dc', speed: 1.1 },
  { tilt: [Math.PI / 2, 0, Math.PI / 3], color: '#11b9b4', speed: -1.4 },
  { tilt: [Math.PI / 2, 0, -Math.PI / 3], color: '#f89e64', speed: 1.8 },
]

function Orbit({ tilt, color, speed }) {
  const spinner = useRef()
  useFrame((_, delta) => {
    if (spinner.current) spinner.current.rotation.z += delta * speed
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[1.9, 0.02, 16, 96]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
      </mesh>
      {/* Electron riding the ring */}
      <group ref={spinner}>
        <mesh position={[1.9, 0, 0]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
        </mesh>
      </group>
    </group>
  )
}

function Atom() {
  const root = useRef()
  useFrame((_, delta) => {
    if (root.current) root.current.rotation.y += delta * 0.25
  })

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <group ref={root}>
        <mesh>
          <icosahedronGeometry args={[0.55, 2]} />
          <meshStandardMaterial
            color="#005396"
            emissive="#00a0dc"
            emissiveIntensity={0.55}
            metalness={0.55}
            roughness={0.25}
          />
        </mesh>
        {ORBITS.map((orbit) => (
          <Orbit key={orbit.color} {...orbit} />
        ))}
      </group>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-5, -3, -4]} intensity={0.7} color="#00a0dc" />
      <Atom />
    </Canvas>
  )
}
