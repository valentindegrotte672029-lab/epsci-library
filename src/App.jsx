import { useState } from 'react';
import './index.css';

const FOLDERS = [
  {
    id: 'presidence',
    title: '1. Presidency',
    image: null,
    pdfPage: 2,
    content: `[REDACTED] OPERATION "RELEASE ALL THE FILES".
SUBJECT HAS MOBILIZED A LARGE CROWD FOR INTRO TROMBI.
TENSIONS EXTREMELY HIGH. VISUAL [REDACTED] CONFIRM PANCARTE DEPLOYED AT SCENE.`,
  },
  {
    id: 'secret',
    title: '2. Secretary',
    image: null,
    pdfPage: 3,
    content: `THE "LITTLE BLACK OUT" HAS BEEN RECOVERED.
REGISTRY OF ALL NAMES, NUMBERS, ETC.
EXTENSIVE REDACTIONS APPLIED TO PROTECT THE INNOCENT (AND GUILTY).
[REDACTED] [REDACTED] 555-0199 [REDACTED]
[REDACTED] - PARIS RESIDENCE [REDACTED]`,
  },
  {
    id: 'treso',
    title: '3. Treasury',
    image: null,
    pdfPage: 4,
    content: `INVESTIGATION INTO FINANCIAL DISCREPANCIES.
FUNDS MISSING: € [REDACTED],000,000.
ACCOUNTS ROUTED THROUGH:
– MARIE-PAULE OFFSHORE ADVISORY
BALANCE SHEET: WRONG.
[REDACTED] IS AWARE, WE’RE DONE.`,
  },
  {
    id: 'ambass',
    title: '4. Partnership',
    image: null,
    pdfPage: 5,
    content: `AGREEMENT REACHED FOR [REDACTED] $.
EXCHANGE CONSIDER [REDACTED] ACCEPTABLE.
[REDACTED] GOODIES LANDING ON THE ISLAND.
BABY OIL PURCHASE IN [REDACTED] DAYS.`,
  },
  {
    id: 'comm',
    title: '5. Communications',
    image: null,
    pdfPage: 6,
    content: `TEASER [REDACTED] AT 67%.
MESSAGE SENT [REDACTED].
MEANING INTERPRETED [REDACTED].
[REDACTED] : + 33 7[REDACTED] 23 [REDACTED]8 23 SUSPECT.`,
  },
  {
    id: 'event',
    title: '6. Events',
    image: null,
    pdfPage: 7,
    content: `EVENT : EPSTEIN X P-DIDDY
WHITE PARTY & DIDDY PLANNED
ONLY WHITE CLOTHES AUTHORIZED
XAVIER DUPONT DE LIGONNÈS SPAWNING`,
  },
  {
    id: 'anim',
    title: '7. Animation',
    image: '/images/island.jpg',
    pdfPage: 8,
    content: `ANIM : EPSTEIN ISLAND ?
MASSAGE METHOD OPERATIONAL 
CHAMPAIGNE BOTTLES : [REDACTED]
SIGNAL : TOC TOC TOC`,
  },
  {
    id: 'logi',
    title: '8. Logistics',
    image: null,
    pdfPage: 9,
    content: `ITEMS MOVED [REDACTED] FROM CERGY.
LOCATION UPDATED [REDACTED] - 48.237651, -122.894317 WEST.
LICENSE AND REGISTRATION : STOLEN.`,
  },
  {
    id: 'travel',
    title: '9. Travel',
    image: '/images/flight.jpg',
    pdfPage: 10,
    content: `FLIGHT LOGS FOR "LOLITA EXPRESS" ACQUIRED.
CELEBRITY BILL CLINTON ONBOARD.
LEAVING IN [REDACTED] L.A.
LOLITA EXPRESS DESTINATION APPROVED.`,
  },
  {
    id: 'is',
    title: '10. IS',
    image: null,
    pdfPage: 11,
    content: `[REDACTED] INTERNATIONAL STUDENT [REDACTED]
ALL OVER THE WORLD.
SYSTEMS MONITORING GLOBAL PRESENCE.
[REDACTED] BACKDOOR ACCESS GRANTED.`,
  },
  {
    id: 'summary',
    title: '11. Summary',
    image: null,
    pdfPage: null,
    content: `FINAL DOSSIER COMPILED.
ALL PREVIOUS FILES HAVE BEEN CONSOLIDATED INTO THE MASTER SUMMARY REPORT.
PROCEED TO REVIEW THE FULL DECLASSIFIED DOCUMENT.
[REDACTED] IS WATCHING.`,
  },
];

const parseRedacted = (text) => {
  return text.split('([REDACTED])').map((part) => {
    if (text.includes('[REDACTED]') && part.length === 0) return null;

    const regex = /(\[REDACTED\])/g;
    const segments = text.split(regex);

    return segments.map((seg, i) => {
      if (seg === '[REDACTED]') {
        return <span key={i} className="redacted" title="Classified Information">██████</span>;
      }
      return <span key={i}>{seg}</span>;
    });
  })[0];
};

