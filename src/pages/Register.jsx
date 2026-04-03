import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('doctorToken', data.token);
        localStorage.setItem('doctorData', JSON.stringify(data.doctor));
        showToast('Registration successful, welcome onboard', 'success');
        navigate('/dashboard');
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      showToast('API Error: Could not connect to server', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 pt-20">
      <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-xl border border-outline-variant/10 max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold font-headline text-primary mb-2">Doctor Application</h2>
          <p className="text-sm text-on-surface-variant font-body">Register as an evaluator on the network.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-sm text-on-surface" 
                placeholder="Dr. Julia"
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Job Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-sm text-on-surface" 
                placeholder="Chief of Gen."
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-sm text-on-surface" 
              placeholder="dr.julia@howinnovix.com"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-outline">Create Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/30 transition-all font-body text-sm text-on-surface" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="w-full mt-2 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
            Submit Registration
          </button>
        </form>
        <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant font-body">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
