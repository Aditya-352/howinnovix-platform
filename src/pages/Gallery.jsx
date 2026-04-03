import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config/api';

export default function Gallery() {
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/innovations`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const mapped = data.map((d, index) => ({
          id: d._id,
          category: d.category || 'Unknown',
          date: new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          title: d.solutionDesign ? d.solutionDesign.substring(0, 40) + '...' : 'Innovation',
          description: d.problemStatement || '',
          theme: index % 4 === 0 ? 'biotech' : (index % 3 === 0 ? 'primary-fixed' : (index % 2 === 0 ? 'secondary' : 'tertiary'))
        }));
        setInnovations(mapped);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredData = innovations.filter(item => {
    const cMatch = categoryFilter === 'All Categories' || item.category === categoryFilter;
    const sMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return cMatch && sMatch;
  });

  return (
    <section className="pt-20">
      <div className="px-8 pt-8 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-tertiary font-label font-semibold tracking-wider text-sm mb-4 block">CLINICAL ATELIER</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tighter leading-none">Innovation Discovery Gallery</h1>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">Exploring the frontier of medical student research and collaborative healthcare solutions.</p>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-secondary/30 transition-all font-body text-sm" 
              placeholder="Search innovations..." 
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full text-on-surface text-sm font-semibold">
            <span className="material-symbols-outlined text-sm">filter_list</span>Filters
          </div>
          <div className="relative">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="appearance-none bg-surface-container-low border-none rounded-full px-6 py-2 pr-10 text-sm font-medium text-on-surface-variant cursor-pointer hover:bg-surface-container-highest transition-colors focus:ring-0">
              <option value="All Categories">All Categories</option>
              <option value="Digital Health">Digital Health</option>
              <option value="Diagnostics">Diagnostics</option>
              <option value="Tele-Health">Tele-Health</option>
              <option value="Surgical AI">Surgical AI</option>
              <option value="Biotech">Biotech</option>
              <option value="Patient Care">Patient Care</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-sm">expand_more</span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-surface-container-low border-none rounded-full px-6 py-2 pr-10 text-sm font-medium text-on-surface-variant cursor-pointer hover:bg-surface-container-highest transition-colors focus:ring-0">
              <option>All Status</option>
              <option>In Review</option>
              <option>Published</option>
              <option>Collaborating</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-sm">expand_more</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant">Loading gallery...</div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
             <h3 className="text-xl font-bold font-headline title-primary mb-2">No public innovations found</h3>
             <p className="font-body text-sm">Try tweaking your search filters or be the first to submit!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {filteredData.map(item => {
              if (item.theme === 'biotech') {
                return (
                  <article key={item.id} className="gallery-card group bg-primary rounded-[2rem] p-8 flex flex-col justify-between h-[420px] shadow-lg border border-primary-container">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white font-label text-xs font-bold uppercase tracking-widest backdrop-blur-md">{item.category}</span>
                        <span className="text-primary-fixed/60 text-xs font-label">{item.date}</span>
                      </div>
                      <h3 className="font-headline text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                      <p className="text-primary-fixed font-body text-sm leading-relaxed mb-6 line-clamp-4 opacity-90">{item.description}</p>
                    </div>
                    <div className="mt-auto">
                      <Link to={`/review?id=${item.id}&source=gallery`} className="w-full py-4 bg-white text-primary rounded-2xl font-bold tracking-tight hover:bg-primary-fixed transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-md">Explore Project<span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                    </div>
                  </article>
                );
              }

              let badgeClass = "bg-tertiary-container/10 text-tertiary";
              if (item.theme === 'secondary') badgeClass = "bg-secondary-container/20 text-on-secondary-container";
              if (item.theme === 'primary-fixed') badgeClass = "bg-primary-fixed text-on-primary-fixed-variant";

              const btnClass = item.theme === 'tertiary' 
                ? "bg-primary text-on-primary hover:bg-primary-container shadow-md"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest";

              return (
                <article key={item.id} className="gallery-card group bg-surface-container-lowest rounded-[2rem] p-8 flex flex-col justify-between h-[420px] shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`pill-blur px-3 py-1 rounded-full font-label text-xs font-bold uppercase tracking-widest ${badgeClass}`}>{item.category}</span>
                      <span className="text-outline text-xs font-label">{item.date}</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-4 leading-tight line-clamp-2">{item.title}</h3>
                    <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 line-clamp-4">{item.description}</p>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/review?id=${item.id}&source=gallery`} className={`w-full py-4 rounded-2xl font-bold tracking-tight transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${btnClass}`}>View Details<span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
