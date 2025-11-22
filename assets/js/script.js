// Mobile nav toggle (main)
document.getElementById('nav-toggle')?.addEventListener('click', ()=>{
  const m = document.getElementById('mobile-menu'); if(!m) return; m.classList.toggle('hidden');
});

// Reveal on scroll (IntersectionObserver)
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('active');
      obs.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  });
});

// Lazy loading note: images use loading="lazy" attribute in templates.
// You can add further lazy-loading polyfills if targetting old browsers.
