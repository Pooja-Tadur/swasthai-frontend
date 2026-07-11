import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const phases = ['Initializing AI...', 'Loading Hospital Data...', 'Connecting to Swasth AI...']

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 400); return 100 }
        return p + 2
      })
    }, 30)
    const phaseInterval = setInterval(() => setPhase(p => Math.min(p + 1, 2)), 600)
    return () => { clearInterval(interval); clearInterval(phaseInterval) }
  }, [])

  return (
    <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #FDF6F4 0%, #FBE8EF 50%, #FDF6F4 100%)' }}>

      {/* Animated background orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${150 + i * 80}px`, height: `${150 + i * 80}px`,
            background: `radial-gradient(circle, rgba(232,132,159,${0.08 - i * 0.01}) 0%, transparent 70%)`,
            left: `${10 + i * 15}%`, top: `${10 + i * 10}%`,
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Logo */}
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="mb-8 relative">
        <motion.div animate={{ boxShadow: ['0 0 30px rgba(194,68,122,0.3)', '0 0 60px rgba(194,68,122,0.6)', '0 0 30px rgba(194,68,122,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
          <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
            <path d="M22 2 L38 11 L38 33 L22 42 L6 33 L6 11 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M8 22 L13 22 L16 16 L19 28 L21 20 L23 22 L25 19 L27 25 L29 22 L36 22"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-full border-2 border-dashed"
          style={{ borderColor: 'rgba(194,68,122,0.3)' }}/>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="text-4xl font-black mb-2" style={{ color: '#2E1F24' }}>
        Swasth<span style={{ color: '#C2447A' }}>AI</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-sm font-semibold mb-10" style={{ color: '#A88B92' }}>SMART HOSPITAL SYSTEM</motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 rounded-full mb-4" style={{ background: 'rgba(194,68,122,0.15)' }}>
        <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #E8849F, #C2447A)' }}
          transition={{ duration: 0.1 }}/>
      </div>

      <motion.p key={phase} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
        className="text-xs font-semibold" style={{ color: '#C2447A' }}>
        {phases[phase]}
      </motion.p>
      <p className="text-xs mt-2 font-medium" style={{ color: '#A88B92' }}>{progress}%</p>
    </motion.div>
  )
}