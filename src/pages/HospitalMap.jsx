import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Volume2, VolumeX, MapPin, Navigation, Building2, Search } from 'lucide-react'

const wards = [
  { id: 1, name: 'Reception', floor: 'G', col: 0, row: 0, color: '#C2447A', icon: '📋', w: 2, directions: ['Enter through main gate', 'Walk straight 20 meters', 'Reception desk is directly ahead on your right', 'You have arrived at Reception'] },
  { id: 2, name: 'Emergency', floor: 'G', col: 2, row: 0, color: '#DC2626', icon: '🚨', w: 2, directions: ['Enter main gate', 'Turn RIGHT immediately', 'Follow the RED signs', 'Emergency red doors are on your left — open 24 hours'] },
  { id: 3, name: 'Pharmacy', floor: 'G', col: 4, row: 0, color: '#059669', icon: '💊', w: 1, directions: ['From Reception', 'Turn LEFT', 'Walk 30 meters along the corridor', 'Pharmacy is the green-signed shop on your left'] },
  { id: 4, name: 'Laboratory', floor: 'G', col: 0, row: 1, color: '#7c3aed', icon: '🧪', w: 1, directions: ['From Reception', 'Go straight 40 meters', 'Turn RIGHT at the blue signs', 'Laboratory is the glass-walled room ahead'] },
  { id: 5, name: 'Radiology / X-Ray', floor: 'G', col: 1, row: 1, color: '#64748b', icon: '🔭', w: 2, directions: ['From Reception', 'Turn RIGHT', 'Walk past Pharmacy', 'Radiology is at the end of the corridor on Ground Floor'] },
  { id: 6, name: 'General OPD', floor: 'G', col: 3, row: 1, color: '#3B6E91', icon: '🩺', w: 2, directions: ['From Reception', 'Go straight through waiting area', 'General OPD is the large hall on your left', 'Take token number from the counter'] },
  { id: 7, name: 'Physiotherapy', floor: 'G', col: 5, row: 0, color: '#14b8a6', icon: '🏃', w: 1, directions: ['From Reception', 'Turn RIGHT and walk 60 meters', 'Physiotherapy is at the far end of Ground Floor', 'Look for the teal-coloured sign'] },
  { id: 8, name: 'Cardiology', floor: '1', col: 0, row: 0, color: '#E8849F', icon: '❤️', w: 2, directions: ['Take the elevator or stairs to First Floor', 'Turn LEFT from the elevator', 'Cardiology is Wing B — first department on left', 'Cardiologist OPD: Mon, Wed, Fri 9AM–1PM'] },
  { id: 9, name: 'Orthopedics', floor: '1', col: 2, row: 0, color: '#D4AF87', icon: '🦴', w: 2, directions: ['Take the elevator to First Floor', 'Go STRAIGHT from the elevator', 'Orthopedics is ahead in Wing A', 'Bring all previous X-rays and reports'] },
  { id: 10, name: 'ENT Clinic', floor: '1', col: 4, row: 0, color: '#f59e0b', icon: '👂', w: 1, directions: ['Take elevator to First Floor', 'Turn RIGHT from elevator', 'Walk to the far right end of the corridor', 'ENT Clinic is the last room on your right, Wing C'] },
  { id: 11, name: 'Eye Clinic', floor: '1', col: 0, row: 1, color: '#6366f1', icon: '👁️', w: 2, directions: ['Take elevator to First Floor', 'Turn LEFT from elevator', 'Pass Cardiology ward', 'Eye Clinic is next on the left side, Wing D'] },
  { id: 12, name: 'Dermatology', floor: '1', col: 2, row: 1, color: '#ec4899', icon: '🩹', w: 2, directions: ['Take elevator to First Floor', 'Go straight from elevator', 'Pass Orthopedics', 'Dermatology is in the center area, right side'] },
  { id: 13, name: 'Dental Clinic', floor: '1', col: 4, row: 1, color: '#0ea5e9', icon: '🦷', w: 1, directions: ['Take elevator to First Floor', 'Turn RIGHT', 'Pass ENT Clinic', 'Dental Clinic is the last room, far right corner'] },
  { id: 14, name: 'Pediatrics', floor: '2', col: 0, row: 0, color: '#10b981', icon: '👶', w: 2, directions: ['Take elevator to Second Floor', 'Turn LEFT from elevator', 'Colorful Pediatrics ward is in Wing C', 'Children OPD: Mon–Sat 10AM–2PM'] },
  { id: 15, name: 'Gynecology', floor: '2', col: 2, row: 0, color: '#8b5cf6', icon: '🤱', w: 2, directions: ['Take elevator to Second Floor', 'Turn RIGHT from elevator', 'Gynecology spans the entire right wing', 'Available: Mon–Sat 9AM–1PM'] },
  { id: 16, name: 'Neonatal ICU', floor: '2', col: 4, row: 0, color: '#0F9D6B', icon: '🍼', w: 1, directions: ['Take elevator to Second Floor', 'Go straight from elevator', 'Neonatal ICU is behind Pediatrics ward', 'Restricted entry — only authorized persons'] },
  { id: 17, name: 'Maternity Ward', floor: '2', col: 0, row: 1, color: '#C2447A', icon: '🤰', w: 2, directions: ['Take elevator to Second Floor', 'Turn LEFT from elevator', 'Maternity Ward is behind Gynecology', '24-hour delivery services available'] },
  { id: 18, name: 'ICU', floor: '2', col: 2, row: 1, color: '#DC2626', icon: '🏥', w: 2, directions: ['Take elevator to Second Floor', 'Go straight from elevator', 'ICU is the restricted zone at the far end', 'Family waiting area is outside ICU doors'] },
  { id: 19, name: 'Operation Theatre 1', floor: '3', col: 0, row: 0, color: '#0F9D6B', icon: '🔬', w: 2, directions: ['Take elevator to Third Floor', 'OT is in the sterile zone — left wing', 'Only medical staff and authorized persons allowed', 'Patient families wait in the ground floor waiting area'] },
  { id: 20, name: 'Operation Theatre 2', floor: '3', col: 2, row: 0, color: '#059669', icon: '🔬', w: 2, directions: ['Take elevator to Third Floor', 'OT-2 is in the sterile zone — right wing', 'Report to nursing station first', 'Pre-operation preparation room is adjacent'] },
  { id: 21, name: 'Recovery Room', floor: '3', col: 4, row: 0, color: '#D4AF87', icon: '🛏️', w: 1, directions: ['Take elevator to Third Floor', 'Recovery Room is beside Operation Theatres', 'Post-surgery patients are brought here', 'Family can visit after doctor approval only'] },
]

