import React, { useEffect } from 'react';

const GuardifyLogo = () => {
  useEffect(() => {
    // Inject animations once
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spinReverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.wrapper}>
        {/* Glowing shadow layer */}
        <div style={styles.glowLayer}></div>

        {/* Outermost rotating circle (anti-clockwise) */}
        <div style={styles.outermostWrapper}>
          <div style={styles.outermostCircle}></div>
        </div>

        {/* Middle rotating circle (clockwise) */}
        <div style={styles.middleWrapper}>
          <div style={styles.middleCircle}></div>
        </div>

        {/* Static inner circle with G letter */}
        <div style={styles.innerCircle}>
          <span style={styles.gLetter}>G</span>
        </div>
      </div>

      {/* Loading text below the circles */}
      <div style={styles.loadingText}>Loading Guardify...</div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'black',
    flexDirection: 'column',
  },

  wrapper: {
    position: 'relative',
    width: '240px',
    height: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  glowLayer: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(rgba(0, 255, 255, 0.2), transparent)',
    filter: 'blur(40px)',
    zIndex: 0,
  },

  outermostWrapper: {
    position: 'absolute',
    width: '240px',
    height: '240px',
    animation: 'spinReverse 12s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  outermostCircle: {
    width: '240px',
    height: '240px',
    borderRadius: '50%',
    backgroundImage: 'url("/images/download (11).jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
  },

  middleWrapper: {
    position: 'absolute',
    width: '160px',
    height: '160px',
    animation: 'spin 8s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  middleCircle: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundImage: 'url("/images/download (12).jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
  },

  innerCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundImage: 'url("/images/Matiya dev.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '3px solid #00FFF7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.9)',
  },

  gLetter: {
    color: '#00FFF7',
    fontSize: '2rem',
    fontWeight: '900',
    fontFamily: "'Orbitron', sans-serif",
    textShadow: '0 0 5px #00FFF7, 0 0 10px #00FFF7',
  },

  loadingText: {
    marginTop: '25px',
    fontSize: '18px',
    color: '#00FFF7',
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '1.5px',
    textShadow: '0 0 8px rgba(0, 255, 255, 0.6)',
  },
};

export default GuardifyLogo;