function App() {
  const [viewedFolders, setViewedFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRiddle, setShowRiddle] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleSolved, setRiddleSolved] = useState(false);

  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
    if (!viewedFolders.includes(folder.id)) {
      const newViewed = [...viewedFolders, folder.id];
      setViewedFolders(newViewed);

      if (newViewed.length === FOLDERS.length) {
        setTimeout(() => {
          setShowRiddle(true);
        }, 1500);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredFolders = FOLDERS.filter(f =>
    normalizeString(f.title).includes(normalizeString(searchTerm))
  );

  const handleRiddleSubmit = (e) => {
    e.preventDefault();
    if (riddleAnswer.toLowerCase().trim() === 'cergy' || riddleAnswer.toLowerCase().trim() === 'epstein') {
      setRiddleSolved(true);
      // Create a temporary link to download the PDF
      const link = document.createElement('a');
      link.href = '/chapter4.pdf'; // Reference the file in public/
      link.download = 'classified_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Code Incorrect. L'accès est refusé.");
    }
  };

  return (
    <>
      <div className="gov-banner">
        <span>🇺🇸 An official website of the United States government</span>
        <a href="#">Here's how you know ⌄</a>
      </div>

      <header className="header">
        <div className="header-left">
          <img src="/images/logo.png" alt="Department Logo" className="header-logo" onError={(e) => { e.target.style.display = 'none' }} />
          <div className="header-title-container">
            <span className="header-agency">U.S. Department of Justice</span>
            <span className="header-title">EPSCI Department of CERGY</span>
          </div>
        </div>
      </header>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button" aria-label="Search">
            <svg className="search-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="page-title-section">
        <h1 className="page-title">Epsci Files</h1>
        <div className="page-divider"></div>
      </div>

      <main className="content-wrapper">
        <div className="folders-grid">
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              className="folder-card"
              onClick={() => handleFolderClick(folder)}
            >
              <div className="folder-icon">
                {viewedFolders.includes(folder.id) ? '📂' : '📁'}
              </div>
              <div className="folder-info">
                <h3 className="folder-name">{folder.title}</h3>
                <div className={"folder-status " + (viewedFolders.includes(folder.id) ? 'viewed' : '')}>
                  {viewedFolders.includes(folder.id) ? 'Status: Reviewed' : 'Status: Classified'}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredFolders.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#6b7280' }}>
            No records found matching your query.
          </div>
        )}
      </main>

      <footer className="footer">
        © 2026 EPSCI Department of CERGY. All rights reserved. Do not distribute classified materials.
      </footer>

      {activeFolder && (
        <div className="modal-overlay" onClick={() => setActiveFolder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">DOC REF: EPSCI-{activeFolder.id.toUpperCase()}-001</span>
              <button className="close-btn" onClick={() => setActiveFolder(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="document-header">
                <div className="classification">TOP SECRET / NOFORN</div>
                <div>DECLASSIFIED BY AUTHORIZED PERSONNEL ONLY</div>
              </div>

              <div style={{ whiteSpace: 'pre-line' }}>
                {parseRedacted(activeFolder.content)}
              </div>

              {activeFolder.image && (
                <div className="doc-image-container">
                  <img src={activeFolder.image} alt="Evidence" className="doc-image" onError={(e) => {
                    e.target.parentNode.style.display = 'none';
                  }} />
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', fontFamily: 'sans-serif' }}>
                    EXHIBIT A: PHOTOGRAPHIC EVIDENCE
                  </p>
                </div>
              )}

              <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <a
                  href={`/chapter4.pdf${activeFolder.pdfPage ? `#page=${activeFolder.pdfPage}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--doj-blue)',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    border: '1px solid #111'
                  }}
                >
                  {activeFolder.pdfPage
                    ? `[ EXAMINE ORIGINAL DOCUMENT - PAGE ${activeFolder.pdfPage} ]`
                    : '[ EXAMINE FULL MASTER DOCUMENT ]'}
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {showRiddle && !riddleSolved && (
        <div className="riddle-overlay">
          <div className="riddle-container">
            <h2 className="riddle-title">A FINAL ENIGMA</h2>
            <p className="riddle-text">
              The truth is obscured, but the pieces remain.<br />
              (The final riddle will be provided later. Enter "cergy" to proceed.)
            </p>
            <form onSubmit={handleRiddleSubmit}>
              <input
                type="text"
                className="riddle-input"
                placeholder="ENTER DECRYPTION KEY"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                autoFocus
              />
              <br />
              <button type="submit" className="riddle-submit">
                DECRYPT TRANSMISSION
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
