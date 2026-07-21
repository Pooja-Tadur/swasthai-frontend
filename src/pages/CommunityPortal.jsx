import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Users, MapPin, Phone, CheckCircle, AlertTriangle, Plus, Send, Heart } from 'lucide-react'
import { API_URL } from '../config'

const workers = [
  { id: 1, name: 'Smt. Lakshmi Devi', area: 'Nandyal Rural', patients: 234, visits: 18, status: 'active', phone: '9876543210', lastVisit: 'Today 10:30 AM' },
  { id: 2, name: 'Smt. Radha Bai', area: 'Kurnool Block-2', patients: 189, visits: 12, status: 'active', phone: '9765432109', lastVisit: 'Today 9:00 AM' },
  { id: 3, name: 'Smt. Kamala', area: 'Aluru PHC Area', patients: 312, visits: 22, status: 'active', phone: '9654321098', lastVisit: 'Yesterday' },
  { id: 4, name: 'Smt. Vijaya', area: 'Gospadu Village', patients: 156, visits: 8, status: 'on-leave', phone: '9543210987', lastVisit: '3 days ago' },
]

const reports = [
  { worker: 'Lakshmi Devi', type: 'Fever cluster', details: '5 children with fever in Hanumanthunipadu', severity: 'High', time: '2 hours ago' },
  { worker: 'Radha Bai', type: 'Pregnancy followup', details: '3 high-risk pregnancies tracked this week', severity: 'Medium', time: '4 hours ago' },
  { worker: 'Kamala', type: 'Vaccination', details: '28 children vaccinated in Aluru area', severity: 'Low', time: 'Yesterday' },
]

