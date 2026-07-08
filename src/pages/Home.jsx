import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, MapPin, Pill, Video, Mic, Shield, Users, Clock, Sparkles, Brain, ArrowRight } from 'lucide-react'

const features = [
  { icon: <Brain size={26} />, title: 'AI Symptom Checker', desc: 'Describe symptoms in Hindi, Telugu or Tamil. Get instant AI diagnosis with confidence scores.', path: '/symptoms' },
  { icon: <MapPin size={26} />, title: 'Hospital Locator', desc: 'Find nearest govt hospitals and PHCs with real-time bed availability.', path: '/hospitals' },
  { icon: <Pill size={26} />, title: 'Medicine Finder', desc: 'Find affordable generic substitutes for expensive branded medicines.', path: '/medicines' },
  { icon: <Video size={26} />, title: 'Telemedicine', desc: 'Book video consultations with verified doctors from your village.', path: '/telemedicine' },
]

const stats = [
  { icon: <Users size={22} />, value: '2M+', label: 'Patients helped' },
  { icon: <Shield size={22} />, value: '500+', label: 'Verified doctors' },
  { icon: <MapPin size={22} />, value: '10K+', label: 'Hospitals listed' },
  { icon: <Clock size={22} />, value: '24/7', label: 'AI available' },
]

