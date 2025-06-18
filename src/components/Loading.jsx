import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ onLoadingComplete, fadeOut, sceneReady }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    const loadingSteps = [
      { text: 'Starting engine...', duration: 800 },
      { text: 'Loading 3D models...', duration: 1200 },
      { text: 'Initializing physics...', duration: 600 },
      { text: 'Preparing track...', duration: 500 },
      { text: 'Waiting for scene...', duration: 400 },
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const updateLoading = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const stepProgress = 100 / loadingSteps.length;
        const targetProgress = (currentStep + 1) * stepProgress;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
              setTimeout(updateLoading, 100);
            } else {
              // Loading steps complete, now wait for scene to be ready
              setLoadingText('Ready to race!');
              setProgress(100);
              setTimeout(() => {
                onLoadingComplete();
              }, 500);
            }
          }
        }, 20);
        
      }
    };

    const timer = setTimeout(updateLoading, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  // Update loading text when scene is ready
  useEffect(() => {
    if (sceneReady && progress === 100) {
      setLoadingText('Ready to race!');
    }
  }, [sceneReady, progress]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="car-logo">
          🏎️
        </div>
        <h1 className="game-title">Car Mini-Game</h1>
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div 
              className="loading-progress" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-percentage">{Math.round(progress)}%</div>
        </div>
        <p className="loading-text">{loadingText}</p>
        <div className="loading-tips">
          <p>💡 Tip: Use WASD to drive, K to toggle camera</p>
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  onLoadingComplete: PropTypes.func.isRequired,
  fadeOut: PropTypes.bool,
  sceneReady: PropTypes.bool,
};

export default Loading; 