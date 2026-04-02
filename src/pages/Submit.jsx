import React, { useState, createContext, useContext, useRef } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const SubmissionContext = createContext();

function Sidebar() {
  const location = useLocation();
  const step = location.pathname.split('/').pop();
  const { showToast } = useToast();

  return (
    <aside className="h-[calc(100vh-80px)] w-72 sticky top-20 bg-surface-container-low hidden lg:flex flex-col p-6 gap-y-2">
      <div className="mb-8 px-2">
        <h2 className="text-primary font-bold font-headline text-sm tracking-wide uppercase">Submission Portal</h2>
        <p className="text-on-surface-variant text-xs mt-1">Innovation Phase</p>
      </div>
      <nav className="flex flex-col gap-y-1 flex-grow">
        <Link to="/submit/1" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${step === '1' || step === 'submit' ? 'bg-white text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
          <span className="material-symbols-outlined">info</span><span>Basic Info</span>
        </Link>
        <Link to="/submit/2" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${step === '2' ? 'bg-white text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
          <span className="material-symbols-outlined">psychology</span><span>Problem Space</span>
        </Link>
        <Link to="/submit/3" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${step === '3' ? 'bg-white text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
          <span className="material-symbols-outlined">architecture</span><span>Solution Design</span>
        </Link>
        <Link to="/submit/4" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${step === '4' ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
          <span className="material-symbols-outlined">rocket_launch</span><span>Impact & Files</span>
        </Link>
      </nav>
      {step === '4' ? (
        <div className="mt-auto p-4 rounded-xl bg-tertiary-container/10 border border-tertiary-container/20">
          <p className="text-tertiary text-xs font-bold uppercase tracking-tighter mb-2">Innovation Insight</p>
          <p className="text-on-surface text-xs leading-relaxed">Quantitative impact metrics increase funding probability by <span className="font-bold text-tertiary">42%</span>.</p>
        </div>
      ) : (
        <div className="mt-auto pt-6">
          <button onClick={() => showToast('Draft saved securely.', 'success')} className="w-full py-2.5 px-4 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">save</span>Save Draft
          </button>
        </div>
      )}
    </aside>
  );
}

const COUNTRY_CODES = {
  'United States': '+1',
  'United Kingdom': '+44',
  'Germany': '+49',
  'India': '+91',
  'Nigeria': '+234',
  'Vietnam': '+84',
  'Sri Lanka': '+94'
};

function Step1() {
  const { formData, updateForm } = useContext(SubmissionContext);
  const selectedCode = COUNTRY_CODES[formData.country] || '+1';
  
  return (
    <main className="flex-grow p-12 overflow-y-auto max-w-4xl mx-auto w-full">
      <header className="mb-12">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-tertiary-container text-on-tertiary-fixed-variant text-[10px] font-bold tracking-widest uppercase">Step 1 of 4</div>
        <h1 className="text-primary font-headline text-5xl font-extrabold tracking-tight mb-4">Start your journey.</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">Let's gather the foundational details for your innovation. This helps us categorize your submission and connect you with the right mentors.</p>
      </header>
      <div className="w-full bg-surface-container-lowest p-10 rounded-xl shadow-sm">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2"><label className="block text-sm font-semibold text-primary font-label">Full Name</label><input value={formData.authorName} onChange={e => updateForm('authorName', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50" placeholder="Dr. Alex Rivera" type="text"/></div>
            <div className="space-y-2"><label className="block text-sm font-semibold text-primary font-label">Email Address</label><input value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50" placeholder="alex.rivera@university.edu" type="email"/></div>
            <div className="space-y-2"><label className="block text-sm font-semibold text-primary font-label">Country</label><div className="relative"><select value={formData.country} onChange={e => updateForm('country', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all appearance-none"><option value="">Select Country</option><option value="United States">United States</option><option value="United Kingdom">United Kingdom</option><option value="Germany">Germany</option><option value="India">India</option><option value="Nigeria">Nigeria</option><option value="Vietnam">Vietnam</option><option value="Sri Lanka">Sri Lanka</option></select><span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span></div></div>
            <div className="space-y-2"><label className="block text-sm font-semibold text-primary font-label">WhatsApp Number</label><div className="flex gap-2"><span className="bg-surface-container-low px-3 py-3.5 rounded-xl text-outline-variant font-medium">{selectedCode}</span><input value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="flex-grow bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50" placeholder="(555) 000-0000" type="tel"/></div></div>
            <div className="col-span-full space-y-2"><label className="block text-sm font-semibold text-primary font-label">Heading Tag (Category)</label><div className="relative"><select value={formData.category} onChange={e => updateForm('category', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all appearance-none"><option value="">Select Category</option><option value="Digital Health">Digital Health</option><option value="Diagnostics">Diagnostics</option><option value="Tele-Health">Tele-Health</option><option value="Surgical AI">Surgical AI</option><option value="Biotech">Biotech</option><option value="Patient Care">Patient Care</option></select><span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span></div></div>
            <div className="col-span-full space-y-2"><label className="block text-sm font-semibold text-primary font-label">College/University</label><input value={formData.university} onChange={e => updateForm('university', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50" placeholder="Department of Biomedical Engineering, Stanford University" type="text"/></div>
            <div className="space-y-2"><label className="block text-sm font-semibold text-primary font-label">City</label><input value={formData.city} onChange={e => updateForm('city', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50" placeholder="Palo Alto" type="text"/></div>
          </div>
          <div className="pt-6 flex items-center justify-end">
            <Link to="/submit/2" className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl flex items-center gap-3 hover:shadow-lg transition-all active:scale-95">Next: Problem Space<span className="material-symbols-outlined">arrow_forward</span></Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function Step2() {
  const { formData, updateForm } = useContext(SubmissionContext);
  return (
    <main className="flex-1 overflow-y-auto bg-surface p-12 w-full">
      <div className="max-w-4xl mx-auto w-full">
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label text-xs font-bold mb-4"><span className="material-symbols-outlined text-[14px]">bolt</span>PHASE 02: THE CHALLENGE</div>
          <h1 className="text-primary font-headline font-extrabold tracking-tight text-5xl mb-4 leading-tight">Defining the <br/><span className="text-secondary italic">Medical Friction.</span></h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">Innovation begins with understanding. We require a precise diagnosis of the clinical environment before considering intervention.</p>
        </header>
        <section className="grid grid-cols-1 gap-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-12 -mt-12"></div>
            <div className="relative z-10">
              <label className="block text-primary font-headline font-bold text-xl mb-4">Problem Statement</label>
              <p className="text-on-surface-variant text-sm mb-6 max-w-2xl leading-relaxed">Clearly define the medical challenge. Who is suffering and what is the current bottleneck in their care?</p>
              <textarea value={formData.problemStatement} onChange={e => updateForm('problemStatement', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl p-6 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all placeholder:text-outline/50 resize-none" placeholder="e.g. Current post-operative monitoring for geriatric patients relies on manual 4-hour checks..." rows="12"></textarea>
            </div>
          </div>
        </section>
        <footer className="mt-16 flex justify-between items-center pt-8 border-t border-outline-variant/15">
          <Link to="/submit/1" className="px-8 py-3 bg-surface-container-high text-on-surface font-headline font-bold rounded-xl hover:bg-surface-container-highest transition-all flex items-center gap-2"><span className="material-symbols-outlined text-sm">arrow_back</span>Back</Link>
          <Link to="/submit/3" className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">Next: Proposed Solution<span className="material-symbols-outlined">arrow_forward</span></Link>
        </footer>
      </div>
    </main>
  );
}

function Step3() {
  const { formData, updateForm } = useContext(SubmissionContext);
  return (
    <main className="flex-1 flex flex-col overflow-hidden w-full">
      <div className="flex-1 overflow-y-auto px-12 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-tertiary-container/10 text-on-tertiary-fixed-variant text-xs font-bold mb-4">STEP 3 OF 4</div>
            <h2 className="font-headline text-5xl font-extrabold text-primary mb-4 tracking-tight">Proposed Solution</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">Describe how your intervention addresses the gap identified. Precision and feasibility are key to medical innovation.</p>
          </div>
          <section>
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
              <label className="block font-headline text-xl font-bold text-on-surface mb-4">Solution Design</label>
              <textarea value={formData.solutionDesign} onChange={e => updateForm('solutionDesign', e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl p-6 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/30 transition-all text-base leading-relaxed" placeholder="Detail your methodology..." rows="16"></textarea>
            </div>
          </section>
        </div>
      </div>
      <footer className="h-24 shrink-0 bg-surface-container-lowest border-t border-outline-variant/10 px-12 flex items-center justify-between">
        <Link to="/submit/2" className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-dim transition-all"><span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>Back</Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-label text-on-surface-variant italic mr-4">Draft auto-saved</span>
          <Link to="/submit/4" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Next: Clinical Impact<span className="material-symbols-outlined text-lg">arrow_forward</span></Link>
        </div>
      </footer>
    </main>
  );
}

function Step4() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { formData, updateForm, files, setFiles } = useContext(SubmissionContext);
  const fileInputRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach(key => formPayload.append(key, formData[key]));
      files.forEach(file => formPayload.append('files', file));
      
      const res = await fetch('/api/innovations', {
        method: 'POST',
        body: formPayload
      });

      if (res.ok) {
        showToast("Innovation Submitted Successfully!", "success");
        navigate('/gallery');
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Submission failed", "error");
      }
    } catch (err) {
      showToast("Server error. Check connection.", "error");
    }
  };

  return (
    <main className="flex-1 p-12 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <span className="text-tertiary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Final Validation</span>
        <h2 className="text-on-surface text-4xl font-bold tracking-tight mb-4 font-headline">Clinical Impact & Evidence</h2>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">Define the measurable outcomes of your innovation and provide the technical documentation required for the peer-review board.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section className="space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5">
            <h3 className="text-primary text-lg font-bold mb-6 flex items-center gap-2 font-headline"><span className="material-symbols-outlined">analytics</span>Clinical Metrics</h3>
            <div className="space-y-5">
              <div><label className="block text-sm font-semibold text-on-surface mb-2">Patient Reach (Annual)</label><div className="relative"><input value={formData.patientReach} onChange={e => updateForm('patientReach', e.target.value)} className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-secondary/30 placeholder:text-outline" placeholder="e.g. 5,000+ patients" type="text"/></div></div>
              <div><label className="block text-sm font-semibold text-on-surface mb-2">Outcome Improvement (%)</label><div className="relative"><input value={formData.outcomeImprovement} onChange={e => updateForm('outcomeImprovement', e.target.value)} className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-secondary/30 placeholder:text-outline" placeholder="0" type="number"/></div></div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/5 h-full flex flex-col">
            <h3 className="text-primary text-lg font-bold mb-2 flex items-center gap-2 font-headline"><span className="material-symbols-outlined">upload_file</span>Supporting Evidence</h3>
            <p className="text-on-surface-variant text-xs mb-6">Upload research papers, CAD prototypes, or demo videos.</p>
            <div onClick={() => fileInputRef.current.click()} className="flex-1 border-2 border-dashed border-outline-variant/30 rounded-xl bg-surface-container-low flex flex-col items-center justify-center p-8 text-center transition-all hover:bg-surface-container-high cursor-pointer relative overflow-hidden">
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={e => e.target.files && setFiles(Array.from(e.target.files))} />
              <span className="material-symbols-outlined text-primary text-3xl mb-4">cloud_upload</span>
              <p className="text-on-surface font-bold mb-1">Click to browse</p>
              {files.length > 0 && <p className="text-xs text-secondary font-bold mt-2">{files.length} file(s) selected</p>}
            </div>
          </div>
        </section>
      </div>
      <div className="flex items-center justify-between pt-8 border-t border-outline-variant/15">
        <Link to="/submit/3" className="px-8 py-3 text-on-surface-variant font-bold hover:text-on-surface flex items-center gap-2 transition-all"><span className="material-symbols-outlined">arrow_back</span>Previous Step</Link>
        <div className="flex gap-4">
          <button onClick={() => showToast('Draft saved securely.', 'success')} className="px-8 py-3 text-secondary font-bold hover:bg-secondary-container/20 rounded-xl transition-all">Save as Draft</button>
          <button onClick={handleSubmit} className="px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">Submit Innovation<span className="material-symbols-outlined text-xl">rocket_launch</span></button>
        </div>
      </div>
    </main>
  );
}

export default function Submit() {
  const [formData, setFormData] = useState({
    authorName: '', email: '', country: '', phone: '', category: '', university: '', city: '',
    problemStatement: '', solutionDesign: '', patientReach: '', outcomeImprovement: ''
  });
  const [files, setFiles] = useState([]);

  const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  return (
    <SubmissionContext.Provider value={{ formData, updateForm, files, setFiles }}>
      <section className="pt-20">
        <div className="flex min-h-[calc(100vh-80px)]">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Step1 />} />
            <Route path="1" element={<Step1 />} />
            <Route path="2" element={<Step2 />} />
            <Route path="3" element={<Step3 />} />
            <Route path="4" element={<Step4 />} />
          </Routes>
        </div>
      </section>
    </SubmissionContext.Provider>
  );
}
