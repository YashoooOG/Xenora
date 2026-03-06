import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import WhyTrustUs from './pages/whytrsutus'
import ReclaimerReview from './pages/reclaimerreview'
import LoginPage from './pages/loginpage'
import UserDashboard from './pages/userdashboard'
import Homepage from './pages/homepage'
import AddLostItem from './pages/addlostitem'
import UnlistedReports from './pages/unlisted'
import ItemDetail from './pages/itemdetail'
import UserProfile from './pages/userprofile'
import ChatPage from './pages/chat'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/whytrsutus" element={<WhyTrustUs />} />
        <Route path="/reclaimerreview" element={<ReclaimerReview />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/add-item" element={<AddLostItem />} />
        <Route path="/unlisted" element={<UnlistedReports />} />
        <Route path="/item" element={<ItemDetail />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/item/:id" element={<ItemDetail />} /> */}
        {/* <Route path="/report" element={<ReportItem />} /> */}
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/notifications" element={<Notifications />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
