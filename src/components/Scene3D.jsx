import { motion } from 'framer-motion'

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      {[
        { x: '10%', y: '20%', size: 300, color: 'rgba(232,132,159,0.12)', delay: 0 },
        { x: '75%', y: '15%', size: 250, color: 'rgba(212,175,55,0.10)', delay: 1 },
        { x: '60%', y: '65%', size: 350, color: 'rgba(194,68,122,0.08)', delay: 2 },
        { x: '20%', y: '70%', size: 200, color: 'rgba(139,92,246,0.08)', delay: 1.5 },
      ].map((orb, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size, background: orb.color, filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating medical icons */}
      {[
        { emoji: '🩺', x: '8%', y: '30%', size: 32, delay: 0 },
        { emoji: '💊', x: '88%', y: '20%', size: 28, delay: 0.5 },
        { emoji: '🏥', x: '5%', y: '65%', size: 30, delay: 1 },
        { emoji: '❤️', x: '92%', y: '60%', size: 26, delay: 1.5 },
        { emoji: '🧬', x: '15%', y: '85%', size: 24, delay: 2 },
        { emoji: '⚕️', x: '85%', y: '80%', size: 28, delay: 0.8 },
      ].map((icon, i) => (
        <motion.div key={i}
          className="absolute select-none"
          style={{ left: icon.x, top: icon.y, fontSize: icon.size, opacity: 0.35 }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Animated ECG line */}
      <motion.svg
        className="absolute bottom-20 left-0 right-0 w-full opacity-10"
        viewBox="0 0 1200 80" preserveAspectRatio="none"
        style={{ height: '80px' }}>
        <motion.path
          d="M0 40 L100 40 L120 40 L140 10 L160 70 L180 5 L200 40 L220 30 L240 40 L340 40 L360 40 L380 10 L400 70 L420 5 L440 40 L460 30 L480 40 L580 40 L600 40 L620 10 L640 70 L660 5 L680 40 L700 30 L720 40 L820 40 L840 40 L860 10 L880 70 L900 5 L920 40 L940 30 L960 40 L1060 40 L1080 40 L1100 10 L1120 70 L1140 5 L1160 40 L1200 40"
          fill="none" stroke="#C2447A" strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Floating glass cards */}
      <motion.div
        className="absolute rounded-2xl px-4 py-3 flex items-center gap-2"
        style={{ left: '2%', top: '45%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 24px rgba(194,68,122,0.1)' }}
        animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <span style={{ fontSize: 18 }}>🟢</span>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#2E1F24' }}>AI Active</p>
          <p style={{ fontSize: 9, color: '#6B4F56' }}>24/7 Available</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute rounded-2xl px-4 py-3 flex items-center gap-2"
        style={{ right: '2%', top: '35%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 24px rgba(194,68,122,0.1)' }}
        animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <span style={{ fontSize: 18 }}>❤️</span>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#2E1F24' }}>500+ Doctors</p>
          <p style={{ fontSize: 9, color: '#6B4F56' }}>Verified & Ready</p>
        </div>
      </motion.div>
    </div>
  )
}