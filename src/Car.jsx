/* eslint-disable react/no-unknown-property */
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import useControls from './useControls';
import { useGameContext } from './context/GameContext';
import { useGameCamera } from './hooks/useGameCamera';
import { PHYSICS_CONSTANTS } from './constants/physics';
import { GAME_CONSTANTS } from './constants/game';

const Car = () => {
  const { thirdPerson } = useGameContext();
  
  let mesh = useLoader(
    GLTFLoader,
    GAME_CONSTANTS.MODELS.CAR
  ).scene;

  const position = PHYSICS_CONSTANTS.INITIAL_POSITION;
  const width = PHYSICS_CONSTANTS.CHASSIS_WIDTH;
  const height = PHYSICS_CONSTANTS.CHASSIS_HEIGHT;
  const front = PHYSICS_CONSTANTS.CHASSIS_FRONT;
  const wheelRadius = PHYSICS_CONSTANTS.WHEEL_RADIUS;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(() => ({
    args: chassisBodyArgs,
    mass: PHYSICS_CONSTANTS.CAR_MASS,
    position,
    linearDamping: 0.1, // Light damping for natural movement
    angularDamping: 0.3, // Moderate angular damping
  }),
    useRef(null),
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels
  }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi);
  useGameCamera(chassisBody, thirdPerson);

  useEffect(() => {
    mesh.scale.set(GAME_CONSTANTS.CAR_SCALE, GAME_CONSTANTS.CAR_SCALE, GAME_CONSTANTS.CAR_SCALE);
    mesh.children[0].position.set(...GAME_CONSTANTS.CAR_MODEL_OFFSET);
  },[mesh]);

  return (
    <group ref={vehicle} name='vehicle'>
      <group ref={chassisBody} name='chassisBody'>
        <primitive object={mesh} rotation-y={Math.PI} position={[0,-0.09, 0]} />
      </group>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  )
}

export default Car