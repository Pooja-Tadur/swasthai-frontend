import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Droplets, Phone, MapPin, Clock, Heart, Search, AlertTriangle } from 'lucide-react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const bloodData = {
  'A+': { units: 45, status: 'Good', donors: 12, compatible: ['A+', 'AB+'] },
  'A-': { units: 8, status: 'Low', donors: 3, compatible: ['A+', 'A-', 'AB+', 'AB-'] },
  'B+': { units: 32, status: 'Good', donors: 9, compatible: ['B+', 'AB+'] },
  'B-': { units: 5, status: 'Critical', donors: 2, compatible: ['B+', 'B-', 'AB+', 'AB-'] },
  'AB+': { units: 28, status: 'Good', donors: 7, compatible: ['AB+'] },
  'AB-': { units: 4, status: 'Critical', donors: 1, compatible: ['AB+', 'AB-'] },
  'O+': { units: 60, status: 'Excellent', donors: 18, compatible: ['A+', 'B+', 'AB+', 'O+'] },
  'O-': { units: 12, status: 'Low', donors: 4, compatible: ['All blood types — Universal Donor'] },
}

const statusColor = { 'Excellent': '#0F9D6B', 'Good': '#3B6E91', 'Low': '#f59e0b', 'Critical': '#DC2626' }
const statusBg = { 'Excellent': '#E7F5EF', 'Good': '#EAF1F5', 'Low': '#FEF3C7', 'Critical': '#FEE2E2' }

export default function BloodBank() {
  const [selected, setSelected] = useState(null)
  const [donorForm, setDonorForm] = useState({ name: '', phone: '', group: '', age: '' })
  const [registered, setRegistered] = useState(false)
  const [requestGroup, setRequestGroup] = useState('')
  const [requested, setRequested] = useState(false)

  const glassCard = {
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 32px rgba(220,38,38,0.06)',
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80" alt=""
          className="w-full h-full object-cover opacity-5"/>
      </div>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)', boxShadow: '0 20px 40px rgba(220,38,38,0.35)' }}>
            <Droplets size={32} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Blood Bank</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Real-time blood availability · Register as donor · Emergency blood request
          </p>
        </motion.div>

        {/* Emergency alert */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-2xl mb-6 flex items-start gap-3"
          style={{ background: 'linear-gradient(135deg, #FEE2E2, #FEF2F2)', border: '1px solid #FECACA' }}>
          <AlertTriangle size={20} color="#DC2626" className="shrink-0 mt-0.5"/>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: '#991b1b' }}>Blood types B- and AB- are critically low</p>
            <p className="text-xs font-medium" style={{ color: '#DC2626' }}>
              If you have B- or AB- blood type, please consider donating. Contact Blood Bank: <strong>08514-220200</strong>
            </p>
          </div>
        </motion.div>

        {/* Blood availability grid */}
        <h2 className="font-bold text-lg mb-4" style={{ color: '#2E1F24' }}>Live Blood Availability</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {bloodGroups.map((bg, i) => {
            const data = bloodData[bg]
            return (
              <motion.div key={bg}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => setSelected(selected === bg ? null : bg)}
                className="p-5 rounded-2xl cursor-pointer text-center relative overflow-hidden"
                style={{ ...glassCard, border: selected === bg ? `2px solid ${statusColor[data.status]}` : '1px solid rgba(255,255,255,0.8)' }}>
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full -mr-6 -mt-6"
                  style={{ background: statusColor[data.status] + '15' }}/>
                <div className="text-3xl font-black mb-1" style={{ color: '#DC2626' }}>{bg}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#2E1F24' }}>{data.units}</div>
                <div className="text-xs font-medium mb-2" style={{ color: '#6B4F56' }}>units available</div>
                <div className="text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: statusBg[data.status], color: statusColor[data.status] }}>
                  {data.status}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Selected blood group details */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl mb-6" style={glassCard}>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#2E1F24' }}>
                Blood Group {selected} — Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl" style={{ background: '#FEF2F2' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#DC2626' }}>Available Units</p>
                  <p className="text-2xl font-black" style={{ color: '#DC2626' }}>{bloodData[selected].units}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: '#E7F5EF' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#0F9D6B' }}>Registered Donors</p>
                  <p className="text-2xl font-black" style={{ color: '#0F9D6B' }}>{bloodData[selected].donors}</p>
                </div>
                <div className="p-4 rounded-xl col-span-2 md:col-span-1" style={{ background: '#EAF1F5' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#3B6E91' }}>Compatible With</p>
                  <p className="text-xs font-medium" style={{ color: '#3B6E91' }}>
                    {Array.isArray(bloodData[selected].compatible)
                      ? bloodData[selected].compatible.join(', ')
                      : bloodData[selected].compatible}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donor registration */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="p-6 rounded-2xl" style={glassCard}>
            <div className="flex items-center gap-2 mb-5">
              <Heart size={20} color="#DC2626"/>
              <h3 className="font-bold" style={{ color: '#2E1F24' }}>Register as Blood Donor</h3>
            </div>
            {registered ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">❤️</div>
                <p className="font-bold" style={{ color: '#0F9D6B' }}>Thank you for registering!</p>
                <p className="text-sm font-medium mt-1" style={{ color: '#6B4F56' }}>
                  You will be contacted when your blood type is needed
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { key: 'name', placeholder: 'Full name', type: 'text' },
                  { key: 'phone', placeholder: 'Mobile number', type: 'tel' },
                  { key: 'age', placeholder: 'Age (18-65)', type: 'number' },
                ].map(f => (
                  <input key={f.key} type={f.type}
                    value={donorForm[f.key]} onChange={e => setDonorForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                    style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                ))}
                <select value={donorForm.group} onChange={e => setDonorForm(p => ({ ...p, group: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                  style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}>
                  <option value="">Select blood group</option>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => donorForm.name && donorForm.phone && donorForm.group && setRegistered(true)}
                  className="w-full py-3 rounded-xl text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #DC2626, #991b1b)' }}>
                  Register as Donor ❤️
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Emergency request */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="p-6 rounded-2xl" style={glassCard}>
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle size={20} color="#f59e0b"/>
              <h3 className="font-bold" style={{ color: '#2E1F24' }}>Emergency Blood Request</h3>
            </div>
            {requested ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🚨</div>
                <p className="font-bold" style={{ color: '#DC2626' }}>Emergency request sent!</p>
                <p className="text-sm font-medium mt-1" style={{ color: '#6B4F56' }}>
                  Blood bank staff will contact you within 10 minutes
                </p>
                <a href="tel:08514220200"
                  className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold"
                  style={{ background: '#DC2626' }}>
                  <Phone size={16}/> Call Blood Bank Now
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl" style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
                  <p className="text-xs font-bold" style={{ color: '#92400e' }}>
                    ⚡ For life-threatening emergencies, call 108 immediately
                  </p>
                </div>
                <select value={requestGroup} onChange={e => setRequestGroup(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                  style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}>
                  <option value="">Blood group needed</option>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg} ({bloodData[bg].units} units available)</option>)}
                </select>
                <input placeholder="Patient name"
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                  style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                <input placeholder="Contact number"
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm font-medium"
                  style={{ background: 'white', border: '1px solid #F0D8E2', color: '#2E1F24' }}/>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => requestGroup && setRequested(true)}
                  className="w-full py-3 rounded-xl text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #DC2626)' }}>
                  🚨 Send Emergency Request
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}