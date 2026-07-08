import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Upload, Camera, FileText, AlertCircle, Sparkles } from 'lucide-react'
import { API_URL } from '../config'
export default function PrescriptionScanner() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)
  const cameraRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    setImage(file)
    setResult(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('prescription', image)
      const res = await fetch(`${API_URL}/api/prescription/scan`, { method: 'POST', body: formData })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Could not analyze prescription. Please try again.' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: '#FDF6F4' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
            <Camera size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#2E1F24' }}>Prescription Scanner</h1>
          <p className="font-medium text-sm" style={{ color: '#6B4F56' }}>
            Upload a photo of your prescription — AI will read and explain every medicine
          </p>
        </motion.div>

        {!preview ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-3xl text-center bg-white"
            style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)', border: '2px dashed rgba(194,68,122,0.2)' }}>
            <div className="text-5xl mb-4">📄</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#2E1F24' }}>Upload Prescription Photo</h3>
            <p className="text-sm font-medium mb-6" style={{ color: '#6B4F56' }}>
              Supports handwritten and printed prescriptions. Works in Hindi, Telugu, Tamil & English.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                <Upload size={18}/> Upload Photo
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => cameraRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                style={{ background: '#F0EDFB', color: '#6366f1' }}>
                <Camera size={18}/> Take Photo
              </motion.button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => handleFile(e.target.files?.[0])}/>
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
              onChange={e => handleFile(e.target.files?.[0])}/>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden bg-white p-4"
              style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }}>
              <img src={preview} alt="Prescription" className="w-full rounded-2xl object-contain" style={{ maxHeight: '300px' }}/>
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setPreview(null); setImage(null); setResult(null) }}
                  className="flex-1 py-2.5 rounded-xl font-semibold"
                  style={{ background: '#FBF0EC', color: '#C2447A' }}>
                  Change Photo
                </button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={analyze} disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Reading...</>
                  ) : (
                    <><Sparkles size={16}/> Scan Prescription</>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-3xl bg-white"
                  style={{ boxShadow: '0 8px 32px rgba(194,68,122,0.08)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={18} style={{ color: '#8b5cf6' }}/>
                    <h3 className="font-bold" style={{ color: '#2E1F24' }}>Prescription Analysis</h3>
                  </div>
                  {result.error ? (
                    <div className="flex items-center gap-3 font-medium" style={{ color: '#D97706' }}>
                      <AlertCircle size={18}/> {result.error}
                    </div>
                  ) : (
                    <div className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: '#2E1F24' }}
                      dangerouslySetInnerHTML={{ __html: result.analysis?.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-6 p-4 rounded-2xl flex items-start gap-3"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
          <AlertCircle size={16} style={{ color: '#8b5cf6', marginTop: '2px', shrink: 0 }}/>
          <p className="text-xs font-medium" style={{ color: '#5A4248' }}>
            AI can make errors reading handwritten text. Always verify medicine names and dosages with your doctor or pharmacist before taking any medicine.
          </p>
        </div>
      </div>
    </div>
  )
}