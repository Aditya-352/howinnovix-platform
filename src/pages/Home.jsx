import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section id="page-home" className="pt-20">
      {/* Hero */}
      <div className="relative px-8 py-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto editorial-grid items-center">
          <div className="col-span-12 lg:col-span-7 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Student Innovation Hub</span>
            <h1 className="font-headline text-primary font-extrabold leading-[1.1] tracking-tight mb-8 text-5xl md:text-7xl max-w-2xl">Turn Your Clinical Vision into Reality</h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-12 leading-relaxed">H.O.W.Innovix bridges the gap between ambitious medical students and experienced clinicians. Pitch your breakthrough ideas and collaborate with the minds shaping the future of healthcare.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/submit" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-xl font-headline font-bold text-lg shadow-xl hover:opacity-90 active:scale-[0.98] transition-all text-center">Start Your Submission</Link>
              <Link to="/gallery" className="bg-surface-container-high text-on-surface px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-colors text-center">Explore Ideas</Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC64HhYmEoFmrJnMpI5bIS_3W3s9dpBxK7sI9JT2PKLKH04Ey02VFfdgGoM018Frh138ef34O6-oyA1pSU3I3Lt38cPlDGmFTJ4qHnuVFrOtYI4BceTolEQN6mrhFB7_ibOcU3PQG9L866y2UGqs-26Z7zPCr-THPGVWT7tgoSP-FjEDfBeVvHcpuRZal7ZxP0LIGZW0sIM2YcWrAgoq2ijbc38l59_0kvgqybqqZVC4nkNoYqBKL9sT5yzfgs-Zig1zccfZEMGqJA" alt="Medical students collaborating"/>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-tertiary">psychology</span></div>
                <div><p className="text-xs font-bold text-tertiary uppercase tracking-widest">Active Mentors</p><p className="text-on-surface font-headline font-bold">128 Clinical Experts</p></div>
              </div>
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC73FXgWB-4sPowGz5PU1_0sd3Nj5SbyCmq5WsN2pi6hUsw5vlOD9abcUPepnXEkmu5Q_uviKFd0bZrH0XC6fpN064LQz0AdGYI2VG7K7pNzezb9cuzRMJG0FqTE7NKgE5L2j6V5f8Mrf5IzklL7aEM-JSs_ONO5NMsg5kMo2ea66Qgpkqs17fW1wfhY_FujICBi4iKQPvFFQWrWQuxFZDFWATKW0xLo4fyAi9seG66Mt48GdBbei8g7YFA8G34qwJ50bPJM2Zhrfo" alt="Mentor"/>
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2YTfBDWUAl5SNilnhQvB8ti6Ca5d_cSA919xQUVih9mY51E0QP9zMdhlNshSvwReUb8hj7gccTdZt15j6_PEArbP_beT87iXNom7TjZCcygVllSWYSufLR2Xddne1V6fFetRAnJyqvAoVItOe-f0HhHH9kbDNTSKGd92mP8-GGND_iSH4_p33eMgeOB4S0emoKkKrNHvC6wGfWV9gxUe5KAO9mkaSiFyz06DeeaO24tiCXKmuZkd5X1LtIfVcqAjIL5r8YdbMRr4" alt="Mentor"/>
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuzr-xKxA-4tcnKMMERfUS_yvjo5IbO8sFenCtDF7xziWNOzA-S30hJpwTtpWx88B3X9Af2Sku4of2dfGizyQ0vCenDqnmf0MipwphJwV8k9PBVCPEwl95TwASilr_eM64Eo6FGDSU9JhbrxcAvp08Nmup1po7eoBFIy2cnl0xu9HW6N_mNczez26KhPTlDGJIIzWD6SRRuYPkX52HwO23jlA-B0EbNEPi0zxyFk1hhzu0tol8fwjb0U-xADam7uColoPqACW5ZRE" alt="Mentor"/>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold">+125</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why Join */}
      <div className="py-24 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="mb-16"><h2 className="text-4xl font-headline font-extrabold text-primary mb-4 tracking-tight">Why Join H.O.W.Innovix?</h2><p className="text-on-surface-variant max-w-xl text-lg">Beyond a submission platform, we are an incubator for the next generation of medical pioneers.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
              <div><span className="material-symbols-outlined text-4xl text-primary mb-6">group_add</span><h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Elite Clinical Mentorship</h3><p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">Get direct feedback from department heads, senior researchers, and specialized surgeons who have navigated the complexities of medical innovation.</p></div>
              <div className="mt-8 flex items-center gap-2 text-primary font-bold cursor-pointer group-hover:gap-4 transition-all"><span>Learn more</span><span className="material-symbols-outlined">arrow_forward</span></div>
            </div>
            <div className="bg-primary text-on-primary p-10 rounded-[2rem] flex flex-col justify-between shadow-2xl">
              <div><span className="material-symbols-outlined text-4xl mb-6">rocket_launch</span><h3 className="text-2xl font-headline font-bold mb-4">Fast-Track Validation</h3><p className="text-primary-fixed text-opacity-80 leading-relaxed">Submit your thesis or clinical observation and get it reviewed by a panel within 14 days.</p></div>
              <div className="h-24 w-full mt-6 bg-primary-container/30 rounded-xl flex items-center justify-center overflow-hidden"><div className="w-full h-1 bg-primary-container relative"><div className="absolute inset-y-0 left-0 w-2/3 bg-secondary-fixed shadow-[0_0_15px_#7df4ff]"></div></div></div>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-[2rem]"><span className="material-symbols-outlined text-4xl text-tertiary mb-6">database</span><h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Resource Access</h3><p className="text-on-surface-variant leading-relaxed">Access proprietary clinical datasets and pilot program funding specifically reserved for student-led initiatives.</p></div>
            <div className="md:col-span-2 bg-surface-container-high p-10 rounded-[2rem] flex items-center gap-10">
              <div className="flex-1"><h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Global Network</h3><p className="text-on-surface-variant text-lg">Connect with peer innovators from over 45 international medical schools and research institutes.</p></div>
              <div className="hidden lg:flex gap-4"><div className="w-20 h-20 bg-surface-container-lowest rounded-full shadow-sm flex items-center justify-center"><span className="material-symbols-outlined text-3xl">public</span></div><div className="w-20 h-20 bg-surface-container-lowest rounded-full shadow-sm flex items-center justify-center"><span className="material-symbols-outlined text-3xl">diversity_3</span></div></div>
            </div>
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="py-24 bg-surface">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-20"><h2 className="text-4xl font-headline font-extrabold text-primary mb-4 tracking-tight">How It Works for Students</h2><div className="h-1 w-24 bg-tertiary mx-auto rounded-full"></div></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-outline-variant opacity-20 z-0"></div>
            <div className="relative z-10 text-center"><div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-8 border-4 border-surface shadow-lg"><span className="text-2xl font-headline font-black text-primary">01</span></div><h4 className="text-xl font-headline font-bold text-on-surface mb-3">Pitch Idea</h4><p className="text-on-surface-variant text-sm px-4">Define your clinical problem and proposed solution through our structured portal.</p></div>
            <div className="relative z-10 text-center"><div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-8 border-4 border-surface shadow-lg"><span className="text-2xl font-headline font-black text-on-primary">02</span></div><h4 className="text-xl font-headline font-bold text-on-surface mb-3">Review &amp; Match</h4><p className="text-on-surface-variant text-sm px-4">Our algorithm pairs your vision with the most relevant senior mentor in the field.</p></div>
            <div className="relative z-10 text-center"><div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-8 border-4 border-surface shadow-lg"><span className="text-2xl font-headline font-black text-primary">03</span></div><h4 className="text-xl font-headline font-bold text-on-surface mb-3">Refine &amp; Pilot</h4><p className="text-on-surface-variant text-sm px-4">Work 1-on-1 with your mentor to build a prototype or design a pilot study.</p></div>
            <div className="relative z-10 text-center"><div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-8 border-4 border-surface shadow-lg"><span className="text-2xl font-headline font-black text-primary">04</span></div><h4 className="text-xl font-headline font-bold text-on-surface mb-3">Implementation</h4><p className="text-on-surface-variant text-sm px-4">Present to hospital administrators and industry partners for full-scale adoption.</p></div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-primary z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-tertiary-container opacity-60 z-[1]"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-container rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-fixed rounded-full blur-[100px] opacity-20"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-on-primary mb-8 leading-tight tracking-tight">Ready to Pioneer the Future of Medicine?</h2>
              <p className="text-primary-fixed text-xl mb-12 opacity-90 leading-relaxed">Don't let your clinical observations sit in a notebook. Bring them to the stage where they can save lives.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/submit" className="bg-surface-container-lowest text-primary px-12 py-5 rounded-xl font-headline font-extrabold text-xl shadow-2xl hover:bg-white active:scale-[0.98] transition-all">Post Your Idea</Link>
                <Link to="/review" className="bg-primary-container border-2 border-primary-fixed/30 text-on-primary px-12 py-5 rounded-xl font-headline font-extrabold text-xl hover:bg-primary/50 transition-all">See Example Review</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
