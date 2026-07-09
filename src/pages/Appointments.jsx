import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Brain, CheckCircle, MapPin } from 'lucide-react'
import { API_URL } from '../config'
const doctors = [
  { id: 1, name: 'Dr. Anjali Sharma', specialization: 'Cardiologist', ward: 'Cardiology', floor: 'First Floor', wing: 'B' },
  { id: 2, name: 'Dr. Rohan Reddy', specialization: 'Orthopedic Surgeon', ward: 'Orthopedics', floor: 'First Floor', wing: 'A' },
  { id: 3, name: 'Dr. Priya Nair', specialization: 'Gynecologist', ward: 'Gynecology', floor: 'Second Floor', wing: 'D' },
  { id: 4, name: 'Dr. Arun Kumar', specialization: 'Pediatrician', ward: 'Pediatrics', floor: 'Second Floor', wing: 'C' },
  { id: 5, name: 'Dr. Sita Devi', specialization: 'General Physician', ward: 'General Medicine', floor: 'Ground Floor', wing: 'B' },
  { id: 6, name: 'Dr. Vijay Rao', specialization: 'ENT Specialist', ward: 'ENT', floor: 'First Floor', wing: 'C' },
  { id: 7, name: 'Dr. Meena Krishnan', specialization: 'Ophthalmologist', ward: 'Ophthalmology', floor: 'First Floor', wing: 'D' },
  { id: 8, name: 'Dr. Suresh Babu', specialization: 'General Surgeon', ward: 'Surgery', floor: 'Third Floor', wing: 'A' },
]

const timeSlots = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM']

