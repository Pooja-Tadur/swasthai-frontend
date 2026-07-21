import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './pages/Home'
import SymptomChecker from './pages/SymptomChecker'
import HospitalLocator from './pages/HospitalLocator'
import MedicineSearch from './pages/MedicineSearch'
import Telemedicine from './pages/Telemedicine'
import HospitalMap from './pages/HospitalMap'
import WardDirectory from './pages/WardDirectory'
import Appointments from './pages/Appointments'
import DoctorDirectory from './pages/DoctorDirectory'
import Emergency from './pages/Emergency'
import AIChat from './pages/AIChat'
import HealthRisk from './pages/HealthRisk'
import PrescriptionScanner from './pages/PrescriptionScanner'
import HealthDashboard from './pages/HealthDashboard'
import NearbyPharmacy from './pages/NearbyPharmacy'
import AIDoctor from './pages/AIDoctor'
import BloodBank from './pages/BloodBank'
import Navbar from './components/Navbar'
import FloatingChat from './components/FloatingChat'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import { useTheme } from './context/ThemeContext'
import OutbreakTracker from './pages/OutbreakTracker'
import CommunityPortal from './pages/CommunityPortal'
import PaymentGateway from './pages/PaymentGateway'
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/symptoms" element={<PageTransition><SymptomChecker /></PageTransition>} />
        <Route path="/hospitals" element={<PageTransition><HospitalLocator /></PageTransition>} />
        <Route path="/medicines" element={<PageTransition><MedicineSearch /></PageTransition>} />
        <Route path="/telemedicine" element={<PageTransition><Telemedicine /></PageTransition>} />
        <Route path="/map" element={<PageTransition><HospitalMap /></PageTransition>} />
        <Route path="/wards" element={<PageTransition><WardDirectory /></PageTransition>} />
        <Route path="/appointments" element={<PageTransition><Appointments /></PageTransition>} />
        <Route path="/doctors" element={<PageTransition><DoctorDirectory /></PageTransition>} />
        <Route path="/emergency" element={<PageTransition><Emergency /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><AIChat /></PageTransition>} />
        <Route path="/health-risk" element={<PageTransition><HealthRisk /></PageTransition>} />
        <Route path="/prescription" element={<PageTransition><PrescriptionScanner /></PageTransition>} />
        <Route path="/vitals" element={<PageTransition><HealthDashboard /></PageTransition>} />
        <Route path="/pharmacy" element={<PageTransition><NearbyPharmacy /></PageTransition>} />
        <Route path="/ai-doctor" element={<PageTransition><AIDoctor /></PageTransition>} />
        <Route path="/blood-bank" element={<PageTransition><BloodBank /></PageTransition>} />
        <Route path="/outbreak" element={<PageTransition><OutbreakTracker /></PageTransition>} />
<Route path="/community" element={<PageTransition><CommunityPortal /></PageTransition>} />
<Route path="/payment" element={<PageTransition><PaymentGateway /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const { dark } = useTheme()
  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <div className="min-h-screen transition-colors duration-500"
  style={{ background: dark ? '#0F1117' : '#FDF6F4', color: dark ? '#F5F1E8' : '#2E1F24' }}>

          <Navbar />
          <AnimatedRoutes />
          <FloatingChat />
          <ScrollToTop />
        </div>
      )}
    </BrowserRouter>
  )
}

export default App