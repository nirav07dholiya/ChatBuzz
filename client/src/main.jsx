import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import SocketProvider from './context/socket.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <SocketProvider>
    <App />
    <Toaster closeButton/>
  </SocketProvider>
  </>,
)
