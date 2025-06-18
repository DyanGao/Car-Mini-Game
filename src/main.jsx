import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Scene from './Scene';
import { GameProvider } from './context/GameContext';
import { PHYSICS_CONSTANTS } from './constants/physics';
import { GAME_CONSTANTS } from './constants/game';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <Canvas>
      <Physics broadphase='SAP' gravity={PHYSICS_CONSTANTS.GRAVITY}>
        <Scene />
      </Physics>  
    </Canvas>

    <div className="controls">
      <p>{GAME_CONSTANTS.CONTROLS_TEXT.MOVE}</p>
      <p>{GAME_CONSTANTS.CONTROLS_TEXT.CAMERA}</p>
      <p>{GAME_CONSTANTS.CONTROLS_TEXT.RESET}</p>
      <p>{GAME_CONSTANTS.CONTROLS_TEXT.FLIPS}</p>
    </div>
  </GameProvider>
)
