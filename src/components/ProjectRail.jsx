export default function ProjectRail({ featured, works }) {
  return <section className="projects section-shell" id="projects">
    <div className="projects-head">
      <div className="section-heading"><span className="mono-label">02 / SELECTED WORK</span><span className="section-index">MMC IT CLUB</span></div>
      <h2>Work in<br /><span>focus.</span></h2>
    </div>

    <article className="featured-work">
      <div className="featured-visual">
        <img src={featured.image} alt={featured.alt} width="1400" height="1000" loading="lazy" decoding="async" />
        <span className="featured-index mono-label">01 / FEATURED PROJECT</span>
      </div>
      <div className="featured-copy">
        <span className="mono-label">EXAM OPERATIONS / WEB APP</span>
        <h3>{featured.title}</h3>
        <p>{featured.summary}</p>
        <div className="tag-list">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>

    <div className="work-archive-heading"><span className="mono-label">PROJECT ARCHIVE</span><span className="mono-label">09 WORKS</span></div>
    <div className="work-grid">{works.map((work) => <article className="work-card" key={work.id}>
      <a className="work-image" href={work.image} target="_blank" rel="noreferrer" aria-label={'View full image for ' + work.title}>
        <img src={work.image} alt={work.alt} width="1600" height="1100" loading="lazy" decoding="async" />
        <span className="work-image-label mono-label">VIEW IMAGE</span>
      </a>
      <div className="work-card-caption"><span className="work-number mono-label">{work.number}</span><h3>{work.title}</h3></div>
    </article>)}</div>
  </section>;
}
