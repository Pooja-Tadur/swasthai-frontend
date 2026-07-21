import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CreditCard, Shield, CheckCircle, Lock, Smartphone, Building } from 'lucide-react'

const services = [
  { name: 'OPD Consultation', price: 150, desc: 'General physician consultation', icon: '🩺' },
  { name: 'Specialist Consultation', price: 300, desc: 'Specialist doctor (Cardiology, Ortho etc.)', icon: '👨‍⚕️' },
  { name: 'Telemedicine Video Call', price: 200, desc: '30-minute video consultation', icon: '📹' },
  { name: 'Blood Test Package', price: 499, desc: 'Complete blood count + basic panel', icon: '🧪' },
  { name: 'ECG', price: 250, desc: 'Electrocardiogram test', icon: '❤️' },
  { name: 'X-Ray', price: 350, desc: 'Digital X-Ray with report', icon: '🔭' },
]

export default function PaymentGateway() {
  const [selected, setSelected] = useState(null)
  const [method, setMethod] = useState('upi')
  const [step, setStep] = useState(1)
  const [upiId, setUpiId] = useState('')
  const [paid, setPaid] = useState(false)
  const [processing, setProcessing] = useState(false)

  const pay = () => {
    if (!selected) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setPaid(true); setStep(3) }, 2500)
  }

  const txnId = 'SWH' + Date.now().toString().slice(-8)

  const glassCard = { background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FDF6F4' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}>
            <CreditCard size={32} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Hospital Payment</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Secure payment for hospital services — UPI, Card, Net Banking
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Lock size={12} style={{ color: '#10b981' }}/>
            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>256-bit SSL Encrypted · PCI DSS Compliant</span>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Select Service', 'Payment', 'Confirmation'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: step > i + 1 ? '#10b981' : step === i + 1 ? '#C2447A' : 'rgba(194,68,122,0.1)', color: step >= i + 1 ? 'white' : '#C2447A' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color: step === i + 1 ? '#C2447A' : '#A88B92' }}>{s}</span>
              </div>
              {i < 2 && <div className="w-8 h-0.5" style={{ background: step > i + 1 ? '#10b981' : '#E5D0D8' }}/>}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {services.map((s, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(s)}
                    className="p-4 rounded-2xl cursor-pointer flex items-center justify-between"
                    style={{ ...glassCard, border: selected?.name === s.name ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.9)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#2E1F24' }}>{s.name}</p>
                        <p className="text-xs font-medium" style={{ color: '#6B4F56' }}>{s.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg" style={{ color: '#10b981' }}>₹{s.price}</p>
                      {selected?.name === s.name && <CheckCircle size={16} color="#10b981"/>}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => selected && setStep(2)} disabled={!selected}
                className="w-full py-4 rounded-2xl text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', opacity: !selected ? 0.5 : 1 }}>
                Continue to Payment →
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="p-6 rounded-3xl mb-4" style={glassCard}>
                <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: 'rgba(194,68,122,0.1)' }}>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#A88B92' }}>Paying for</p>
                    <p className="font-bold" style={{ color: '#2E1F24' }}>{selected?.name}</p>
                  </div>
                  <p className="text-2xl font-black" style={{ color: '#10b981' }}>₹{selected?.price}</p>
                </div>

                <p className="text-sm font-bold mb-3" style={{ color: '#2E1F24' }}>Payment Method</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { id: 'upi', label: 'UPI', icon: <Smartphone size={16}/> },
                    { id: 'card', label: 'Card', icon: <CreditCard size={16}/> },
                    { id: 'netbanking', label: 'Net Banking', icon: <Building size={16}/> },
                  ].map(m => (
                    <button key={m.id} onClick={() => setMethod(m.id)}
                      className="py-3 rounded-xl flex flex-col items-center gap-1 text-xs font-bold transition-all"
                      style={{ background: method === m.id ? '#10b981' : 'white', color: method === m.id ? 'white' : '#5A4248', border: '1px solid #F0D8E2' }}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>

                {method === 'upi' && (
                  <div>
                    <label className="text-xs font-bold mb-2 block" style={{ color: '#5A4248' }}>UPI ID</label>
                    <input value={upiId} onChange={e => setUpiId(e.target.value)}
                      placeholder="yourname@upi or phone@paytm"
                      className="w-full px-4 py-3 rounded-xl outline-none font-medium text-sm mb-3"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                    <div className="flex gap-2 flex-wrap">
                      {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                        <button key={app} onClick={() => setUpiId('user@' + app.toLowerCase())}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold"
                          style={{ background: '#E7F5EF', color: '#059669' }}>{app}</button>
                      ))}
                    </div>
                  </div>
                )}

                {method === 'card' && (
                  <div className="space-y-3">
                    <input placeholder="Card number (16 digits)" className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM/YY" className="px-4 py-3 rounded-xl outline-none text-sm font-medium"
                        style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                      <input placeholder="CVV" className="px-4 py-3 rounded-xl outline-none text-sm font-medium"
                        style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                    </div>
                    <input placeholder="Name on card" className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                      style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold"
                  style={{ background: 'white', color: '#C2447A', border: '1px solid #F0D8E2' }}>← Back</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={pay} disabled={processing}
                  className="flex-1 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  {processing ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/> Processing...</> : <><Lock size={16}/> Pay ₹{selected?.price}</>}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && paid && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl text-center" style={glassCard}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#E7F5EF' }}>
                <CheckCircle size={40} color="#10b981"/>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#2E1F24' }}>Payment Successful! 🎉</h2>
              <p className="font-medium mb-6" style={{ color: '#6B4F56' }}>Your appointment is confirmed</p>
              <div className="p-5 rounded-2xl text-left space-y-3 mb-6" style={{ background: '#E7F5EF' }}>
                {[
                  { label: 'Service', value: selected?.name },
                  { label: 'Amount Paid', value: `₹${selected?.price}` },
                  { label: 'Transaction ID', value: txnId },
                  { label: 'Payment Method', value: method.toUpperCase() },
                  { label: 'Status', value: '✅ Confirmed' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: '#6B4F56' }}>{item.label}</span>
                    <span className="font-bold" style={{ color: '#2E1F24' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setStep(1); setSelected(null); setPaid(false); setUpiId('') }}
                className="px-8 py-3 rounded-2xl text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Make Another Payment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}