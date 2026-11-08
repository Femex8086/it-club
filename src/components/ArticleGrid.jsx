import { useState } from 'react';

export default function ArticleGrid({ articles }) {
  const [opened, setOpened] = useState('');
  return <section className="articles section-shell" id="articles">
    <div className="section-heading"><span className="mono-label">04 / FROM THE CLUB</span><span className="section-index">Articles</span></div>
    <h2 className="articles-title">Notes from <em>the work.</em></h2>
    <div className="article-grid">{articles.map((article, index) => {
      const isOpen = opened === article.title;
      const detailId = 'article-detail-' + index;
      const srcSet = [480, 800, 1400]
        .map((width) => article.image.replace(/w=\d+/, 'w=' + width) + ' ' + width + 'w')
        .join(', ');
      return <article className={'article-card ' + (index === 0 ? 'article-featured' : '')} key={article.title}>
        <div className="article-image"><img src={article.image} srcSet={srcSet} sizes={index === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 650px) 100vw, (max-width: 900px) 50vw, 40vw'} alt={article.alt} width="1400" height="900" loading="lazy" decoding="async" /></div>
        <div className="article-copy">
          <div className="article-meta mono-label"><span>{article.date}</span><span>FIELD NOTES / {String(index + 1).padStart(2, '0')}</span></div>
          <h3>{article.title}</h3>
          <p className="article-summary">{article.summary}</p>
          <button className="article-toggle" aria-expanded={isOpen} aria-controls={detailId} onClick={() => setOpened(isOpen ? '' : article.title)}>{isOpen ? 'Close article' : 'Read article'}</button>
          <div className="article-detail" id={detailId} hidden={!isOpen}><p>{article.body}</p></div>
        </div>
      </article>;
    })}</div>
  </section>;
}
