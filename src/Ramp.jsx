import { useTrimesh } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GAME_CONSTANTS } from './constants/game';

const Ramp = () => {
  const ramp = useLoader(GLTFLoader, GAME_CONSTANTS.MODELS.RAMP);
  const geometry = ramp.scene.children[0].geometry;
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  const [ref] = useTrimesh(() => ({
    args: [vertices, indices],
    mass: 0,
    type: 'Static'
  }),
  useRef(null)
  );

  return (
    <primitive ref={ref} object={ramp.scene} />
  );
}

export default Ramp