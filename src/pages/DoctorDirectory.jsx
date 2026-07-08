import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, MapPin, Search } from 'lucide-react'

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(r => r.json())
      .then(d => setDoctors(d.doctors || []))
  }, [])

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Our Doctors</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>Meet our verified specialist doctors</p>
        </motion.div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white mb-8 max-w-lg mx-auto"
          style={{ boxShadow: '0 4px 16px rgba(194,68,122,0.06)' }}>
          <Search size={18} style={{ color: '#C2447A' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search doctor or specialization..."
            className="flex-1 outline-none bg-transparent font-medium"
            style={{ color: '#2E1F24' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-white"
              style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
              </div>

              <h3 className="text-lg font-bold mb-1" style={{ color: '#2E1F24' }}>{doc.name}</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: '#C2447A' }}>{doc.specialization}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#5A4248' }}>
                  <MapPin size={13} style={{ color: '#C2447A' }} />
                  {doc.ward} · {doc.floor}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#5A4248' }}>
                  <Clock size={13} style={{ color: '#C2447A' }} />
                  {doc.opdDays} · {doc.opdTime}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12}
                      fill={j < Math.floor(doc.rating) ? '#D4AF87' : 'none'}
                      color="#D4AF87" />
                  ))}
                  <span className="text-xs font-semibold ml-1" style={{ color: '#6B4F56' }}>{doc.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${doc.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {doc.available ? '✓ Available' : '✗ Busy'}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-lg"
                  style={{ background: '#FBF0EC', color: '#6B4F56' }}>
                  {doc.experience}
                </span>
              </div>

              <Link to="/appointments" state={{ doctorId: doc.id }}>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ background: doc.available ? 'linear-gradient(135deg, #E8849F, #C2447A)' : '#ccc' }}
                  disabled={!doc.available}
                >
                  {doc.available ? 'Book Appointment' : 'Not Available Today'}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}