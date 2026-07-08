import { motion } from 'framer-motion'
import { MapPin, Phone, Bed } from 'lucide-react'
import { API_URL } from '../config'
const hospitals = [
  { name: 'District General Hospital', distance: '2.3 km', beds: 12, phone: '108', type: 'Government' },
  { name: 'Primary Health Centre - Nandyal', distance: '0.8 km', beds: 4, phone: '104', type: 'PHC' },
  { name: 'Community Health Centre', distance: '5.1 km', beds: 8, phone: '108', type: 'CHC' },
  { name: 'Sub-District Rural Hospital', distance: '6.7 km', beds: 6, phone: '108', type: 'Government' },
  { name: 'Rural Maternity & Child Centre', distance: '3.4 km', beds: 5, phone: '104', type: 'PHC' },
  { name: 'Ayushman Arogya Hospital', distance: '8.2 km', beds: 20, phone: '108', type: 'Government' },
]

export default function HospitalLocator() {
  return (
    <div className="min-h-screen" style={{ background: '#FDF6F4' }}>
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07,
        }} />
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(135deg, rgba(253,246,244,0.98) 0%, rgba(253,246,244,0.85) 100%)'
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
              <MapPin size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Nearby hospitals</h1>
            <p className="font-medium" style={{ color: '#6B4F56' }}>Government hospitals & PHCs with live bed availability</p>
          </motion.div>
        </div>
      </section>

      <div className="relative">
        <svg viewBox="0 0 1440 80" className="w-full" style={{ display: 'block' }}>
          <path fill="#FBF0EC" d="M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <section className="px-6 py-16" style={{ background: '#FBF0EC' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-[2rem] overflow-hidden lg:sticky lg:top-28"
            style={{ aspectRatio: '4/5', boxShadow: '0 20px 50px rgba(194,68,122,0.15)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=90"
              alt="Hospital"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {hospitals.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl flex items-center justify-between flex-wrap gap-4 bg-white"
                style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
              >
                <div>
                  <h3 className="text-lg font-bold" style={{ color: '#2E1F24' }}>{h.name}</h3>
                  <p className="text-sm font-medium" style={{ color: '#6B4F56' }}>{h.type} • {h.distance} away</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: '#E7F5EF', color: '#0F9D6B' }}>
                    <Bed size={16} /> {h.beds} beds free
                  </div>
                  <a href={`tel:${h.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                    <Phone size={16} /> Call
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}