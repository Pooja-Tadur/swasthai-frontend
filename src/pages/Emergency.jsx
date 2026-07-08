import { motion } from 'framer-motion'
import { Phone, AlertTriangle, MapPin, Heart, Navigation } from 'lucide-react'

const emergencyContacts = [
  { name: 'Ambulance', number: '108', color: '#DC2626', icon: '🚑' },
  { name: 'Emergency Ward', number: '104', color: '#E8849F', icon: '🏥' },
  { name: 'Police', number: '100', color: '#3B6E91', icon: '🚔' },
  { name: 'Fire', number: '101', color: '#f59e0b', icon: '🔥' },
]

const firstAidTips = [
  { title: 'Heart Attack', tip: 'Call 108 immediately. Have patient sit or lie down. Loosen clothing. Do NOT give water.', icon: '❤️', color: '#DC2626' },
  { title: 'Choking', tip: 'Give 5 back blows between shoulder blades. Then 5 abdominal thrusts. Call 108 if not resolved.', icon: '🫁', color: '#f59e0b' },
  { title: 'Bleeding', tip: 'Press firmly with clean cloth. Keep pressure. Elevate wounded area above heart level.', icon: '🩸', color: '#E8849F' },
  { title: 'Fracture', tip: 'Do not move patient. Immobilize injured area. Apply ice pack. Call 108.', icon: '🦴', color: '#D4AF87' },
]

export default function Emergency() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-3xl mb-10"
          style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)' }}>
          <AlertTriangle size={40} className="text-white mx-auto mb-3" />
          <h1 className="text-4xl font-bold text-white mb-3">Emergency Help</h1>
          <p className="text-white font-medium mb-6" style={{ opacity: 0.9 }}>
            For life-threatening emergencies call 108 immediately
          </p>
          <a href="tel:108">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 mx-auto"
              style={{ background: 'white', color: '#DC2626' }}>
              <Phone size={22} /> Call 108 Now
            </motion.button>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {emergencyContacts.map((c, i) => (
            <motion.a key={i} href={`tel:${c.number}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl text-center bg-white block"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="font-bold text-2xl mb-1" style={{ color: c.color }}>{c.number}</div>
              <div className="text-sm font-semibold" style={{ color: '#5A4248' }}>{c.name}</div>
            </motion.a>
          ))}
        </div>

        <div className="p-6 rounded-3xl mb-8 bg-white" style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}>
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={20} style={{ color: '#C2447A' }} />
            <h2 className="text-xl font-bold" style={{ color: '#2E1F24' }}>Emergency Ward Location</h2>
          </div>
          <p className="font-medium mb-3" style={{ color: '#5A4248' }}>
            Emergency & Casualty Ward — Ground Floor, Wing A (Main Entrance, turn right)
          </p>
          <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: '#FBF0EC' }}>
            <Navigation size={18} style={{ color: '#C2447A', marginTop: '2px' }} />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: '#2E1F24' }}>From main entrance:</p>
              <p className="text-sm font-medium" style={{ color: '#5A4248' }}>
                Enter through main gate → Walk straight 50 meters → Turn RIGHT at pharmacy → Emergency ward is the red door on your left
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-5" style={{ color: '#2E1F24' }}>First Aid Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {firstAidTips.map((tip, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.05)', borderLeft: `4px solid ${tip.color}` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{tip.icon}</span>
                <h3 className="font-bold" style={{ color: '#2E1F24' }}>{tip.title}</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed" style={{ color: '#5A4248' }}>{tip.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}