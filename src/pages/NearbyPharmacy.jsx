import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Clock, Star, Navigation, Search } from 'lucide-react'

const pharmacies = [
  { id: 1, name: 'Jan Aushadhi Kendra — Main Hospital', type: 'Government', distance: '50m', rating: 4.8, phone: '08514-220100', hours: '7AM–9PM', savings: 'Up to 90% cheaper', open: true, feature: 'Generic medicines at lowest price', icon: '🏥' },
  { id: 2, name: 'Apollo Pharmacy', type: 'Private Chain', distance: '0.3 km', rating: 4.5, phone: '1860-500-0101', hours: '24 hours', savings: 'Loyalty discounts', open: true, feature: 'Delivery available', icon: '💊' },
  { id: 3, name: 'MedPlus Pharmacy', type: 'Private Chain', distance: '0.5 km', rating: 4.3, phone: '040-67607888', hours: '8AM–10PM', savings: '10-15% discount', open: true, feature: 'Lab tests available', icon: '🧪' },
  { id: 4, name: 'Government Hospital Pharmacy', type: 'Government', distance: '0.1 km', rating: 4.6, phone: '108', hours: '24 hours', savings: 'Free for BPL patients', open: true, feature: 'Ayushman Bharat accepted', icon: '🏛️' },
  { id: 5, name: 'Wellness Forever', type: 'Private Chain', distance: '0.8 km', rating: 4.2, phone: '022-71177117', hours: '8AM–10PM', savings: '5-10% discount', open: false, feature: 'Health cards accepted', icon: '💉' },
  { id: 6, name: 'Netmeds Local Partner', type: 'Online + Store', distance: '1.2 km', rating: 4.4, phone: '1800-103-0304', hours: '9AM–8PM', savings: 'Up to 25% off', open: true, feature: 'Upload prescription online', icon: '📱' },
]

export default function NearbyPharmacy() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filters = ['All', 'Government', 'Private Chain', 'Online + Store']
  const filtered = pharmacies.filter(p =>
    (filter === 'All' || p.type === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const glassCard = {
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 24px rgba(194,68,122,0.08)',
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1600&q=80" alt=""
          className="w-full h-full object-cover opacity-5"/>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 16px 32px rgba(5,150,105,0.3)' }}>
            💊
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Nearby Pharmacies</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Find pharmacies near the hospital — including Jan Aushadhi for 90% cheaper medicines
          </p>
        </motion.div>

        {/* Jan Aushadhi highlight */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl mb-6 flex items-start gap-4"
          style={{ background: 'linear-gradient(135deg, #E7F5EF, #D1FAE5)', border: '1px solid #BFE5D5' }}>
          <div className="text-3xl">🏥</div>
          <div>
            <h3 className="font-bold mb-1" style={{ color: '#065f46' }}>Jan Aushadhi Kendra — Save up to 90%</h3>
            <p className="text-sm font-medium" style={{ color: '#047857' }}>
              Pradhan Mantri Bhartiya Janaushadhi Pariyojana stores offer the same quality medicines at 50-90% less price. Available inside the hospital premises.
            </p>
            <p className="text-xs font-bold mt-2" style={{ color: '#059669' }}>
              📞 Helpline: 1800-180-8080 (Toll Free)
            </p>
          </div>
        </motion.div>

        {/* Search + filter */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl min-w-[200px]" style={glassCard}>
            <Search size={16} style={{ color: '#C2447A' }}/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search pharmacy..." className="flex-1 outline-none bg-transparent text-sm font-medium"
              style={{ color: '#2E1F24' }}/>
          </div>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: filter === f ? '#059669' : 'rgba(255,255,255,0.8)', color: filter === f ? 'white' : '#5A4248', backdropFilter: 'blur(10px)' }}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
              className="p-5 rounded-2xl cursor-pointer"
              style={{ ...glassCard, border: selected?.id === p.id ? '1.5px solid #059669' : '1px solid rgba(255,255,255,0.8)' }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{p.icon}</div>
                  <div>
                    <h3 className="font-bold" style={{ color: '#2E1F24' }}>{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                        style={{ background: p.type === 'Government' ? '#E7F5EF' : '#FBF0EC', color: p.type === 'Government' ? '#059669' : '#C2447A' }}>
                        {p.type}
                      </span>
                      <span className="text-xs font-medium flex items-center gap-1" style={{ color: '#6B4F56' }}>
                        <MapPin size={11}/> {p.distance}
                      </span>
                      <span className="text-xs font-medium flex items-center gap-1" style={{ color: '#D4AF87' }}>
                        <Star size={11} fill="#D4AF87"/> {p.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${p.open ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                    {p.open ? '● Open Now' : '● Closed'}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#059669' }}>💰 {p.savings}</span>
                </div>
              </div>

              {selected?.id === p.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(194,68,122,0.1)' }}>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#5A4248' }}>
                      <Clock size={14} style={{ color: '#C2447A' }}/> {p.hours}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#5A4248' }}>
                      ✨ {p.feature}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${p.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold"
                      style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                      <Phone size={14}/> Call Now
                    </a>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: '#E7F5EF', color: '#059669' }}>
                      <Navigation size={14}/> Directions
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}