export default function CommunityPortal() {
  const [activeTab, setActiveTab] = useState('workers')
  const [reportForm, setReportForm] = useState({ type: '', details: '', location: '', severity: 'Low' })
  const [submitted, setSubmitted] = useState(false)
  const [aiResponse, setAiResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitReport = async () => {
    if (!reportForm.type || !reportForm.details) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/community-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm)
      })
      const d = await res.json()
      setAiResponse(d.guidance)
      setSubmitted(true)
    } catch { setSubmitted(true) }
    setLoading(false)
  }

  const glassCard = { background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FDF6F4' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}>
            <Users size={32} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Community Health Worker Portal</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            ASHA & ANM workers dashboard — report cases, track patients, get AI guidance
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active Workers', value: '3', color: '#10b981', icon: '👩‍⚕️' },
            { label: 'Patients Tracked', value: '891', color: '#C2447A', icon: '👥' },
            { label: 'Home Visits Today', value: '58', color: '#3B6E91', icon: '🏠' },
            { label: 'Cases Reported', value: '12', color: '#DC2626', icon: '📋' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -4 }}
              className="p-5 rounded-2xl text-center" style={glassCard}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: '#6B4F56' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['workers', 'reports', 'submit'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all"
              style={{ background: activeTab === tab ? '#10b981' : 'rgba(255,255,255,0.8)', color: activeTab === tab ? 'white' : '#5A4248' }}>
              {tab === 'submit' ? '+ Submit Report' : tab === 'workers' ? '👩‍⚕️ Workers' : '📋 Recent Reports'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'workers' && (
            <motion.div key="workers" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-4">
              {workers.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -3 }}
                  className="p-6 rounded-2xl" style={glassCard}>
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        {w.name.charAt(5)}
                      </div>
                      <div>
                        <h3 className="font-bold" style={{ color: '#2E1F24' }}>{w.name}</h3>
                        <p className="text-sm font-medium flex items-center gap-1" style={{ color: '#6B4F56' }}>
                          <MapPin size={12}/> {w.area}
                        </p>
                        <p className="text-xs font-medium" style={{ color: '#A88B92' }}>Last visit: {w.lastVisit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center px-3 py-2 rounded-xl" style={{ background: '#E7F5EF' }}>
                        <div className="text-lg font-black" style={{ color: '#10b981' }}>{w.patients}</div>
                        <div className="text-xs font-medium" style={{ color: '#059669' }}>Patients</div>
                      </div>
                      <div className="text-center px-3 py-2 rounded-xl" style={{ background: '#EAF1F5' }}>
                        <div className="text-lg font-black" style={{ color: '#3B6E91' }}>{w.visits}</div>
                        <div className="text-xs font-medium" style={{ color: '#3B6E91' }}>Visits</div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${w.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {w.status === 'active' ? '● Active' : '● On Leave'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a href={`tel:${w.phone}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                      <Phone size={14}/> Call
                    </a>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: '#E7F5EF', color: '#059669' }}>
                      <Heart size={14}/> View Patients
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div key="reports" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-4">
              {reports.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl" style={{ ...glassCard, borderLeft: `4px solid ${r.severity === 'High' ? '#DC2626' : r.severity === 'Medium' ? '#f59e0b' : '#10b981'}` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold" style={{ color: '#2E1F24' }}>{r.type}</h4>
                      <p className="text-xs font-medium" style={{ color: '#A88B92' }}>by {r.worker} · {r.time}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: r.severity === 'High' ? '#FEE2E2' : r.severity === 'Medium' ? '#FEF3C7' : '#E7F5EF', color: r.severity === 'High' ? '#DC2626' : r.severity === 'Medium' ? '#f59e0b' : '#10b981' }}>
                      {r.severity}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#5A4248' }}>{r.details}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'submit' && (
            <motion.div key="submit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-6 rounded-3xl" style={glassCard}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <CheckCircle size={48} color="#10b981" className="mx-auto mb-4"/>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#2E1F24' }}>Report Submitted!</h3>
                  {aiResponse && (
                    <div className="text-left mt-4 p-4 rounded-2xl" style={{ background: '#E7F5EF' }}>
                      <p className="text-xs font-bold mb-2" style={{ color: '#059669' }}>AI Guidance:</p>
                      <p className="text-sm font-medium" style={{ color: '#2E1F24' }}>{aiResponse}</p>
                    </div>
                  )}
                  <button onClick={() => { setSubmitted(false); setReportForm({ type: '', details: '', location: '', severity: 'Low' }); setAiResponse(null) }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    Submit Another Report
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg" style={{ color: '#2E1F24' }}>Submit Field Report</h3>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Report Type</label>
                    <select value={reportForm.type} onChange={e => setReportForm(p => ({ ...p, type: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl outline-none font-medium text-sm"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}>
                      <option value="">Select report type...</option>
                      <option>Disease cluster / outbreak</option>
                      <option>High-risk pregnancy</option>
                      <option>Child malnutrition</option>
                      <option>Vaccination coverage</option>
                      <option>Sanitation issue</option>
                      <option>Medicine shortage at PHC</option>
                      <option>Other health concern</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Location / Village</label>
                    <input value={reportForm.location} onChange={e => setReportForm(p => ({ ...p, location: e.target.value }))}
                      placeholder="Village name, block, district..."
                      className="w-full px-4 py-3 rounded-xl outline-none font-medium text-sm"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Details</label>
                    <textarea value={reportForm.details} onChange={e => setReportForm(p => ({ ...p, details: e.target.value }))}
                      placeholder="Describe the health situation in detail..."
                      rows={4} className="w-full px-4 py-3 rounded-xl outline-none font-medium text-sm resize-none"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>Severity</label>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High', 'Emergency'].map(s => (
                        <button key={s} onClick={() => setReportForm(p => ({ ...p, severity: s }))}
                          className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                          style={{ background: reportForm.severity === s ? (s === 'High' || s === 'Emergency' ? '#DC2626' : s === 'Medium' ? '#f59e0b' : '#10b981') : 'white', color: reportForm.severity === s ? 'white' : '#5A4248', border: '1px solid #F0D8E2' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={submitReport} disabled={loading || !reportForm.type || !reportForm.details}
                    className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', opacity: (!reportForm.type || !reportForm.details) ? 0.6 : 1 }}>
                    {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Getting AI guidance...</> : <><Send size={16}/> Submit Report</>}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}