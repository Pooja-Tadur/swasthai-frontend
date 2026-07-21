import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, X, AlertTriangle } from 'lucide-react'
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/symptoms', label: 'Symptoms' },
  { path: '/wards', label: 'Wards' },
  { path: '/doctors', label: 'Doctors' },
  { path: '/appointments', label: 'Book' },
  { path: '/map', label: 'Map' },
  { path: '/ai-doctor', label: 'AI Doctor' },
  { path: '/blood-bank', label: 'Blood Bank' },
  { path: '/outbreak', label: 'Outbreak' },
  { path: '/community', label: 'CHW Portal' },
  { path: '/payment', label: 'Payment' },
  { path: '/medicines', label: 'Medicines' },
  { path: '/pharmacy', label: 'Pharmacy' },
  { path: '/telemedicine', label: 'Video Call' },
  { path: '/chat', label: 'AI Chat' },
  { path: '/prescription', label: 'Rx Scanner' },
  { path: '/health-risk', label: 'Risk Check' },
  { path: '/vitals', label: 'Vitals' },
]

const SwasthLogo = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F9A8C9"/>
        <stop offset="100%" stopColor="#BE185D"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Hexagon base */}
    <path d="M22 2 L38 11 L38 33 L22 42 L6 33 L6 11 Z" fill="url(#g1)"/>
    {/* Inner glow ring */}
    <path d="M22 6 L35 13.5 L35 30.5 L22 38 L9 30.5 L9 13.5 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    {/* ECG pulse line */}
    <path d="M10 22 L14 22 L16 16 L19 28 L21 20 L23 22 L25 19 L27 25 L29 22 L34 22"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#glow)"/>
    {/* Center heart dot */}
    <circle cx="22" cy="22" r="2" fill="white" opacity="0.9"/>
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { dark, setDark } = useTheme()
  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(253,246,244,0.88)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(194,68,122,0.12)',
          boxShadow: '0 2px 20px rgba(194,68,122,0.06)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <SwasthLogo />
            <div className="leading-none">
              <div className="font-bold text-base tracking-tight" style={{ color: '#2E1F24' }}>
                Swasth<span style={{ color: '#C2447A' }}>AI</span>
              </div>
              <div className="text-xs font-semibold tracking-wide" style={{ color: '#A88B92', letterSpacing: '0.08em' }}>
                SMART HOSPITAL
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold transition-all relative"
                  style={{
                    color: location.pathname === link.path ? '#C2447A' : '#5A4248',
                    background: location.pathname === link.path ? 'rgba(194,68,122,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div layoutId="navIndicator"
                      className="absolute bottom-0.5 left-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#C2447A', transform: 'translateX(-50%)' }} />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
  onClick={() => setDark(!dark)}
  className="hidden md:flex w-9 h-9 rounded-xl items-center justify-center"
  style={{ background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(194,68,122,0.08)', color: dark ? '#F5F1E8' : '#C2447A' }}>
  {dark ? <Sun size={16}/> : <Moon size={16}/>}
</motion.button>
          <div className="flex items-center gap-2">
            <Link to="/emergency">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)', boxShadow: '0 4px 12px rgba(220,38,38,0.3)' }}>
                <AlertTriangle size={13} /> Emergency
              </motion.button>
            </Link>
            <Link to="/appointments">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', boxShadow: '0 4px 12px rgba(194,68,122,0.3)' }}>
                <Heart size={13} /> Get Help
              </motion.button>
            </Link>
            <button className="lg:hidden p-2 rounded-xl" style={{ color: '#2E1F24', background: 'rgba(194,68,122,0.06)' }}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 p-4"
            style={{ background: 'rgba(253,246,244,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(194,68,122,0.12)' }}>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}>
                  <div className="px-3 py-2.5 rounded-xl text-xs font-semibold text-center"
                    style={{ background: location.pathname === link.path ? 'rgba(194,68,122,0.08)' : 'white', color: location.pathname === link.path ? '#C2447A' : '#5A4248' }}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/emergency" onClick={() => setMenuOpen(false)}>
              <div className="w-full text-center py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)' }}>
                🚨 Emergency — Call 108
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}