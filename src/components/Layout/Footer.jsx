import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const { showToast } = useToast();
  return (
    <footer className="bg-surface-container-low py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="editorial-grid mb-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-2xl font-black text-primary font-headline tracking-tight mb-6">H.O.W.Innovix</div>
            <p className="text-on-surface-variant leading-relaxed max-w-xs">Empowering the next generation of medical leaders through collaborative clinical innovation.</p>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <h6 className="font-headline font-bold text-on-surface mb-6">Platform</h6>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><Link className="hover:text-primary transition-colors" to="/gallery">Explore Projects</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/submit">Submit Idea</Link></li>
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <h6 className="font-headline font-bold text-on-surface mb-6">Resources</h6>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li><button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors text-left w-full">Submission Guide</button></li>
              <li><button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors text-left w-full">Research Library</button></li>
              <li><button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors text-left w-full">Success Stories</button></li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <h6 className="font-headline font-bold text-on-surface mb-6">Stay Updated</h6>
            <div className="flex gap-2">
              <input className="flex-1 bg-surface-container-lowest border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20" placeholder="Your medical school email" type="email"/>
              <button onClick={() => showToast('Thank you for joining our newsletter!', 'success')} className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">© 2024 H.O.W.Innovix by Healthyrix. Visionary Healthcare Collaboration.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
            <button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors">Terms of Use</button>
            <button onClick={() => showToast('Redirecting to document...')} className="hover:text-primary transition-colors">Global Ethics</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