const floors = [
  { id: 'G', label: 'Ground Floor', color: '#FBF0EC', accent: '#C2447A' },
  { id: '1', label: 'First Floor', color: '#EEE8F8', accent: '#8b5cf6' },
  { id: '2', label: 'Second Floor', color: '#E8F5F0', accent: '#10b981' },
  { id: '3', label: 'Third Floor', color: '#FFF8E7', accent: '#f59e0b' },
]

const voiceLangs = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'हिंदी' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'ta-IN', label: 'தமிழ்' },
]

const floorPhotos = {
  G: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=90',
  1: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=90',
  2: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=90',
  3: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=90',
}

export default function HospitalMap() {
  const [activeFloor, setActiveFloor] = useState('G')
  const [selected, setSelected] = useState(null)
  const [voiceOn, setVoiceOn] = useState(false)
  const [voiceLang, setVoiceLang] = useState('en-IN')
  const [search, setSearch] = useState('')
  const [navStep, setNavStep] = useState(0)
  const [showDiagram, setShowDiagram] = useState(false)

  // Preload voices — must be inside component
  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices()
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const floorWards = wards.filter(w => w.floor === activeFloor)
  const floorInfo = floors.find(f => f.id === activeFloor)
  const filteredAll = search ? wards.filter(w => w.name.toLowerCase().includes(search.toLowerCase())) : []

  const speak = (text) => {
    window.speechSynthesis.cancel()

    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = voiceLang
      u.rate = 0.82
      u.pitch = 1

      // Priority: exact match → language family → Google voices → any IN voice
      const exactMatch = voices.find(v => v.lang === voiceLang)
      const familyMatch = voices.find(v => v.lang.startsWith(voiceLang.split('-')[0]))
      const googleMatch = voices.find(v => v.name.includes('Google') && v.lang.startsWith(voiceLang.split('-')[0]))
      const inMatch = voices.find(v => v.lang.includes('IN'))

      const chosenVoice = exactMatch || googleMatch || familyMatch || inMatch
      if (chosenVoice) {
        u.voice = chosenVoice
      }
      window.speechSynthesis.speak(u)
    }

    // If voices not loaded yet, wait
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak
    } else {
      trySpeak()
    }
  }

  const handleSelect = (ward) => {
    setSelected(ward)
    setNavStep(0)
    setShowDiagram(false)
    setActiveFloor(ward.floor)
    if (voiceOn) speak(ward.directions[0])
  }

  const nextStep = () => {
    if (!selected) return
    const next = navStep + 1
    if (next < selected.directions.length) {
      setNavStep(next)
      if (voiceOn) speak(selected.directions[next])
    }
  }

  const prevStep = () => {
    if (navStep > 0) {
      const prev = navStep - 1
      setNavStep(prev)
      if (voiceOn) speak(selected.directions[prev])
    }
  }

  const glassStyle = {
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 32px rgba(194,68,122,0.08)',
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src={floorPhotos[activeFloor]} alt="" className="w-full h-full object-cover opacity-5"/>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', boxShadow: '0 20px 40px rgba(194,68,122,0.3)' }}
          >🗺️</motion.div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Smart Hospital Map</h1>
          <p className="font-medium" style={{ color: '#6B4F56' }}>
            Interactive floor map with AI voice navigation in 4 languages
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={glassStyle}>
            <Search size={18} style={{ color: '#C2447A' }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search any ward, doctor, department..."
              className="flex-1 outline-none bg-transparent font-medium text-sm"
              style={{ color: '#2E1F24' }} />
          </div>
          {filteredAll.length > 0 && (
            <div className="absolute top-14 left-0 right-0 rounded-2xl overflow-hidden z-20"
              style={{ ...glassStyle, maxHeight: '200px', overflowY: 'auto' }}>
              {filteredAll.map(w => (
                <div key={w.id} onClick={() => { handleSelect(w); setSearch('') }}
                  className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-pink-50 transition-colors">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: w.color + '20' }}>{w.icon}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#2E1F24' }}>{w.name}</p>
                    <p className="text-xs font-medium" style={{ color: '#A88B92' }}>
                      {floors.find(f => f.id === w.floor)?.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {floors.map(f => (
              <motion.button key={f.id} onClick={() => { setActiveFloor(f.id); setSelected(null) }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                style={{
                  background: activeFloor === f.id ? f.accent : 'rgba(255,255,255,0.8)',
                  color: activeFloor === f.id ? 'white' : '#5A4248',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeFloor === f.id ? `0 4px 16px ${f.accent}44` : '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                <Building2 size={12}/> {f.label}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select value={voiceLang} onChange={e => setVoiceLang(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-bold outline-none"
              style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', color: '#5A4248', border: '1px solid rgba(194,68,122,0.15)' }}>
              {voiceLangs.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setVoiceOn(!voiceOn)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
              style={{
                background: voiceOn ? '#C2447A' : 'rgba(255,255,255,0.8)',
                color: voiceOn ? 'white' : '#C2447A',
                backdropFilter: 'blur(10px)',
                boxShadow: voiceOn ? '0 4px 16px rgba(194,68,122,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
              }}>
              {voiceOn ? <Volume2 size={13}/> : <VolumeX size={13}/>}
              Voice {voiceOn ? 'ON' : 'OFF'}
            </motion.button>
          </div>
        </div>

        {/* Map area */}
        <motion.div key={activeFloor} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl overflow-hidden mb-6 relative"
          style={{ ...glassStyle, padding: '24px' }}>

          {/* Hospital overview image */}
          <div className="rounded-2xl overflow-hidden mb-5 relative" style={{ height: '80px' }}>
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80"
              alt="Hospital" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex items-center px-5"
              style={{ background: 'linear-gradient(to right, rgba(46,31,36,0.85), transparent)' }}>
              <div>
                <p className="text-white font-bold text-sm">Swasth AI Multi-Specialty Hospital</p>
                <p className="text-white text-xs opacity-75">3 Buildings · 21 Departments · 500+ Beds</p>
              </div>
            </div>
          </div>

          {/* Floor image */}
          <div className="rounded-2xl overflow-hidden mb-5 relative" style={{ height: '130px' }}>
            <img src={floorPhotos[activeFloor]} alt={floorInfo?.label} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex items-end p-4"
              style={{ background: `linear-gradient(to top, ${floorInfo?.accent}CC, transparent)` }}>
              <h2 className="font-bold text-white text-xl">{floorInfo?.label}</h2>
            </div>
          </div>

          {/* Ward grid */}
          <div className="space-y-3">
            {[0, 1].map(row => {
              const rowWards = floorWards.filter(w => w.row === row)
              if (rowWards.length === 0) return null
              return (
                <div key={row} className="flex gap-3 flex-wrap">
                  {rowWards.map((ward, i) => (
                    <motion.div key={ward.id}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(ward)}
                      className="flex-1 min-w-[140px] p-4 rounded-2xl cursor-pointer relative overflow-hidden"
                      style={{
                        background: selected?.id === ward.id ? ward.color : ward.color + '12',
                        border: `1.5px solid ${selected?.id === ward.id ? ward.color : ward.color + '40'}`,
                        boxShadow: selected?.id === ward.id ? `0 8px 24px ${ward.color}44` : '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'all 0.25s',
                      }}>
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: selected?.id === ward.id ? 'rgba(255,255,255,0.3)' : ward.color + '20', color: selected?.id === ward.id ? 'white' : ward.color }}>
                        {ward.id}
                      </div>
                      <div className="text-2xl mb-2">{ward.icon}</div>
                      <p className="font-bold text-sm leading-tight"
                        style={{ color: selected?.id === ward.id ? 'white' : '#2E1F24' }}>
                        {ward.name}
                      </p>
                      {selected?.id === ward.id && (
                        <div className="mt-1 flex items-center gap-1">
                          <Navigation size={10} color="white"/>
                          <p className="text-xs text-white opacity-80">Navigating...</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Navigation panel */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="rounded-3xl overflow-hidden mb-6" style={glassStyle}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative" style={{ minHeight: '200px' }}>
                  <img src={floorPhotos[selected.floor]} alt={selected.name}
                    className="w-full h-full object-cover" style={{ minHeight: '200px' }}/>
                  <div className="absolute inset-0 flex items-end p-5"
                    style={{ background: `linear-gradient(to top, ${selected.color}EE, transparent)` }}>
                    <div>
                      <div className="text-4xl mb-2">{selected.icon}</div>
                      <h3 className="text-white font-bold text-xl">{selected.name}</h3>
                      <p className="text-white text-sm opacity-80">
                        {floors.find(f => f.id === selected.floor)?.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Navigation size={16} style={{ color: '#C2447A' }}/>
                      <h4 className="font-bold" style={{ color: '#2E1F24' }}>Step-by-step directions</h4>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowDiagram(!showDiagram)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg"
                        style={{ background: showDiagram ? '#C2447A' : '#FBF0EC', color: showDiagram ? 'white' : '#C2447A' }}>
                        {showDiagram ? '📝 Steps' : '🗺️ Diagram'}
                      </button>
                    </div>
                  </div>

                  {showDiagram ? (
                    /* Visual direction diagram */
                    <div className="rounded-2xl overflow-hidden mb-4 relative"
                      style={{ background: '#f8f9fa', border: '1px solid rgba(194,68,122,0.1)', minHeight: '160px' }}>
                      <svg width="100%" height="160" viewBox="0 0 300 160">
                        {/* Path visualization */}
                        <defs>
                          <marker id="arrowDir" viewBox="0 0 10 10" refX="8" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto">
                            <path d="M2 1L8 5L2 9" fill="none" stroke={selected.color} strokeWidth="1.5"/>
                          </marker>
                        </defs>
                        {/* Building outline */}
                        <rect x="10" y="10" width="280" height="140" rx="8" fill="white" stroke="#E5D0D8" strokeWidth="1"/>
                        {/* Corridors */}
                        <rect x="130" y="10" width="8" height="140" fill="#f0f0f0"/>
                        <rect x="10" y="75" width="280" height="8" fill="#f0f0f0"/>
                        {/* Entrance */}
                        <rect x="140" y="130" width="20" height="20" rx="3" fill="#E7F5EF"/>
                        <text x="150" y="145" textAnchor="middle" fontSize="7" fill="#059669" fontWeight="700">ENTRY</text>
                        {/* Target ward */}
                        <rect x={selected.floor === 'G' ? 200 : 30} y={selected.floor === 'G' ? 20 : 20}
                          width="70" height="50" rx="6" fill={selected.color + '20'} stroke={selected.color} strokeWidth="1.5"/>
                        <text x={selected.floor === 'G' ? 235 : 65} y={selected.floor === 'G' ? 48 : 45}
                          textAnchor="middle" fontSize="8" fill={selected.color} fontWeight="700">
                          {selected.icon}
                        </text>
                        <text x={selected.floor === 'G' ? 235 : 65} y={selected.floor === 'G' ? 60 : 58}
                          textAnchor="middle" fontSize="6" fill={selected.color} fontWeight="600">
                          {selected.name.length > 10 ? selected.name.substring(0, 9) + '…' : selected.name}
                        </text>
                        {/* You are here */}
                        <circle cx="150" cy="120" r="8" fill="#C2447A"/>
                        <text x="150" y="123" textAnchor="middle" fontSize="7" fill="white" fontWeight="800">YOU</text>
                        {/* Direction arrows */}
                        <path d={selected.floor === 'G'
                          ? 'M150 112 L150 80 L200 80 L200 70'
                          : 'M150 112 L150 80 L90 80 L90 70'}
                          stroke={selected.color} strokeWidth="2" strokeDasharray="4 2" fill="none"
                          markerEnd="url(#arrowDir)"/>
                        {/* Elevator for upper floors */}
                        {selected.floor !== 'G' && (
                          <>
                            <rect x="15" y="40" width="25" height="35" rx="4" fill="#E8849F20" stroke="#E8849F" strokeWidth="1"/>
                            <text x="27" y="60" textAnchor="middle" fontSize="7" fill="#C2447A" fontWeight="700">LIFT</text>
                            <text x="27" y="70" textAnchor="middle" fontSize="8" fill="#C2447A">↕</text>
                          </>
                        )}
                        {/* Floor label */}
                        <text x="150" y="158" textAnchor="middle" fontSize="8" fill="#A88B92" fontWeight="600">
                          {floors.find(f => f.id === selected.floor)?.label}
                        </text>
                      </svg>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-1.5 mb-4">
                        {selected.directions.map((_, i) => (
                          <div key={i} className="h-1.5 rounded-full flex-1 transition-all"
                            style={{ background: i <= navStep ? selected.color : selected.color + '25' }}/>
                        ))}
                      </div>
                      <motion.div key={navStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-2xl mb-4"
                        style={{ background: selected.color + '12', border: `1px solid ${selected.color}30` }}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                            style={{ background: selected.color }}>{navStep + 1}</div>
                          <p className="font-semibold text-sm pt-1" style={{ color: '#2E1F24' }}>
                            {selected.directions[navStep]}
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}

                  <div className="flex gap-2 mb-3">
                    <button onClick={prevStep} disabled={navStep === 0 || showDiagram}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: navStep === 0 || showDiagram ? '#f0f0f0' : selected.color + '15', color: navStep === 0 || showDiagram ? '#ccc' : selected.color }}>
                      ← Previous
                    </button>
                    <button onClick={nextStep} disabled={navStep === selected.directions.length - 1 || showDiagram}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                      style={{ background: navStep === selected.directions.length - 1 || showDiagram ? '#ccc' : selected.color }}>
                      Next Step →
                    </button>
                  </div>
                  <button onClick={() => speak(`Navigating to ${selected.name}. ${selected.directions.join('. Then, ')}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                    <Volume2 size={15}/> Speak All Directions
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ward legend */}
        <div className="rounded-3xl p-6" style={glassStyle}>
          <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: '#2E1F24' }}>
            <MapPin size={16} style={{ color: '#C2447A' }}/> All Wards & Departments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {wards.map(w => (
              <motion.div key={w.id} whileHover={{ scale: 1.03 }} onClick={() => handleSelect(w)}
                className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all"
                style={{ background: selected?.id === w.id ? w.color + '20' : 'rgba(255,255,255,0.6)', border: `1px solid ${w.color}25` }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ background: w.color, fontSize: '10px' }}>{w.id}</div>
                <div>
                  <p className="font-semibold text-xs" style={{ color: '#2E1F24' }}>{w.name}</p>
                  <p className="text-xs" style={{ color: '#A88B92' }}>{floors.find(f => f.id === w.floor)?.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}