const glassCard = {
  background: 'rgba(255,255,255,0.80)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px rgba(194,68,122,0.12)',
}

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#FDF6F4' }}>

      {/* Hero */}
      <section className="relative pt-32 pb-0 px-6 min-h-screen flex items-center">
        {/* Stethoscope background */}
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.08,
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(135deg, rgba(253,246,244,1) 0%, rgba(253,246,244,0.95) 50%, rgba(253,246,244,0.7) 100%)'
        }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-8"
              style={{ ...glassCard, color: '#C2447A' }}
            >
              <Sparkles size={15} /> AI-powered healthcare for rural India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1]" style={{ color: '#2E1F24' }}
            >
              Healthcare that<br />
              <span style={{
                background: 'linear-gradient(120deg, #E8849F 0%, #C2447A 50%, #B8862F 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>reaches every village</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium" style={{ color: '#5A4248' }}
            >
              Describe symptoms in your own language. Get a clear AI-powered assessment,
              find nearby doctors, and book consultations — completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/symptoms">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(194,68,122,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl text-base font-semibold text-white flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}
                >
                  <Activity size={19} /> Check symptoms now
                </motion.button>
              </Link>
              <Link to="/hospitals">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2"
                  style={{ ...glassCard, color: '#2E1F24' }}
                >
                  <MapPin size={19} /> Find hospitals
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm font-medium"
              style={{ color: '#6B4F56' }}
            >
              <Mic size={14} /> Also supports voice input in Hindi, Telugu & Tamil
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden" style={{ aspectRatio: '4/5', boxShadow: '0 30px 60px rgba(194,68,122,0.2)' }}>
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=90"
                alt="Doctor consulting patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(194,68,122,0.3) 100%)' }} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              className="absolute -left-6 top-12 p-4 rounded-2xl flex items-center gap-3" style={glassCard}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8849F, #C2447A)' }}>
                <Activity size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#2E1F24' }}>AI diagnosis</div>
                <div className="text-xs font-medium" style={{ color: '#6B4F56' }}>98% accurate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
              className="absolute -right-6 bottom-16 p-4 rounded-2xl flex items-center gap-3" style={glassCard}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4AF87, #B8862F)' }}>
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#2E1F24' }}>Verified doctors</div>
                <div className="text-xs font-medium" style={{ color: '#6B4F56' }}>500+ available</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wave */}
      <div className="relative mt-16">
        <svg viewBox="0 0 1440 100" className="w-full" style={{ display: 'block' }}>
          <path fill="#FBF0EC" d="M0,40 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Stats */}
      <section className="px-6 py-16" style={{ background: '#FBF0EC' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center p-7 rounded-3xl bg-white"
              style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
            >
              <div className="flex justify-center mb-3" style={{ color: '#C2447A' }}>{stat.icon}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#2E1F24' }}>{stat.value}</div>
              <div className="text-sm font-medium" style={{ color: '#6B4F56' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About + Features */}
      <section className="py-20 px-6" style={{ background: '#FBF0EC' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative mx-auto lg:mx-0" style={{ width: '340px', height: '340px' }}
            >
              <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(194,68,122,0.2)' }}>
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=90"
                  alt="Doctor with patient"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full overflow-hidden border-4 border-white"
                style={{ boxShadow: '0 10px 30px rgba(194,68,122,0.25)' }}>
                <img
                  src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=90"
                  alt="Care"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2E1F24' }}>
                Everything you need,{' '}
                <span style={{
                  background: 'linear-gradient(120deg, #E8849F, #B8862F)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>in one place</span>
              </h2>
              <p className="text-lg font-medium mb-6" style={{ color: '#6B4F56' }}>
                Built specifically for rural India — works in your language, on any phone
              </p>
              <div className="space-y-3">
                {['Works on low-end phones and slow networks', 'No login required for basic symptom checks', 'Available in Hindi, Telugu, Tamil & English'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{ background: '#E7F5EF', color: '#0F9D6B' }}>✓</div>
                    <span className="font-medium" style={{ color: '#3D2C32' }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Link key={i} to={feature.path}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="p-8 rounded-3xl cursor-pointer group relative overflow-hidden bg-white"
                  style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, rgba(232,132,159,0.2) 0%, transparent 70%)' }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #F4A6C1, #E8849F)', color: 'white' }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10" style={{ color: '#2E1F24' }}>{feature.title}</h3>
                  <p className="text-sm relative z-10 font-medium" style={{ color: '#5A4248', lineHeight: '1.7' }}>{feature.desc}</p>
                  <div className="mt-5 text-sm font-semibold flex items-center gap-1.5 relative z-10" style={{ color: '#C2447A' }}>
                    Get started <ArrowRight size={14} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wave reverse */}
      <div className="relative" style={{ transform: 'scaleY(-1)' }}>
        <svg viewBox="0 0 1440 100" className="w-full" style={{ display: 'block' }}>
          <path fill="#FBF0EC" d="M0,40 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Story section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '5/4', boxShadow: '0 30px 60px rgba(194,68,122,0.15)' }}>
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=90"
                alt="Rural healthcare"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-4 p-5 rounded-2xl max-w-[220px]" style={glassCard}
            >
              <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <span key={i} style={{ color: '#D4AF87' }}>★</span>)}</div>
              <p className="text-xs font-medium" style={{ color: '#5A4248' }}>
                "Got medicine advice for my father in our own language. Truly life-changing."
              </p>
              <p className="text-xs font-bold mt-2" style={{ color: '#2E1F24' }}>— Lakshmi, Telangana</p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2E1F24' }}>
              Built for the{' '}
              <span style={{
                background: 'linear-gradient(120deg, #E8849F, #B8862F)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>last mile</span>
            </h2>
            <p className="text-lg font-medium mb-4" style={{ color: '#5A4248', lineHeight: '1.8' }}>
              Most healthcare apps are built for cities. We built Swasth AI for the village
              two hours from the nearest hospital — where a smartphone might be the
              only doctor someone can reach today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Transparency */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-3xl p-8 flex items-start gap-5 bg-white"
          style={{ boxShadow: '0 8px 24px rgba(194,68,122,0.06)' }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #D4AF87, #C2447A)', color: 'white' }}>
            <Brain size={20} />
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg" style={{ color: '#2E1F24' }}>How our AI works — fully transparent</h4>
            <p className="text-sm font-medium" style={{ color: '#5A4248', lineHeight: '1.7' }}>
              Every AI suggestion shows its confidence level and reasoning. This tool supports your
              decisions — it never replaces a licensed doctor for serious or emergency conditions.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="pb-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-16 rounded-[2.5rem] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #E8849F 0%, #C2447A 60%, #B8862F 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">Your health matters</h2>
          <p className="text-lg mb-10 relative z-10 font-medium" style={{ color: 'rgba(255,255,255,0.95)' }}>
            Join millions of rural Indians getting quality healthcare through AI
          </p>
          <Link to="/symptoms">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-2xl text-base font-bold relative z-10"
              style={{ background: 'white', color: '#C2447A' }}
            >
              Start free consultation
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}