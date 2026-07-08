import { Canvas } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ECGPulse({ position, color, scale, speed }) {
  const ref = useRef()
  const lineRef = useRef()

  const points = useMemo(() => {
    const pts = []
    const segments = 300
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = t * 14 - 7
      let y = 0
      if (t > 0.38 && t < 0.40) y = 0.4
      else if (t > 0.40 && t < 0.42) y = -2.2
      else if (t > 0.42 && t < 0.45) y = 2.6
      else if (t > 0.45 && t < 0.48) y = -0.6
      else if (t > 0.48 && t < 0.51) y = 0.3
      else y = Math.sin(t * 40) * 0.025
      pts.push(new THREE.Vector3(x, y * 0.5, 0))
    }
    return pts
  }, [])

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = ((clock.getElapsedTime() * speed) % 16) - 8
    }
  })

  return (
    <group position={position} scale={scale}>
      <line ref={ref} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </line>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.18} />
      </line>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.4} />
        <ECGPulse position={[0, 1.2, -2]} color="#C2447A" scale={1} speed={0.8} />
        <ECGPulse position={[0, -3.2, -3]} color="#D4AF87" scale={0.7} speed={1.1} />
      </Canvas>
    </div>
  )
}