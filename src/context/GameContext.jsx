import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CAMERA_CONSTANTS } from '../constants/physics';

const GameContext = createContext();

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(CAMERA_CONSTANTS.DEFAULT_POSITION);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'paused', 'menu'
  const [debugMode, setDebugMode] = useState(false);

  const toggleCamera = useCallback(() => {
    if (thirdPerson) {
      // Add small random offset to trigger camera update
      setCameraPosition([
        CAMERA_CONSTANTS.DEFAULT_POSITION[0],
        CAMERA_CONSTANTS.DEFAULT_POSITION[1],
        CAMERA_CONSTANTS.DEFAULT_POSITION[2] + Math.random() * 0.01
      ]);
    }
    setThirdPerson(!thirdPerson);
  }, [thirdPerson]);

  const toggleDebugMode = useCallback(() => {
    setDebugMode(!debugMode);
  }, [debugMode]);

  const resetGame = useCallback(() => {
    // This will be called by car reset logic
    console.log('Game reset triggered');
  }, []);

  const value = {
    // Camera state
    thirdPerson,
    cameraPosition,
    setCameraPosition,
    toggleCamera,
    
    // Game state
    gameState,
    setGameState,
    resetGame,
    
    // Debug state
    debugMode,
    toggleDebugMode,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 