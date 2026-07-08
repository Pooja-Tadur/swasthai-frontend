import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Mic, MicOff, Sparkles } from 'lucide-react'
import { API_URL } from '../config'
const suggestions = [
  'Which ward should I go for fever?',
  'What documents do I need for admission?',
  'What is OPD timing for Cardiology?',
  'Where is the pharmacy located?',
  'How to book a telemedicine appointment?',
  'What is the emergency contact number?',
]

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! 👋 I am **Swasth AI Assistant** — your smart hospital guide.\n\nI can help you with:\n• Finding the right ward or doctor\n• Hospital navigation & directions\n• Appointment booking guidance\n• Medicine information\n• Emergency procedures\n\nHow can I help you today?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const history = messages.slice(-8).map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not connect. Please try again.' }])
    }
    setLoading(false)
  }

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return alert('Please use Chrome browser for voice input')
    const r = new SR()
    r.lang = 'en-IN'
    r.continuous = false
    r.onstart = () => setListening(true)
    r.onresult = e => { setInput(e.results[0][0].transcript); setListening(false) }
    r.onend = () => setListening(false)
    recognitionRef.current = r
    r.start()
  }

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/•/g, '&bull;')
  }

  return (
    <div className="min-h-screen pt-24 pb-6 px-4" style={{ background: '#FDF6F4' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2E1F24' }}>Swasth AI Assistant</h1>
          <p className="font-medium text-sm" style={{ color: '#6B4F56' }}>
            Ask anything about the hospital — wards, doctors, medicines, directions
          </p>
        </motion.div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {suggestions.map((s, i) => (
              <motion.button key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => sendMessage(s)}
                className="px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'white', color: '#C2447A', border: '1px solid rgba(194,68,122,0.2)', boxShadow: '0 2px 8px rgba(194,68,122,0.06)' }}>
                {s}
              </motion.button>
            ))}
          </div>
        )}

        {/* Chat messages */}
        <div className="rounded-3xl overflow-hidden mb-4"
          style={{ background: 'white', boxShadow: '0 8px 32px rgba(194,68,122,0.08)', minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
          <div className="p-5 space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? '' : ''}`}
                  style={{ background: msg.role === 'assistant' ? 'linear-gradient(135deg, #E8849F, #C2447A)' : '#FBF0EC' }}>
                  {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} style={{ color: '#C2447A' }} />}
                </div>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed`}
                  style={{
                    background: msg.role === 'assistant' ? '#FDF6F4' : 'linear-gradient(135deg, #E8849F, #C2447A)',
                    color: msg.role === 'assistant' ? '#2E1F24' : 'white',
                    borderRadius: msg.role === 'assistant' ? '4px 20px 20px 20px' : '20px 4px 20px 20px'
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                  <Bot size={16} className="text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl" style={{ background: '#FDF6F4' }}>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: '#C2447A' }}
                        animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 items-center p-2 rounded-2xl bg-white"
          style={{ boxShadow: '0 4px 20px rgba(194,68,122,0.1)', border: '1px solid rgba(194,68,122,0.12)' }}>
          <button onClick={startVoice}
            className="p-2.5 rounded-xl shrink-0"
            style={{ background: listening ? '#C2447A' : '#FBF0EC', color: listening ? 'white' : '#C2447A' }}>
            {listening ? <MicOff size={18}/> : <Mic size={18}/>}
          </button>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything about the hospital..."
            className="flex-1 outline-none bg-transparent text-sm font-medium py-2"
            style={{ color: '#2E1F24' }} />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)', opacity: !input.trim() ? 0.5 : 1 }}>
            <Send size={18}/>
          </motion.button>
        </div>
        <p className="text-center text-xs mt-3 font-medium" style={{ color: '#A88B92' }}>
          <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }}/>
          Powered by Groq LLaMA 3.3 · Multilingual support · Voice enabled
        </p>
      </div>
    </div>
  )
}