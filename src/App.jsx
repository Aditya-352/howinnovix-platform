import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Gallery from './pages/Gallery'
import Review from './pages/Review'
import Submit from './pages/Submit'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastProvider } from './context/ToastContext'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('doctorToken');
  return token ? children : <Navigate to="/login" replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/review" element={<Review />} />
            <Route path="/submit/*" element={<Submit />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  )
}

export default App
