import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [isDoctorView, setIsDoctorView] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const source = queryParams.get('source');
    
    setIsDoctorView(!!localStorage.getItem('doctorToken') && source !== 'gallery');

    if (!id) {
       setLoading(false);
       return;
    }

    fetch(`/api/innovations/${id}`)
      .then(res => res.json())
      .then(data => {
         setItem(data);
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
         showToast('Failed to load innovation details', 'error');
      });
  }, [location, showToast]);

  if (loading) {
     return <div className="min-h-screen pt-20 flex items-center justify-center text-on-surface-variant font-headline">Loading Innovation Data...</div>;
  }

  if (!item) {
     return <div className="min-h-screen pt-20 flex items-center justify-center text-on-surface-variant font-headline">Innovation Not Found</div>;
  }

  return (
    <section className="pt-20">
      <div className="pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <button onClick={() => navigate(-1)} className="mb-4 text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                <span className="material-symbols-outlined text-sm">arrow_back</span>Back
              </button>
              <div className="inline-flex items-center px-3 py-1 bg-tertiary-container/10 rounded-full mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed-variant flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary blur-[1px]"></span>{item.category || 'Innovation'} Review Phase
                </span>
              </div>
              <h1 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-none mb-4">
                {item.category ? `${item.category} Proposal` : 'Medical Innovation'}
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed font-light">
                {item.solutionDesign ? item.solutionDesign.substring(0, 150) + '...' : 'A student-led initiative developing solutions for medical challenges.'}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">The Problem</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.problemStatement || 'No target problem defined by student.'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">The Solution</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.solutionDesign || 'No architectural solution mapped.'}</p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl bg-surface-container-low aspect-video">
                  <img alt="Prototype" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.evidenceFiles && item.evidenceFiles.length > 0 ? item.evidenceFiles[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuAreirm7n8d7DAMJzq4KtMVINdNgykPWB5RQS3pNeak5zIpmyUiDqo5IGjmYVfNwNH4BWnQTj5YxbQgKOVPBIhQfJm9tApMm28R427xKRKa9sVqDdLGKoga30bLP18M994F5lP6ZXGl0AnKNzo3jAtfzcgNc0shmV8SHSco51tV43XOiG0B-Kdi-UD5o3I5kLB45yNMFvBvahDal088BeFUQ1agAvS7iceqAmcrjUZnbMFup-hafi8eM5h4uOXA-ETMcRXVXvet_pA"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 text-white text-[10px] font-bold uppercase tracking-widest">Render / Prototype</span>
                </div>
              </div>
              <div className="mt-10 pt-10 border-t border-outline-variant/15 grid grid-cols-2 gap-6">
                <div className="text-center"><span className="block text-2xl font-black text-primary font-headline">{item.patientReach || 'N/A'}</span><span className="text-[10px] text-outline uppercase font-bold tracking-tighter">Est. Annual Patient Reach</span></div>
                <div className="text-center"><span className="block text-2xl font-black text-primary font-headline">{item.outcomeImprovement ? `+${item.outcomeImprovement}%` : 'N/A'}</span><span className="text-[10px] text-outline uppercase font-bold tracking-tighter">Outcome Improvement</span></div>
              </div>
            </section>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-24 bg-gradient-to-r from-primary to-primary-container relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-xl border-4 border-white bg-surface-container-low overflow-hidden shadow-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline">person</span>
                  </div>
                </div>
              </div>
              <div className="pt-14 p-6">
                <h3 className="text-xl font-bold font-headline text-primary">{item.authorName || 'Young Innovator'}</h3>
                <p className="text-xs text-outline font-medium mb-4">{item.university || 'Independent Research'} {item.country ? `• ${item.country}` : ''}</p>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">Pioneering medical student committed to solving high-impact friction spaces in the overarching healthcare network.</p>
                
                {isDoctorView ? (
                  !showContact ? (
                    <button onClick={() => setShowContact(true)} className="w-full mt-2 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold font-headline rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">lock_open</span>Reveal Contact Info
                    </button>
                  ) : (
                    <div className="mt-4 p-4 bg-tertiary-container/10 rounded-xl border border-tertiary-container/30 space-y-3">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-tertiary mb-2">Student Connect Interface</p>
                       <div className="flex items-center gap-2"><span className="material-symbols-outlined text-outline text-sm">mail</span><span className="text-sm font-semibold text-primary">{item.email || 'Email missing'}</span></div>
                       <div className="flex items-center gap-2"><span className="material-symbols-outlined text-outline text-sm">call</span><span className="text-sm font-semibold text-primary">{item.phone || 'Phone missing'}</span></div>
                       <div className="mt-2 text-xs italic text-on-surface-variant">Please mention H.O.W.Innovix when reaching out.</div>
                    </div>
                  )
                ) : (
                   <div className="mt-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 text-center">
                     <span className="material-symbols-outlined text-outline mb-1 text-lg">lock</span>
                     <p className="text-xs font-bold text-outline uppercase tracking-wider">Evaluator Login Required</p>
                     <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">Network contact details are strictly restricted to authenticated doctors.</p>
                   </div>
                )}
              </div>
            </section>
            
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold font-headline uppercase tracking-widest text-primary mb-4">Project Metadata</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm"><span className="text-outline">Submission Date</span><span className="font-medium">{new Date(item.createdAt).toLocaleDateString()}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-outline">Region Hub</span><span className="font-medium">{item.city || 'Global'}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-outline">Phase</span><span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] rounded-full font-black uppercase">{item.status || 'Validation'}</span></div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
