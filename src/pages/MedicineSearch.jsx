import { motion } from 'framer-motion'
import { useState } from 'react'
import { Pill, Search, AlertCircle } from 'lucide-react'
import { API_URL } from '../config'
export default function MedicineSearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${API_URL}/api/medicines/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicine: query })
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Backend not connected yet.' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#FDF6F4' }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07,
        }} />
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(135deg, rgba(253,246,244,0.98) 0%, rgba(253,246,244,0.85) 100%)'
        }} />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)' }}>
              <Pill size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Medicine finder</h1>
            <p className="mb-8 font-medium" style={{ color: '#6B4F56' }}>
              Find affordable generic substitutes for expensive branded medicines
            </p>

            <div className="flex gap-2 mb-6">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Enter medicine name e.g. Crocin..."
                className="flex-1 px-5 py-4 rounded-2xl bg-white outline-none font-medium"
                style={{ color: '#2E1F24', boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                className="px-6 py-4 rounded-2xl text-white font-semibold flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)' }}>
                <Search size={18} />
              </motion.button>
            </div>

            {result && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white"
                style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}>
                {result.error ? (
                  <div className="flex items-center gap-2 font-medium" style={{ color: '#D97706' }}>
                    <AlertCircle size={18} /> {result.error}
                  </div>
                ) : (
                  <div className="whitespace-pre-line" style={{ color: '#2E1F24' }}>{result.substitutes}</div>
                )}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="rounded-[2.5rem] overflow-hidden hidden lg:block"
            style={{ aspectRatio: '4/5', boxShadow: '0 20px 50px rgba(194,68,122,0.15)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=700&q=90"
              alt="Pharmacy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}