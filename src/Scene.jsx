/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect } from "react";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Track from './Track'
import Ground from "./Ground";
import Car from "./Car";
import { useGameContext } from './context/GameContext';
import { GAME_CONSTANTS } from './constants/game';
import { CAMERA_CONSTANTS } from './constants/physics';

const Scene = () => {
  const { thirdPerson, cameraPosition, toggleCamera } = useGameContext();

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === GAME_CONSTANTS.CONTROLS.CAMERA_TOGGLE) {
        toggleCamera();
      }
    }

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [toggleCamera])

  return (
    <Suspense fallback={false}>
      
      <Environment 
        preset={GAME_CONSTANTS.ENVIRONMENT.PRESET}
        background 
        near={GAME_CONSTANTS.ENVIRONMENT.NEAR}
        far={GAME_CONSTANTS.ENVIRONMENT.FAR}
        resolution={GAME_CONSTANTS.ENVIRONMENT.RESOLUTION}
        blur={GAME_CONSTANTS.ENVIRONMENT.BLUR}
        ground={{
          height: GAME_CONSTANTS.ENVIRONMENT.GROUND.HEIGHT,
          radius: GAME_CONSTANTS.ENVIRONMENT.GROUND.RADIUS,
          scale: GAME_CONSTANTS.ENVIRONMENT.GROUND.SCALE
        }}
      />
    
      <PerspectiveCamera makeDefault position={cameraPosition} fov={CAMERA_CONSTANTS.FOV} />
      {!thirdPerson && (
        <OrbitControls 
          target={CAMERA_CONSTANTS.ORBIT_TARGET}
          minPolarAngle={CAMERA_CONSTANTS.MIN_POLAR_ANGLE}
          maxPolarAngle={CAMERA_CONSTANTS.MAX_POLAR_ANGLE}
          minAzimuthAngle={CAMERA_CONSTANTS.MIN_AZIMUTH_ANGLE}
          maxAzimuthAngle={CAMERA_CONSTANTS.MAX_AZIMUTH_ANGLE}
          minDistance={CAMERA_CONSTANTS.MIN_DISTANCE}
          maxDistance={CAMERA_CONSTANTS.MAX_DISTANCE}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          enableZoom={true}
          enableRotate={true}
        />
      )} 
      <Track />
      <Ground />
      <Car />
    </Suspense>
  )
}

export default Scene