export default function Appointments() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ patientName: '', patientPhone: '', symptoms: '', doctorId: '', date: '', timeSlot: '' })
  const [recommended, setRecommended] = useState(null)
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const getAIRecommendation = async () => {
    if (!form.symptoms) return
    setAiLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/appointments/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: form.symptoms })
      })
      const data = await res.json()
      setRecommended(data.doctor)
      setForm(f => ({ ...f, doctorId: data.doctor.id.toString() }))
    } catch { }
    setAiLoading(false)
  }

  const handleBook = async () => {
    setLoading(true)
    try {
      const doctor = doctors.find(d => d.id === parseInt(form.doctorId))
      const res = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, doctorName: doctor?.name, specialization: doctor?.specialization, ward: doctor?.ward, floor: doctor?.floor })
      })
      const data = await res.json()
      setBooked(data)
      setStep(4)
    } catch { alert('Booking failed') }
    setLoading(false)
  }

  const glassCard = { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Book Appointment</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>AI will suggest the right doctor based on your symptoms</p>
        </motion.div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Your Details', 'Symptoms & Doctor', 'Date & Time', 'Confirmed'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: step > i + 1 ? '#0F9D6B' : step === i + 1 ? '#C2447A' : 'rgba(194,68,122,0.1)',
                    color: step >= i + 1 ? 'white' : '#C2447A'
                  }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color: step === i + 1 ? '#C2447A' : '#A88B92' }}>{s}</span>
              </div>
              {i < 3 && <div className="w-6 h-0.5 mx-1" style={{ background: step > i + 1 ? '#C2447A' : '#E5D0D8' }} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-3xl" style={glassCard}>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#2E1F24' }}>Your details</h2>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Full name</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white" style={{ border: '1px solid #F0D8E2' }}>
                  <User size={18} style={{ color: '#C2447A' }} />
                  <input value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })}
                    placeholder="Enter your full name" className="flex-1 outline-none bg-transparent font-medium" style={{ color: '#2E1F24' }} />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Phone number</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white" style={{ border: '1px solid #F0D8E2' }}>
                  <Phone size={18} style={{ color: '#C2447A' }} />
                  <input value={form.patientPhone} onChange={e => setForm({ ...form, patientPhone: e.target.value })}
                    placeholder="10-digit mobile number" className="flex-1 outline-none bg-transparent font-medium" style={{ color: '#2E1F24' }} />
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={!form.patientName || !form.patientPhone}
                className="w-full py-3.5 rounded-xl text-white font-semibold mt-4"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: (!form.patientName || !form.patientPhone) ? 0.5 : 1 }}>
                Continue →
              </motion.button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#2E1F24' }}>Symptoms & doctor</h2>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Describe your symptoms</label>
                <textarea value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })}
                  placeholder="E.g. chest pain since 2 days, shortness of breath..."
                  rows={3} className="w-full p-3 rounded-xl bg-white outline-none resize-none font-medium"
                  style={{ border: '1px solid #F0D8E2', color: '#2E1F24' }} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={getAIRecommendation} disabled={!form.symptoms || aiLoading}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)', opacity: aiLoading ? 0.6 : 1 }}>
                  <Brain size={15} /> {aiLoading ? 'AI analyzing...' : 'Get AI doctor recommendation'}
                </motion.button>
              </div>

              {recommended && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl" style={{ background: '#E7F5EF', border: '1px solid #BFE5D5' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: '#0F9D6B' }}>✓ AI recommends:</p>
                  <p className="font-bold" style={{ color: '#2E1F24' }}>{recommended.name}</p>
                  <p className="text-sm font-medium" style={{ color: '#5A4248' }}>{recommended.specialization} · {recommended.ward} · {recommended.floor}</p>
                </motion.div>
              )}

              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Or choose doctor manually</label>
                <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white outline-none font-medium"
                  style={{ border: '1px solid #F0D8E2', color: '#2E1F24' }}>
                  <option value="">Select a doctor...</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>)}
                </select>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold" style={{ background: 'white', color: '#C2447A', border: '1px solid #F0D8E2' }}>← Back</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(3)} disabled={!form.doctorId}
                  className="flex-1 py-3 rounded-xl text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: !form.doctorId ? 0.5 : 1 }}>
                  Continue →
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#2E1F24' }}>Choose date & time</h2>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Appointment date</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white" style={{ border: '1px solid #F0D8E2' }}>
                  <Calendar size={18} style={{ color: '#C2447A' }} />
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1 outline-none bg-transparent font-medium" style={{ color: '#2E1F24' }} />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: '#5A4248' }}>Time slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button key={slot} onClick={() => setForm({ ...form, timeSlot: slot })}
                      className="py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: form.timeSlot === slot ? '#C2447A' : 'white',
                        color: form.timeSlot === slot ? 'white' : '#5A4248',
                        border: '1px solid #F0D8E2'
                      }}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-semibold" style={{ background: 'white', color: '#C2447A', border: '1px solid #F0D8E2' }}>← Back</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleBook} disabled={!form.date || !form.timeSlot || loading}
                  className="flex-1 py-3 rounded-xl text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: (!form.date || !form.timeSlot) ? 0.5 : 1 }}>
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 4 — Confirmed */}
          {step === 4 && booked && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: '#E7F5EF' }}>
                <CheckCircle size={40} color="#0F9D6B" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#2E1F24' }}>Appointment Confirmed!</h2>
              <p className="font-medium mb-6" style={{ color: '#6B4F56' }}>Your token number is</p>
              <div className="text-6xl font-bold mb-6" style={{ color: '#C2447A' }}>#{booked.tokenNumber}</div>
              <div className="p-5 rounded-2xl text-left mb-6" style={{ background: '#FBF0EC' }}>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: '#6B4F56' }}>Doctor</span>
                    <span className="font-bold" style={{ color: '#2E1F24' }}>{booked.appointment?.doctorName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: '#6B4F56' }}>Ward</span>
                    <span className="font-bold" style={{ color: '#2E1F24' }}>{booked.appointment?.ward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: '#6B4F56' }}>Floor</span>
                    <span className="font-bold" style={{ color: '#2E1F24' }}>{booked.appointment?.floor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: '#6B4F56' }}>Date & Time</span>
                    <span className="font-bold" style={{ color: '#2E1F24' }}>{booked.appointment?.date} at {booked.appointment?.timeSlot}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: '#E7F5EF' }}>
                <MapPin size={16} color="#0F9D6B" />
                <p className="text-sm font-semibold" style={{ color: '#0F9D6B' }}>
                  Go to {booked.appointment?.floor}, Wing {booked.appointment?.ward?.split(' ')[0]} for your appointment
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}