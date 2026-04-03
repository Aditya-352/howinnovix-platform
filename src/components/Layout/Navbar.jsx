import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Navbar() {
  const location = useLocation();
  const { showToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  
  const isLoggedIn = !!localStorage.getItem('doctorToken');
  let doctorData = null;
  try { 
    doctorData = JSON.parse(localStorage.getItem('doctorData')); 
  } catch(e) {}
  
  // Conditionally hide action buttons on specific pages
  const hideActionButtons = ['/dashboard', '/gallery', '/submit', '/review'].some(path => location.pathname.startsWith(path));

  const NavLinks = () => (
    <>
      <Link to="/" onClick={() => setIsMenuOpen(false)} className={`nav-link font-[Manrope] tracking-tight font-bold text-slate-600 hover:text-cyan-500 transition-all duration-300 ${isHome ? 'text-secondary border-b-2 border-secondary pb-1' : ''}`}>Home</Link>
      <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className={`nav-link font-[Manrope] tracking-tight font-bold text-slate-600 hover:text-cyan-500 transition-all duration-300 ${location.pathname === '/gallery' ? 'text-secondary border-b-2 border-secondary pb-1' : ''}`}>Explore Ideas</Link>
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/70 backdrop-blur-xl shadow-sm shadow-cyan-900/5">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-extrabold tracking-tighter text-cyan-900 font-headline">H.O.W.Innovix</Link>
          
          {/* Desktop Links */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-6 items-center">
              <NavLinks />
            </div>
          )}
          {isLoggedIn && (
            <div className="hidden md:flex gap-6 items-center">
              <Link to="/dashboard" className="nav-link font-[Manrope] tracking-tight font-bold text-secondary border-b-2 border-secondary pb-1 transition-all">Evaluator Dashboard</Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {!hideActionButtons && (
              <div className="flex items-center gap-3">
                {!isLoggedIn && (
                  <Link to="/login" className="px-5 py-2.5 bg-surface-container-high text-primary font-headline font-bold rounded-xl hover:bg-surface-container-highest transition-all group flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm hidden group-hover:block">login</span>Doctor Login
                  </Link>
                )}
                <Link to="/submit" className="px-5 py-2.5 bg-primary text-white font-headline font-bold rounded-xl hover:bg-primary-container transition-all shadow-md">Submit Idea</Link>
              </div>
            )}
            
            <button onClick={() => showToast('Notifications: No new alerts.')} className="p-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-all duration-300 active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="p-2 text-primary bg-primary/5 hover:bg-primary/10 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center border border-primary/20 shadow-sm">
                  <span className="material-symbols-outlined text-lg">account_circle</span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-cyan-900/5 border border-outline-variant/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden origin-top-right transform scale-95 group-hover:scale-100">
                  <div className="p-4 border-b border-outline-variant/10 bg-surface-container-lowest">
                    <p className="text-sm font-bold text-primary truncate font-headline">{doctorData?.name || 'Doctor Profile'}</p>
                    <p className="text-xs text-outline truncate">{doctorData?.email || 'Authenticated Hub'}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { localStorage.removeItem('doctorToken'); localStorage.removeItem('doctorData'); window.location.href='/'; }} className="w-full text-left px-4 py-3 rounded-xl text-sm text-error hover:bg-error/10 flex items-center gap-3 font-bold transition-colors">
                      <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out Account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => showToast('Log in to access profile settings.')} className="p-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-all duration-300 active:scale-95">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            )}

            {/* Hamburger Button (Mobile) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[72px] z-40 bg-slate-50/95 backdrop-blur-2xl transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-8 gap-8 items-center text-center">
          <NavLinks />
          {isLoggedIn && (
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="nav-link font-[Manrope] text-xl font-bold text-secondary">Evaluator Dashboard</Link>
          )}
          <hr className="w-full border-slate-200" />
          {!hideActionButtons && (
            <div className="flex flex-col w-full gap-4">
              {!isLoggedIn && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center bg-surface-container-high text-primary font-headline font-bold rounded-2xl hover:bg-surface-container-highest transition-all flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined">login</span>Doctor Login
                </Link>
              )}
              <Link to="/submit" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center bg-primary text-white font-headline font-bold rounded-2xl hover:bg-primary-container transition-all shadow-lg flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">add_circle</span>Submit Idea
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
