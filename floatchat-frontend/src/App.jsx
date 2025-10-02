import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Landingpage"
import ChatPage from "./pages/ChatPage"
import Map from './pages/Map'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/map" element={<Map />} /> */}
      </Routes>
    </Router>
  )
}
