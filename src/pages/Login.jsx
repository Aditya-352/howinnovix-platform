import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('doctorToken', data.token);
        localStorage.setItem('doctorData', JSON.stringify(data.doctor));
        showToast('Login successful', 'success');
        navigate('/dashboard');
      } else {
        showToast(data.message || 'Login failed', 'error');
      }
    } catch (err) {
      showToast('API Error: Could not connect to server', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 pt-20">
      <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-xl border border-outline-variant/10 max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold font-headline text-primary mb-2">Doctor Portal</h2>
          <p className="text-sm text-on-surface-variant font-body">Sign in to evaluate submissions</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-on-surface" 
              placeholder="dr.smith@howinnovix.com"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-on-surface" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="w-full mt-4 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
            Secure Login
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center space-y-4">
            <p className="text-sm text-on-surface-variant font-body">Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Apply Here</Link></p>
            <button onClick={async () => {
                await fetch('/api/auth/seed', { method: 'POST' });
                showToast('Test doctor seeded: admin@howinnovix.com / password123', 'success');
            }} className="text-xs text-secondary font-bold hover:underline opacity-50 hover:opacity-100">
                [Dev] Create Test Seed Doctor
            </button>
        </div>
      </div>
    </div>
  );
}
