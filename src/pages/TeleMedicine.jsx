import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Video, Calendar, Clock, Star, CheckCircle, VideoOff, Mic, MicOff, Phone, PhoneOff } from 'lucide-react'

const doctors = [
  { id: 1, name: 'Dr. Anjali Sharma', spec: 'Cardiologist', rating: 4.9, exp: '15 yrs', available: true, lang: 'English, Hindi, Telugu' },
  { id: 2, name: 'Dr. Rohan Reddy', spec: 'Orthopedic Surgeon', rating: 4.8, exp: '12 yrs', available: true, lang: 'English, Telugu' },
  { id: 3, name: 'Dr. Priya Nair', spec: 'Gynecologist', rating: 4.7, exp: '10 yrs', available: false, lang: 'English, Tamil, Telugu' },
  { id: 4, name: 'Dr. Arun Kumar', spec: 'Pediatrician', rating: 4.8, exp: '8 yrs', available: true, lang: 'English, Hindi, Telugu' },
  { id: 5, name: 'Dr. Sita Devi', spec: 'General Physician', rating: 4.9, exp: '18 yrs', available: true, lang: 'Telugu, Hindi, English' },
]

export default function Telemedicine() {
  const [booked, setBooked] = useState(null)
  const [inCall, setInCall] = useState(false)
  const [callDoctor, setCallDoctor] = useState(null)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [callTime, setCallTime] = useState(0)
  const [stream, setStream] = useState(null)
  const localVideoRef = useRef(null)
  const timerRef = useRef(null)

  const startCall = async (doctor) => {
    setCallDoctor(doctor)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream
      setInCall(true)
      timerRef.current = setInterval(() => setCallTime(t => t + 1), 1000)
    } catch (err) {
      alert('Please allow camera and microphone access to start video call.')
    }
  }

  const endCall = () => {
    stream?.getTracks().forEach(t => t.stop())
    setStream(null)
    setInCall(false)
    clearInterval(timerRef.current)
    setCallTime(0)
    setCallDoctor(null)
  }

  const toggleMic = () => {
    stream?.getAudioTracks().forEach(t => { t.enabled = !micOn })
    setMicOn(!micOn)
  }

  const toggleCam = () => {
    stream?.getVideoTracks().forEach(t => { t.enabled = !camOn })
    setCamOn(!camOn)
  }

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  useEffect(() => () => { stream?.getTracks().forEach(t => t.stop()); clearInterval(timerRef.current) }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>

      {/* Video Call Screen */}
      <AnimatePresence>
        {inCall && callDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: '#0a0a0a' }}
          >
            {/* Doctor video (simulated) */}
            <div className="flex-1 relative flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0a10, #0a0a1a)' }}>
              <div className="text-center">
                <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                  {callDoctor.name.split(' ')[1]?.[0]}{callDoctor.name.split(' ')[2]?.[0]}
                </div>
                <p className="text-white text-xl font-bold mb-1">{callDoctor.name}</p>
                <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{callDoctor.spec}</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 text-sm font-semibold">{formatTime(callTime)}</p>
                </div>
              </div>

              {/* Patient local video */}
              <div className="absolute bottom-6 right-6 rounded-2xl overflow-hidden"
                style={{ width: '140px', height: '180px', border: '2px solid rgba(255,255,255,0.2)' }}>
                <video ref={localVideoRef} autoPlay muted playsInline
                  className="w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />
                {!camOn && (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: '#1a1a1a' }}>
                    <VideoOff size={24} color="white" />
                  </div>
                )}
              </div>
            </div>

            {/* Call controls */}
            <div className="py-6 px-8 flex items-center justify-center gap-6"
              style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={toggleMic}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: micOn ? 'rgba(255,255,255,0.15)' : '#DC2626' }}>
                {micOn ? <Mic size={22} color="white" /> : <MicOff size={22} color="white" />}
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={endCall}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: '#DC2626' }}>
                <PhoneOff size={26} color="white" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={toggleCam}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: camOn ? 'rgba(255,255,255,0.15)' : '#DC2626' }}>
                {camOn ? <Video size={22} color="white" /> : <VideoOff size={22} color="white" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
              <Video size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>Telemedicine</h1>
            <p className="mb-8 font-medium" style={{ color: '#6B4F56' }}>
              Video consult with a verified doctor from your home. Real camera, real consultation.
            </p>

            <div className="space-y-4">
              {doctors.map((doc, i) => (
                <motion.div key={doc.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-white"
                  style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                        {doc.name.split(' ')[1]?.[0]}{doc.name.split(' ')[2]?.[0]}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: '#2E1F24' }}>{doc.name}</p>
                        <p className="text-sm font-semibold" style={{ color: '#C2447A' }}>{doc.spec}</p>
                        <p className="text-xs font-medium" style={{ color: '#A88B92' }}>{doc.lang}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${doc.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {doc.available ? '● Online' : '● Busy'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={11} fill={j < Math.floor(doc.rating) ? '#D4AF87' : 'none'} color="#D4AF87" />
                      ))}
                      <span className="text-xs font-semibold ml-1" style={{ color: '#6B4F56' }}>{doc.rating}</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#A88B92' }}>· {doc.exp} experience</span>
                  </div>
                  <div className="flex gap-2">
                    {doc.available ? (
                      <>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => startCall(doc)}
                          className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                          <Video size={15} /> Start Video Call
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setBooked(doc)}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                          style={{ background: '#FBF0EC', color: '#C2447A' }}>
                          <Calendar size={15} />
                        </motion.button>
                      </>
                    ) : (
                      <button disabled
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                        style={{ background: '#f1f1f1', color: '#aaa' }}>
                        Currently Unavailable
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {booked && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-2xl flex items-center gap-3"
                style={{ background: '#E7F5EF' }}>
                <CheckCircle size={20} color="#0F9D6B" />
                <div>
                  <p className="text-sm font-bold" style={{ color: '#0F9D6B' }}>Appointment booked with {booked.name}!</p>
                  <p className="text-xs font-medium" style={{ color: '#5A4248' }}>You will receive confirmation on your phone</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="rounded-[2.5rem] overflow-hidden hidden lg:block"
            style={{ aspectRatio: '5/4', boxShadow: '0 20px 50px rgba(194,68,122,0.15)' }}>
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=90"
              alt="Telemedicine" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}