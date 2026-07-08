import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Brain, Activity, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react'
import { API_URL } from '../config'
export default function HealthRisk() {
  const [form, setForm] = useState({ age: '', gender: '', weight: '', height: '', smoking: 'no', alcohol: 'no', exercise: 'moderate', diabetes: 'no', bp: 'no', family: 'no', stress: 'moderate', diet: 'mixed' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const analyze = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/health-risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
      setStep(3)
    } catch {
      setResult({ error: 'Could not analyze. Please try again.' })
    }
    setLoading(false)
  }

  const inputStyle = { background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24', borderRadius: '12px', padding: '10px 14px', width: '100%', outline: 'none', fontSize: '14px', fontWeight: 500 }
  const optionBtn = (val, cur, key) => (
    <button onClick={() => update(key, val)}
      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
      style={{ background: cur === val ? '#C2447A' : 'white', color: cur === val ? 'white' : '#5A4248', border: '1px solid #F0D8E2' }}>
      {val.charAt(0).toUpperCase() + val.slice(1)}
    </button>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)' }}>
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2E1F24' }}>AI Health Risk Assessment</h1>
          <p className="font-medium text-sm" style={{ color: '#6B4F56' }}>
            Answer a few questions — AI will predict your health risks and give personalized advice
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {['Basic Info', 'Lifestyle', 'Results'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: step > i + 1 ? '#0F9D6B' : step === i + 1 ? '#C2447A' : 'rgba(194,68,122,0.1)', color: step >= i + 1 ? 'white' : '#C2447A' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color: step === i + 1 ? '#C2447A' : '#A88B92' }}>{s}</span>
              </div>
              {i < 2 && <div className="w-8 h-0.5" style={{ background: step > i + 1 ? '#C2447A' : '#E5D0D8' }} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-8 rounded-3xl bg-white" style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: '#2E1F24' }}>Basic Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Age (years)</label>
                    <input type="number" value={form.age} onChange={e => update('age', e.target.value)} placeholder="e.g. 35" style={inputStyle}/>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Gender</label>
                    <div className="flex gap-2">
                      {['male', 'female', 'other'].map(g => optionBtn(g, form.gender, 'gender'))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Weight (kg)</label>
                    <input type="number" value={form.weight} onChange={e => update('weight', e.target.value)} placeholder="e.g. 70" style={inputStyle}/>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Height (cm)</label>
                    <input type="number" value={form.height} onChange={e => update('height', e.target.value)} placeholder="e.g. 165" style={inputStyle}/>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Do you have Diabetes?</label>
                  <div className="flex gap-2">{['yes', 'no', 'prediabetic'].map(v => optionBtn(v, form.diabetes, 'diabetes'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>High Blood Pressure?</label>
                  <div className="flex gap-2">{['yes', 'no', 'borderline'].map(v => optionBtn(v, form.bp, 'bp'))}</div>
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!form.age || !form.gender}
                className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: (!form.age || !form.gender) ? 0.5 : 1 }}>
                Next — Lifestyle →
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-8 rounded-3xl bg-white" style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: '#2E1F24' }}>Lifestyle Factors</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Smoking</label>
                  <div className="flex gap-2">{['yes', 'no', 'occasionally'].map(v => optionBtn(v, form.smoking, 'smoking'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Alcohol consumption</label>
                  <div className="flex gap-2">{['yes', 'no', 'occasionally'].map(v => optionBtn(v, form.alcohol, 'alcohol'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Exercise frequency</label>
                  <div className="flex gap-2">{['daily', 'moderate', 'rarely', 'never'].map(v => optionBtn(v, form.exercise, 'exercise'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Stress level</label>
                  <div className="flex gap-2">{['low', 'moderate', 'high'].map(v => optionBtn(v, form.stress, 'stress'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Diet type</label>
                  <div className="flex gap-2">{['vegetarian', 'mixed', 'nonveg'].map(v => optionBtn(v, form.diet, 'diet'))}</div>
                </div>
                <div>
                  <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Family history of major illness?</label>
                  <div className="flex gap-2">{['yes', 'no'].map(v => optionBtn(v, form.family, 'family'))}</div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold"
                  style={{ background: 'white', color: '#C2447A', border: '1px solid #F0D8E2' }}>← Back</button>
                <button onClick={analyze} disabled={loading}
                  className="flex-1 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)' }}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Analyzing...</>
                  ) : (
                    <><Brain size={16}/> Analyze My Health Risk</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-white" style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }}>
              {result.error ? (
                <div className="flex items-center gap-3" style={{ color: '#D97706' }}>
                  <AlertCircle size={20}/> {result.error}
                </div>
              ) : (
                <div className="whitespace-pre-line leading-relaxed text-sm font-medium" style={{ color: '#2E1F24' }}>
                  <div dangerouslySetInnerHTML={{ __html: result.assessment?.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              )}
              <button onClick={() => { setStep(1); setResult(null); setForm({ age: '', gender: '', weight: '', height: '', smoking: 'no', alcohol: 'no', exercise: 'moderate', diabetes: 'no', bp: 'no', family: 'no', stress: 'moderate', diet: 'mixed' }) }}
                className="mt-6 px-6 py-3 rounded-xl text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                Take Assessment Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}