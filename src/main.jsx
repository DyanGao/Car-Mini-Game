import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import Scene from './Scene';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>   
    <Canvas >
      <Physics broadphase='SAP' gravity={[0, -2.6, 0]} >
        <Scene />
      </Physics>  
    </Canvas>

    <div className="controls">
      <p>Press w a s d to MOVE</p>
      <p>Press k to SWAP camera</p>
      <p>Press r to RESET</p>
      <p>Press arrows for flips</p>
    </div>
  </>
)
