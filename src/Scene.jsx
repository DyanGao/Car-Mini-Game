/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Track from './Track'
import Ground from "./Ground";
import Car from "./Car";

const Scene = () => {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === 'k') {
        if (thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [thirdPerson])

  return (
    <Suspense fallback={false}>
      
      <Environment 
        preset="park" 
        background 
        near={1}
        far={1000}
        resolution={256}
        blur={1}
        ground={{height: 5, radius: 40, scale: 20}}
      />
    
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      {!thirdPerson && (
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
      )} 
      <Track />
      <Ground />
      <Car thirdPerson={ thirdPerson } />
    </Suspense>
  )
}

export default Scene