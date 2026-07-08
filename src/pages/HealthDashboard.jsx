import { motion } from 'framer-motion'
import { useState } from 'react'
import { Activity, Heart, Droplets, Wind, Thermometer, Scale, Brain, TrendingUp, AlertCircle } from 'lucide-react'
import { API_URL } from '../config'
const vitals = [
  { label: 'Heart Rate', icon: <Heart size={20}/>, unit: 'bpm', normal: '60-100', color: '#E8849F', key: 'heartRate', placeholder: '72' },
  { label: 'Blood Pressure', icon: <Activity size={20}/>, unit: 'mmHg', normal: '120/80', color: '#C2447A', key: 'bp', placeholder: '120/80' },
  { label: 'Blood Sugar', icon: <Droplets size={20}/>, unit: 'mg/dL', normal: '70-140', color: '#D4AF87', key: 'sugar', placeholder: '100' },
  { label: 'Temperature', icon: <Thermometer size={20}/>, unit: '°F', normal: '97-99', color: '#f59e0b', key: 'temp', placeholder: '98.6' },
  { label: 'Oxygen (SpO2)', icon: <Wind size={20}/>, unit: '%', normal: '95-100', color: '#3B6E91', key: 'spo2', placeholder: '98' },
  { label: 'Weight', icon: <Scale size={20}/>, unit: 'kg', normal: 'BMI 18-25', color: '#10b981', key: 'weight', placeholder: '70' },
]

export default function HealthDashboard() {
  const [values, setValues] = useState({})
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setValues(prev => ({ ...prev, [k]: v }))

  const analyze = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/vitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
      setAnalysis(data.analysis)
    } catch {
      setAnalysis('Could not analyze. Please try again.')
    }
    setLoading(false)
  }

  const glassCard = {
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 32px rgba(194,68,122,0.08)',
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80" alt=""
          className="w-full h-full object-cover opacity-5"/>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', boxShadow: '0 16px 32px rgba(194,68,122,0.3)' }}>
            <Activity size={28} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Health Vitals Dashboard</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Enter your vitals — AI will analyze and flag any abnormal readings instantly
          </p>
        </motion.div>

        {/* Vitals input grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {vitals.map((v, i) => (
            <motion.div key={v.key}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl"
              style={glassCard}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: v.color }}>
                  {v.icon}
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: '#2E1F24' }}>{v.label}</p>
                  <p className="text-xs" style={{ color: '#A88B92' }}>Normal: {v.normal}</p>
                </div>
              </div>
              <input
                value={values[v.key] || ''}
                onChange={e => update(v.key, e.target.value)}
                placeholder={v.placeholder}
                className="w-full outline-none font-bold text-lg bg-transparent"
                style={{ color: v.color }}
              />
              <p className="text-xs font-medium mt-1" style={{ color: '#A88B92' }}>{v.unit}</p>
            </motion.div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={analyze} disabled={loading || Object.keys(values).length === 0}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 mb-6"
          style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', boxShadow: '0 8px 24px rgba(194,68,122,0.3)', opacity: Object.keys(values).length === 0 ? 0.6 : 1 }}>
          {loading ? (
            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/> Analyzing vitals...</>
          ) : (
            <><Brain size={20}/> Analyze My Vitals with AI</>
          )}
        </motion.button>

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl"
            style={glassCard}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} style={{ color: '#C2447A' }}/>
              <h3 className="font-bold" style={{ color: '#2E1F24' }}>AI Vitals Analysis</h3>
            </div>
            <div className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: '#2E1F24' }}
              dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
          </motion.div>
        )}
      </div>
    </div>
  )
}