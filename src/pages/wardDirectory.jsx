import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Bed, Clock, Search } from 'lucide-react'

export default function WardDirectory() {
  const [wards, setWards] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('http://localhost:5000/api/wards')
      .then(r => r.json())
      .then(d => setWards(d.wards || []))
  }, [])

  const floors = ['All', 'Ground Floor', 'First Floor', 'Second Floor', 'Third Floor']
  const filtered = wards.filter(w =>
    (filter === 'All' || w.floor === filter) &&
    (w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05,
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Ward Directory</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Find any ward, department or service in the hospital
          </p>
        </motion.div>

        {/* Search */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white min-w-[200px]"
            style={{ boxShadow: '0 4px 16px rgba(194,68,122,0.06)' }}>
            <Search size={18} style={{ color: '#C2447A' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ward or condition..."
              className="flex-1 outline-none bg-transparent font-medium"
              style={{ color: '#2E1F24' }}
            />
          </div>
        </div>

        {/* Floor filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {floors.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: filter === f ? '#C2447A' : 'white',
                color: filter === f ? 'white' : '#5A4248',
                boxShadow: '0 4px 12px rgba(194,68,122,0.06)'
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Ward grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ward, i) => (
            <motion.div
              key={ward.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white relative overflow-hidden"
              style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6"
                style={{ background: ward.color + '18' }} />

              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{ward.icon}</div>
                {ward.open24x7 && (
                  <span className="text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: '#E7F5EF', color: '#0F9D6B' }}>24/7</span>
                )}
              </div>

              <h3 className="text-lg font-bold mb-1" style={{ color: '#2E1F24' }}>{ward.name}</h3>
              <p className="text-xs font-medium mb-3" style={{ color: '#6B4F56' }}>{ward.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#5A4248' }}>
                  <MapPin size={13} style={{ color: ward.color }} />
                  {ward.floor} — Wing {ward.wing}
                </div>
                {ward.opdTime && (
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#5A4248' }}>
                    <Clock size={13} style={{ color: ward.color }} />
                    OPD: {ward.opdTime}
                  </div>
                )}
                {ward.beds.total > 0 && (
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#5A4248' }}>
                    <Bed size={13} style={{ color: ward.color }} />
                    {ward.beds.available}/{ward.beds.total} beds available
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a href={`tel:${ward.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-semibold"
                  style={{ background: ward.color }}>
                  <Phone size={12} /> {ward.phone}
                </a>
                <Link to="/appointments">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                    style={{ color: ward.color, background: ward.color + '15' }}>
                    Book →
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}