import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, MessageCircle, Bot, Stethoscope, Activity, AlertTriangle } from 'lucide-react'

const quickActions = [
  { label: 'AI Chat', icon: <Bot size={16}/>, path: '/chat', color: '#C2447A' },
  { label: 'AI Doctor', icon: <Stethoscope size={16}/>, path: '/ai-doctor', color: '#8b5cf6' },
  { label: 'Symptoms', icon: <Activity size={16}/>, path: '/symptoms', color: '#10b981' },
  { label: 'Emergency', icon: <AlertTriangle size={16}/>, path: '/emergency', color: '#DC2626' },
]

export default function FloatingChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end">
            {quickActions.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}>
                <Link to={a.path} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: `1px solid ${a.color}25` }}>
                    <span className="text-xs font-bold" style={{ color: '#2E1F24' }}>{a.label}</span>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                      style={{ background: a.color }}>
                      {a.icon}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        animate={{ boxShadow: open ? '0 0 0 rgba(194,68,122,0)' : ['0 0 0 0 rgba(194,68,122,0.4)', '0 0 0 15px rgba(194,68,122,0)', '0 0 0 0 rgba(194,68,122,0)'] }}
        transition={{ duration: 2, repeat: open ? 0 : Infinity }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24}/>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24}/>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}