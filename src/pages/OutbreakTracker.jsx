import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AlertTriangle, TrendingUp, MapPin, Activity, Shield, RefreshCw } from 'lucide-react'
import { API_URL } from '../config'

const diseaseData = [
  { disease: 'Dengue Fever', cases: 847, trend: '+12%', risk: 'High', districts: ['Kurnool', 'Nandyal', 'Kadapa'], color: '#DC2626', season: 'Monsoon' },
  { disease: 'Malaria', cases: 423, trend: '+5%', risk: 'Medium', districts: ['Kurnool', 'Anantapur'], color: '#f59e0b', season: 'Post-monsoon' },
  { disease: 'Typhoid', cases: 218, trend: '-3%', risk: 'Low', districts: ['Nandyal', 'Kurnool'], color: '#10b981', season: 'Year-round' },
  { disease: 'Cholera', cases: 34, trend: '-15%', risk: 'Low', districts: ['Kadapa'], color: '#3B6E91', season: 'Summer' },
  { disease: 'COVID-19', cases: 156, trend: '+2%', risk: 'Medium', districts: ['Kurnool', 'Nandyal', 'Kadapa', 'Anantapur'], color: '#8b5cf6', season: 'Year-round' },
  { disease: 'Chicken Pox', cases: 89, trend: '-8%', risk: 'Low', districts: ['Nandyal'], color: '#ec4899', season: 'Winter-Spring' },
]

const riskColor = { High: '#DC2626', Medium: '#f59e0b', Low: '#10b981' }
const riskBg = { High: '#FEE2E2', Medium: '#FEF3C7', Low: '#E7F5EF' }

export default function OutbreakTracker() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [lastUpdated] = useState(new Date().toLocaleString())

  const getPrediction = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/outbreak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: diseaseData })
      })
      const d = await res.json()
      setPrediction(d.prediction)
    } catch { setPrediction('Could not load prediction. Please try again.') }
    setLoading(false)
  }

  const glassCard = { background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1584016124767-77e5d0a4e0d0?w=1600&q=80" alt=""
          className="w-full h-full object-cover opacity-4"/>
      </div>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)', boxShadow: '0 20px 40px rgba(220,38,38,0.3)' }}>
            <Activity size={32} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Predictive Outbreak Tracker</h1>
          <p className="font-medium mb-2" style={{ color: '#6B4F56' }}>
            Real-time disease surveillance and AI-powered outbreak prediction for Kurnool district
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-medium" style={{ color: '#A88B92' }}>
            <RefreshCw size={12}/> Last updated: {lastUpdated}
          </div>
        </motion.div>

        {/* Alert banner */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-2xl mb-6 flex items-start gap-3"
          style={{ background: 'linear-gradient(135deg, #FEE2E2, #FEF2F2)', border: '1px solid #FECACA' }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <AlertTriangle size={20} color="#DC2626"/>
          </motion.div>
          <div>
            <p className="font-bold text-sm" style={{ color: '#991b1b' }}>⚠️ Dengue Alert — High Risk Season Active</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#DC2626' }}>
              847 cases reported in Kurnool district this month. Use mosquito repellents. Seek immediate care for fever with joint pain.
            </p>
          </div>
        </motion.div>

        {/* Disease grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {diseaseData.map((d, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelected(selected?.disease === d.disease ? null : d)}
              className="p-5 rounded-2xl cursor-pointer relative overflow-hidden"
              style={{ ...glassCard, border: selected?.disease === d.disease ? `2px solid ${d.color}` : '1px solid rgba(255,255,255,0.9)' }}>
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full -mr-4 -mt-4"
                style={{ background: d.color + '15' }}/>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold" style={{ color: '#2E1F24' }}>{d.disease}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: riskBg[d.risk], color: riskColor[d.risk] }}>
                  {d.risk} Risk
                </span>
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: d.color }}>{d.cases}</div>
              <div className="text-xs font-medium mb-3" style={{ color: '#6B4F56' }}>cases this month</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1"
                  style={{ color: d.trend.startsWith('+') ? '#DC2626' : '#10b981' }}>
                  <TrendingUp size={12}/> {d.trend} vs last month
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-lg"
                  style={{ background: '#FBF0EC', color: '#C2447A' }}>{d.season}</span>
              </div>
              {/* Districts */}
              <div className="mt-3 flex flex-wrap gap-1">
                {d.districts.map((dist, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: d.color + '15', color: d.color }}>
                    {dist}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Prediction */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="p-6 rounded-3xl mb-6" style={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield size={20} style={{ color: '#C2447A' }}/>
              <h3 className="font-bold" style={{ color: '#2E1F24' }}>AI Outbreak Prediction</h3>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={getPrediction} disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Analyzing...</> : <><Activity size={14}/> Run AI Analysis</>}
            </motion.button>
          </div>
          {prediction ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: '#2E1F24' }}
              dangerouslySetInnerHTML={{ __html: prediction.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
          ) : (
            <p className="text-sm font-medium" style={{ color: '#A88B92' }}>
              Click "Run AI Analysis" to get predictive outbreak insights based on current disease data, seasonal patterns, and historical trends.
            </p>
          )}
        </motion.div>

        {/* Prevention tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Dengue Prevention', tips: ['Use mosquito nets', 'Remove stagnant water', 'Wear full-sleeve clothes', 'Use repellent creams'], color: '#DC2626', icon: '🦟' },
            { title: 'Water Safety', tips: ['Boil drinking water', 'Use ORS for diarrhea', 'Wash hands frequently', 'Avoid street food during alerts'], color: '#3B6E91', icon: '💧' },
            { title: 'Report Cases', tips: ['Call 104 health helpline', 'Visit nearest PHC', 'Report fever clusters', 'Community surveillance'], color: '#10b981', icon: '📞' },
          ].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }} className="p-5 rounded-2xl" style={glassCard}>
              <div className="text-2xl mb-3">{tip.icon}</div>
              <h4 className="font-bold mb-3" style={{ color: '#2E1F24' }}>{tip.title}</h4>
              {tip.tips.map((t, j) => (
                <div key={j} className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tip.color }}/>
                  <p className="text-xs font-medium" style={{ color: '#5A4248' }}>{t}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}