import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialtyFilter, setSpecialtyFilter] = useState('All Specialties');
  const [impactFilter, setImpactFilter] = useState('All Impacts');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (!token) return navigate('/login');

    fetch('/api/innovations', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const mapped = data.map((d, index) => ({
          _id: d._id,
          specialty: d.category || 'Unknown',
          impact: d.outcomeImprovement > 50 ? 'High Impact' : 'Incremental',
          date: 'Last 30 Days',
          title: d.solutionDesign ? d.solutionDesign.substring(0, 30) + '...' : 'Unknown',
          description: d.problemStatement || '',
          image: (d.evidenceFiles && d.evidenceFiles.length > 0) 
            ? `${d.evidenceFiles[0]}` 
            : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9DaBqXE0B_7dRYE_RWU3CJ98kd0NBjdgXeJZnQmu64AyoiTuahMkLSCfk74AouX8gxYHDMrr6SaepwkjORFlpLwUWyYwyCzvMbFoXe_bPpFo2-cKCKgh-pFZ5U9AXk7EMny0--_PmfbKU12o3YKJs0FHV-Mnabw0sZmN0rd1YOMal9AJIS-xQhcTki0SMGAE8DpmB-MEOmfNM36Kd5i7aVI4ZJqjJah2KTSrruwg8PM52QZiH9yy5ChB4IlTGbUsj9SQSkyBDtfw',
          author: d.authorName,
          authorImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcdOaGHtnkCLuH01jevwmusX2O6dJPMFjWRg71AA8O91jqBjktObKskjLjKrfQxGOfWewKUMrc2_6ajW9BEzan1-En4kccXtTRtWuQZAWBGz9da0g-Y5SO-dNbt8PR4uxkex7HK44jVDPvFzmdOptwkl8iiagxD37rx0dasDYo4CRRd81mt4BiUvuLBrPmfKNRfqNzAL_UmXOJ-OJj1V247xQxzS6Offsa5EN3vheXniWCEjmtgXhx78p4tkzAeNiLQZ-JW8jpOnQ',
          role: `${d.city || ''} ${d.university ? ' - ' + d.university : ''}`,
          timeAgo: 'Just now',
          tag: d.status || 'Validation',
          tags: [d.category],
          rating: (d.outcomeImprovement / 20).toFixed(1) || '4.0',
          colSpanClass: index === 0 ? 'md:col-span-8' : 'md:col-span-4',
          isLarge: index === 0
        }));
        setInnovations(mapped);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
      showToast('Failed to load innovations from server', 'error');
    });
  }, [navigate]);

  const filteredData = innovations.filter(item => {
    const sMatch = specialtyFilter === 'All Specialties' || item.specialty === specialtyFilter;
    const iMatch = impactFilter === 'All Impacts' || item.impact === impactFilter;
    const dMatch = dateFilter === 'All Time' || item.date === dateFilter;
    return sMatch && iMatch && dMatch;
  });

  return (
    <section className="pt-20">
      <main className="pb-12 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-label text-sm font-semibold text-tertiary uppercase tracking-widest mb-2 block">Innovation Portal</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tighter leading-none mb-4">Discovery Feed</h1>
            <p className="text-on-surface-variant font-body text-lg max-w-md">Browse breakthrough healthcare concepts submitted by the next generation of medical pioneers.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => showToast('Refine options coming soon')} className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface font-headline font-bold rounded-xl active:scale-95 transition-all"><span className="material-symbols-outlined">filter_list</span>Refine</button>
            <div className="flex p-1 bg-surface-container-low rounded-full">
              <button onClick={() => showToast('Filter applied: New', 'success')} className="px-6 py-2 bg-surface-container-lowest shadow-sm rounded-full font-headline font-bold text-primary text-sm">New</button>
              <button onClick={() => showToast('Filter applied: Top Rated', 'success')} className="px-6 py-2 text-on-surface-variant font-headline font-medium text-sm hover:text-primary">Top Rated</button>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 bg-surface-container-low rounded-2xl">
            <div className="flex flex-col p-3 px-5">
              <label className="font-label text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Medical Specialty</label>
              <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="bg-transparent border-none p-0 font-headline font-bold text-primary focus:ring-0 cursor-pointer">
                <option value="All Specialties">All Specialties</option>
                <option value="Digital Health">Digital Health</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Tele-Health">Tele-Health</option>
                <option value="Surgical AI">Surgical AI</option>
                <option value="Biotech">Biotech</option>
                <option value="Patient Care">Patient Care</option>
              </select>
            </div>
            <div className="flex flex-col p-3 px-5 border-l border-outline-variant/20">
              <label className="font-label text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Impact Level</label>
              <select value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} className="bg-transparent border-none p-0 font-headline font-bold text-primary focus:ring-0 cursor-pointer">
                <option value="All Impacts">All Impacts</option>
                <option value="High Impact">High Impact</option>
                <option value="Incremental">Incremental</option>
                <option value="Global Scale">Global Scale</option>
              </select>
            </div>
            <div className="flex flex-col p-3 px-5 border-l border-outline-variant/20">
              <label className="font-label text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Submission Date</label>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="bg-transparent border-none p-0 font-headline font-bold text-primary focus:ring-0 cursor-pointer">
                <option value="All Time">All Time</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Quarter">This Quarter</option>
              </select>
            </div>
            <div className="flex items-center justify-end pr-4">
              <button onClick={() => setSearchTriggered(!searchTriggered)} className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant">Loading submissions...</div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
            <h3 className="text-xl font-bold font-headline mb-3 text-primary">No innovations found</h3>
            <p>Try submitting a new innovation or adjust your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredData.map(item => {
              if (item.isLarge) {
                return (
                  <article key={item._id} className={`${item.colSpanClass} group relative overflow-hidden bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10`}>
                    <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-[2rem] overflow-hidden shrink-0">
                      <img alt="Innovation" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image}/>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-tighter rounded-full pill-blur">{item.tag}</span>
                        <span className="text-outline text-xs font-label">{item.timeAgo}</span>
                      </div>
                      <h2 className="font-headline text-3xl font-extrabold text-primary mb-3 leading-tight">{item.title}</h2>
                      <p className="font-body text-on-surface-variant mb-6 line-clamp-3">{item.description}</p>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-slate-200 shadow-sm overflow-hidden">
                          {item.authorImg && <img src={item.authorImg} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="text-sm font-headline font-bold text-on-surface">{item.author}</p>
                          <p className="text-xs text-outline font-label">{item.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link to={`/review?id=${item._id}`} className="px-6 py-2.5 bg-primary text-white font-headline font-bold rounded-xl text-sm active:scale-95 transition-all text-center">Quick Preview</Link>
                        <button onClick={() => showToast('Saved to bookmarks', 'success')} className="p-2.5 bg-surface-container-high text-primary rounded-xl hover:bg-surface-variant transition-all"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>bookmark</span></button>
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <article key={item._id} className={`${item.colSpanClass} bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all border border-outline-variant/10 flex flex-col`}>
                  {item.image && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-surface-container">
                      <img alt="MedTech" className="w-full h-full object-cover" src={item.image}/>
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="text-secondary font-label text-[10px] font-black uppercase tracking-widest mb-2 block">{item.specialty}</span>
                    <h3 className="font-headline text-xl font-bold text-primary mb-2 line-clamp-1">{item.title}</h3>
                    <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-sm">stars</span>
                      <span className="text-xs font-headline font-bold text-on-surface">{item.rating} Impact</span>
                    </div>
                    <Link to={`/review?id=${item._id}`} className="text-primary font-headline font-bold text-sm hover:underline">View</Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Link to="/gallery" className="px-10 py-4 bg-surface-container-high text-primary font-headline font-bold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 inline-block">Explore More Innovations</Link>
        </div>
      </main>
    </section>
  );
}
