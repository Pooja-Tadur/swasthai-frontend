import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import Navbar from './components/Navbar'
import HealthDashboard from './pages/HealthDashboard'
import NearbyPharmacy from './pages/NearbyPharmacy'
import AIDoctor from './pages/AIDoctor'
import BloodBank from './pages/BloodBank'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: '#FDF6F4' }}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/hospitals" element={<HospitalLocator />} />
            <Route path="/medicines" element={<MedicineSearch />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
            <Route path="/map" element={<HospitalMap />} />
            <Route path="/wards" element={<WardDirectory />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors" element={<DoctorDirectory />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/health-risk" element={<HealthRisk />} />
            <Route path="/prescription" element={<PrescriptionScanner />} />
            <Route path="/vitals" element={<HealthDashboard />} />
            <Route path="/pharmacy" element={<NearbyPharmacy />} />
            <Route path="/ai-doctor" element={<AIDoctor />} />
<Route path="/blood-bank" element={<BloodBank />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}

export default App