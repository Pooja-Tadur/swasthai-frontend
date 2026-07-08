import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Stethoscope, Send, Mic, MicOff, Brain, AlertCircle, FileText, Camera } from 'lucide-react'
import { API_URL } from '../config'
const quickQuestions = [
  'Is my blood pressure 140/90 normal?',
  'My child has 103°F fever for 2 days, what to do?',
  'Can I take Paracetamol with Ibuprofen?',
  'What does high creatinine in blood test mean?',
  'I feel chest tightness when climbing stairs',
  'Is it safe to skip BP medicine for one day?',
]

export default function AIDoctor() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const bottomRef = useRef(null)
  const fileRef = useRef(null)
  const recRef = useRef(null)

  const scrollDown = () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

  const handleFile = (file) => {
    if (!file) return
    setImage(file)
    const r = new FileReader()
    r.onload = e => setPreview(e.target.result)
    r.readAsDataURL(file)
  }

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return alert('Use Chrome for voice input')
    const r = new SR()
    r.lang = 'en-IN'; r.continuous = true; r.interimResults = true
    r.onstart = () => setListening(true)
    r.onresult = e => {
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++)
        if (e.results[i].isFinal) final += e.results[i][0].transcript
      if (final) setInput(p => p + ' ' + final)
    }
    r.onend = () => setListening(false)
    recRef.current = r
    r.start()
  }

  const stopVoice = () => { recRef.current?.stop(); setListening(false) }

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg && !image) return
    setInput('')

    const userMsg = { role: 'user', content: msg, image: preview }
    setMessages(p => [...p, userMsg])
    setPreview(null); setImage(null)
    setLoading(true)
    scrollDown()

    try {
      const formData = new FormData()
      formData.append('question', msg)
      formData.append('history', JSON.stringify(messages.slice(-6)))
      if (image) formData.append('image', image)

      const res = await fetch(`${API_URL}/api/ai-doctor`, {
        method: 'POST', body: formData
      })
      const data = await res.json()
      setMessages(p => [...p, { role: 'assistant', content: data.answer }])
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: 'Connection error. Please try again.' }])
    }
    setLoading(false)
    scrollDown()
  }

  const glassCard = {
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 32px rgba(194,68,122,0.08)',
  }

  return (
    <div className="min-h-screen pt-24 pb-6 px-4" style={{ background: '#FDF6F4' }}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt=""
          className="w-full h-full object-cover opacity-5"/>
      </div>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', boxShadow: '0 20px 40px rgba(194,68,122,0.3)' }}>
            <Stethoscope size={32} className="text-white"/>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#2E1F24' }}>AI Second Opinion</h1>
          <p className="text-sm font-medium mb-1" style={{ color: '#6B4F56' }}>
            Ask any medical question, share lab reports or skin photos — get expert AI guidance instantly
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: '#E7F5EF', color: '#0F9D6B' }}>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            AI Doctor Available 24/7 — Powered by LLaMA 3.3
          </div>
        </motion.div>

        {/* Quick questions */}
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
            <p className="text-xs font-bold mb-3 text-center" style={{ color: '#A88B92' }}>COMMON QUESTIONS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map((q, i) => (
                <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => send(q)}
                  className="p-3 rounded-xl text-left text-xs font-semibold hover:scale-102 transition-all"
                  style={glassCard}>
                  💬 {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat */}
        <div className="rounded-3xl mb-4 overflow-hidden" style={{ ...glassCard, minHeight: '300px', maxHeight: '460px', overflowY: 'auto' }}>
          <div className="p-5 space-y-5">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{ background: msg.role === 'assistant' ? 'linear-gradient(135deg, #E8849F, #C2447A)' : '#FBF0EC' }}>
                  {msg.role === 'assistant' ? '🩺' : '👤'}
                </div>
                <div className="max-w-[82%]">
                  {msg.image && (
                    <img src={msg.image} alt="uploaded" className="rounded-xl mb-2 max-h-36 object-cover"/>
                  )}
                  <div className="px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed"
  style={{
    background: msg.role === 'assistant' ? '#FDF6F4' : 'linear-gradient(135deg, #E8849F, #C2447A)',
    color: msg.role === 'assistant' ? '#2E1F24' : 'white',
    borderRadius: msg.role === 'assistant' ? '4px 20px 20px 20px' : '20px 4px 20px 20px'
  }}
  dangerouslySetInnerHTML={{
    __html: (msg.content || 'Processing...')
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  }}
/>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>🩺</div>
                <div className="px-4 py-3 rounded-2xl" style={{ background: '#FDF6F4' }}>
                  <div className="flex gap-1 items-center">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: '#C2447A' }}
                        animate={{ scale: [1,1.5,1], opacity: [0.5,1,0.5] }}
                        transition={{ duration: 0.8, delay: i*0.2, repeat: Infinity }}/>
                    ))}
                    <span className="text-xs font-medium ml-2" style={{ color: '#A88B92' }}>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
        </div>

        {/* Image preview */}
        {preview && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-3"
            style={{ background: '#FBF0EC', border: '1px solid rgba(194,68,122,0.2)' }}>
            <img src={preview} alt="preview" className="w-12 h-12 rounded-xl object-cover"/>
            <div className="flex-1">
              <p className="text-xs font-bold" style={{ color: '#2E1F24' }}>Image attached</p>
              <p className="text-xs" style={{ color: '#A88B92' }}>AI will analyze this image</p>
            </div>
            <button onClick={() => { setPreview(null); setImage(null) }}
              className="text-xs font-bold px-2 py-1 rounded-lg"
              style={{ background: '#DC2626', color: 'white' }}>✕</button>
          </motion.div>
        )}

        {/* Input */}
        <div className="flex gap-2 items-center p-2 rounded-2xl"
          style={{ ...glassCard, border: '1px solid rgba(194,68,122,0.15)' }}>
          <button onClick={() => fileRef.current?.click()}
            className="p-2.5 rounded-xl shrink-0" style={{ background: '#FBF0EC', color: '#8b5cf6' }}>
            <Camera size={18}/>
          </button>
          <button onClick={listening ? stopVoice : startVoice}
            className="p-2.5 rounded-xl shrink-0"
            style={{ background: listening ? '#C2447A' : '#FBF0EC', color: listening ? 'white' : '#C2447A' }}>
            {listening ? <MicOff size={18}/> : <Mic size={18}/>}
          </button>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask any medical question or describe your symptoms..."
            className="flex-1 outline-none bg-transparent text-sm font-medium py-2"
            style={{ color: '#2E1F24' }}/>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => send()} disabled={(!input.trim() && !image) || loading}
            className="p-2.5 rounded-xl text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: (!input.trim() && !image) ? 0.5 : 1 }}>
            <Send size={18}/>
          </motion.button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}/>
        <p className="text-center text-xs mt-3 font-medium" style={{ color: '#A88B92' }}>
          ⚕️ AI guidance only — not a replacement for professional medical consultation
        </p>
      </div>
    </div>
  )
}