import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Mic, MicOff, Send, Activity, AlertCircle, Brain } from 'lucide-react'
import { API_URL } from '../config'
const languages = [
  { code: 'en', label: 'English', lang: 'en-IN' },
  { code: 'hi', label: 'हिंदी', lang: 'hi-IN' },
  { code: 'te', label: 'తెలుగు', lang: 'te-IN' },
  { code: 'ta', label: 'தமிழ்', lang: 'ta-IN' },
]

export default function SymptomChecker() {
  const [lang, setLang] = useState('en')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice not supported in this browser. Please use Chrome.')
      return
    }
    const recognition = new SpeechRecognition()
    const selectedLang = languages.find(l => l.code === lang)
    recognition.lang = selectedLang?.lang || 'en-IN'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => setListening(true)

    recognition.onresult = (e) => {
      let finalTranscript = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript
        }
      }
      if (finalTranscript) {
        setInput(prev => prev + ' ' + finalTranscript)
      }
    }

    recognition.onerror = (e) => {
      console.error('Voice error:', e.error)
      setListening(false)
    }
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopVoice = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const handleCheck = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${API_URL}/api/symptoms/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input, language: lang })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: 'Could not connect to backend. Make sure server is running.' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#FDF6F4' }}>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=1600&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07,
        }} />
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(135deg, rgba(253,246,244,0.98) 0%, rgba(253,246,244,0.85) 60%, rgba(253,246,244,0.6) 100%)'
        }} />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                <Activity size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-3" style={{ color: '#2E1F24' }}>AI symptom checker</h1>
              <p className="font-medium" style={{ color: '#6B4F56' }}>
                Describe how you feel — type or use your voice in your own language
              </p>
            </div>

            {/* Language selector */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {languages.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: lang === l.code ? '#C2447A' : 'white',
                    color: lang === l.code ? 'white' : '#5A4248',
                    boxShadow: '0 4px 12px rgba(194,68,122,0.08)'
                  }}>
                  {l.label}
                </button>
              ))}
            </div>

            {/* Voice status */}
            {listening && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-3 rounded-xl flex items-center gap-3"
                style={{ background: '#FBF0EC', border: '1px solid rgba(194,68,122,0.2)' }}
              >
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#C2447A' }} />
                <span className="text-sm font-semibold" style={{ color: '#C2447A' }}>
                  Listening... speak now in {languages.find(l => l.code === lang)?.label}
                </span>
              </motion.div>
            )}

            {/* Input box */}
            <div className="rounded-3xl p-2 bg-white" style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.08)' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  lang === 'hi' ? 'उदाहरण: मुझे एक हफ्ते से बुखार और सिरदर्द है...' :
                  lang === 'te' ? 'ఉదాహరణ: నాకు ఒక వారం నుండి జ్వరం మరియు తలనొప్పి ఉంది...' :
                  lang === 'ta' ? 'எடுத்துக்காட்டு: எனக்கு ஒரு வாரமாக காய்ச்சல் மற்றும் தலைவலி உள்ளது...' :
                  'Example: I have fever and headache since 2 days...'
                }
                rows={5}
                className="w-full bg-transparent p-5 outline-none resize-none"
                style={{ color: '#2E1F24' }}
              />
              <div className="flex items-center justify-between p-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={listening ? stopVoice : startVoice}
                  className="p-3 rounded-xl flex items-center gap-2 text-sm font-semibold"
                  style={{
                    background: listening ? '#C2447A' : '#FBF0EC',
                    color: listening ? 'white' : '#C2447A'
                  }}
                >
                  {listening ? <MicOff size={20} /> : <Mic size={20} />}
                  {listening ? 'Stop' : 'Voice'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <> Check symptoms <Send size={16} /> </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-3xl bg-white"
                style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.08)' }}
              >
                {result.error ? (
                  <div className="flex items-center gap-3 font-medium" style={{ color: '#D97706' }}>
                    <AlertCircle size={20} /> {result.error}
                  </div>
                ) : (
                  <div className="whitespace-pre-line leading-relaxed" style={{ color: '#2E1F24' }}>
                    {result.diagnosis}
                  </div>
                )}
              </motion.div>
            )}

            {/* AI info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-6 p-5 rounded-2xl flex items-start gap-4"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(194,68,122,0.1)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #D4AF87, #C2447A)', color: 'white' }}>
                <Brain size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#2E1F24' }}>Powered by Groq AI (LLaMA 3)</p>
                <p className="text-xs font-medium" style={{ color: '#6B4F56' }}>
                  Results include confidence scores and reasoning. Always consult a doctor for serious conditions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-[2.5rem] overflow-hidden hidden lg:block"
            style={{ aspectRatio: '4/5', boxShadow: '0 20px 50px rgba(194,68,122,0.18)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=700&q=90"
              alt="Doctor consultation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}