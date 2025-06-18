import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useState, useEffect } from 'react';
import Scene from './Scene';
import Loading from './components/Loading';
import { GameProvider } from './context/GameContext';
import { PHYSICS_CONSTANTS } from './constants/physics';
import { GAME_CONSTANTS } from './constants/game';
import './index.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoadingComplete = () => {
    // Don't hide loading immediately, wait for scene to be ready
    if (sceneReady) {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 800); // Longer fade out duration
    }
  };

  const handleSceneReady = () => {
    setSceneReady(true);
  };

  // Check if both loading is complete and scene is ready
  useEffect(() => {
    if (sceneReady && !isLoading) {
      // Scene is ready and loading should be hidden
    }
  }, [sceneReady, isLoading]);

  // Fallback: Force loading to complete after maximum time
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log('Fallback: Force completing loading');
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 800);
      }
    }, 8000); // 8 seconds maximum loading time

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  return (
    <GameProvider>
      {/* Always render the game, but keep it hidden during loading */}
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 0.5s ease-in-out',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'linear-gradient(135deg, #d4b896 0%, #e6d3b7 30%, #f0e4c1 50%, #e6d3b7 70%, #d4b896 100%)'
      }}>
        <Canvas 
          style={{ width: '100%', height: '100%' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Physics broadphase='SAP' gravity={PHYSICS_CONSTANTS.GRAVITY}>
            <Scene onSceneReady={handleSceneReady} />
          </Physics>  
        </Canvas>

        <div className="controls">
          <p>{GAME_CONSTANTS.CONTROLS_TEXT.MOVE}</p>
          <p>{GAME_CONSTANTS.CONTROLS_TEXT.CAMERA}</p>
          <p>{GAME_CONSTANTS.CONTROLS_TEXT.RESET}</p>
          <p>{GAME_CONSTANTS.CONTROLS_TEXT.FLIPS}</p>
        </div>
      </div>

      {/* Loading screen overlay */}
      {isLoading && (
        <Loading 
          onLoadingComplete={handleLoadingComplete} 
          fadeOut={fadeOut}
          sceneReady={sceneReady}
        />
      )}
    </GameProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
