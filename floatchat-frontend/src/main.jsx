import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MapDataProvider from './context/MapDataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <MapDataProvider>
    <App />
  </MapDataProvider>

)
