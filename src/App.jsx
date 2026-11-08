import { useEffect, useRef, useState } from 'react';
import { site, featuredProject, works, events, articles } from './data/content.js';
import ProjectRail from './components/ProjectRail.jsx';
import EventTimeline from './components/EventTimeline.jsx';
import ArticleGrid from './components/ArticleGrid.jsx';
import SceneGate from './components/SceneGate.jsx';
import { usePortfolioMotion } from './hooks/usePortfolioMotion.js';

const year = new Date().getFullYear();

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="MMC IT Club, back to top"><img src="/images/logo.jpeg" alt="Mary Matha College emblem" /><span><b>MMC</b><small>IT CLUB</small></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="main-nav" className={open ? 'nav-open' : ''} aria-label="Main navigation">
      {[['About', '#about'], ['Projects', '#projects'], ['Programs', '#programs'], ['Articles', '#articles'], ['Team', '#team']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-join" href="#join" onClick={() => setOpen(false)}>Join the club</a>
    </nav>
  </header>;
}

function Hero() {
  const [note, setNote] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setNote((n) => (n + 1) % site.buildNotes.length), 5200); return () => clearInterval(id); }, []);
  return <section className="hero section-shell" id="top" aria-labelledby="hero-title">
    <SceneGate />
    <div className="hero-topline"><span className="eyebrow">MARY MATHA ARTS &amp; SCIENCE COLLEGE / MANANTHAVADY</span><span className="hero-year">EST. ON CAMPUS · {year}</span></div>
    <div className="hero-content">
      <p className="hero-kicker"><span className="live-dot" aria-hidden="true" /> STUDENTS MAKING THINGS THAT MATTER</p>
      <h1 className="hero-title" id="hero-title"><span className="line-mask"><span>Mary Matha</span></span><span className="line-mask accent-line"><span>IT Club</span></span></h1>
      <div className="hero-bottom"><p className="hero-mission">We turn curiosity into useful tools, thoughtful experiences, and a more connected campus.</p><div className="now-building" aria-live="polite"><span className="mono-label">ON OUR WORKBENCH</span><strong key={note}>{site.buildNotes[note]}</strong></div></div>
    </div>
    <a className="scroll-cue" href="#about"><span className="scroll-line" aria-hidden="true" /> SCROLL TO EXPLORE</a>
  </section>;
}

function About() {
  const stats = [['04', 'PROJECTS ON DISPLAY'], ['04', 'PROGRAMS ARCHIVED'], ['01', 'CAMPUS WE CALL HOME'], [String(year), 'STILL BUILDING']];
  return <section className="about section-shell" id="about">
    <div className="section-heading"><span className="mono-label">01 / THE CLUB</span><span className="section-index">A place to learn by doing</span></div>
    <div className="manifesto-wrap"><p className="manifesto">We make technology <span className="fill-word">useful</span> in everyday campus life. We learn by making, share what works, and bring more students into the process.</p></div>
    <div className="stats-grid">{stats.map(([number, label]) => <div className="stat" key={label}><span className="stat-number">{number}</span><span className="mono-label">{label}</span></div>)}</div>
  </section>;
}

function Team() {
  return <section className="team section-shell" id="team">
    <div className="section-heading"><span className="mono-label">05 / PEOPLE</span><span className="section-index">Made at Mary Matha</span></div>
    <div className="team-intro"><h2>Students build<br />this together.</h2><a className="team-join-link" href="#join">Build with the club</a></div>
  </section>;
}

function Join() {
  const [status, setStatus] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent('IT Club interest — ' + form.get('name'));
    const body = encodeURIComponent('Name: ' + form.get('name') + '\nDepartment: ' + form.get('department') + '\nYear: ' + form.get('year') + '\nI want to learn: ' + form.get('learning'));
    setStatus('Your email app will open with your details ready to send.');
    window.location.href = 'mailto:' + site.email + '?subject=' + subject + '&body=' + body;
  }
  return <section className="join section-shell" id="join">
    <div className="section-heading"><span className="mono-label">06 / COME BUILD</span><span className="section-index">Join the IT Club</span></div>
    <div className="join-layout"><div className="join-copy"><h2>Make your<br /><em>next thing</em><br />with us.</h2><p>Bring an idea, a question, or a skill you want to grow. We’ll find a place to start.</p><div className="contact-links"><a href={'mailto:' + site.email}>{site.email}</a><a href={site.collegeUrl} target="_blank" rel="noreferrer">College website</a></div></div>
      <form className="join-form" onSubmit={handleSubmit}><label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><div className="form-pair"><label>Department<input name="department" required placeholder="Your department" /></label><label>Year<select name="year" required defaultValue=""><option value="" disabled>Select</option><option>First year</option><option>Second year</option><option>Third year</option></select></label></div><label>What would you like to learn?<textarea name="learning" rows="3" required placeholder="Design, code, electronics, something else…" /></label><button className="submit-button" type="submit">Send your interest</button><p className="form-note">Your email app will prepare a message. Nothing is stored on this website.</p><p className="form-status" aria-live="polite">{status}</p></form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer section-shell"><div className="footer-top"><span className="mono-label">MARY MATHA ARTS &amp; SCIENCE COLLEGE · MANANTHAVADY</span><a href="#top">BACK TO TOP</a></div><div className="footer-wordmark" aria-label="MMC IT Club"><span>MMC</span><span>IT CLUB</span></div><div className="footer-bottom"><p>Student-built, campus-minded.</p><a href={'mailto:' + site.email}>{site.email}</a><a href={site.collegeUrl} target="_blank" rel="noreferrer">MARYMATHACOLLEGE.AC.IN</a>{site.socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}<span>© {year} MMC IT CLUB</span></div></footer>;
}

export default function App() {
  const root = useRef(null);
  usePortfolioMotion(root);
  return <div ref={root} className="app-shell"><Header /><main><Hero /><About /><ProjectRail featured={featuredProject} works={works} /><EventTimeline events={events} /><ArticleGrid articles={articles} /><Team /><Join /></main><Footer /></div>;
}
