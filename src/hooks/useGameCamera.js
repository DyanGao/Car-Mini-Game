import { useFrame } from '@react-three/fiber';
import { Vector3, Quaternion } from 'three';
import { CAMERA_CONSTANTS } from '../constants/physics';

export const useGameCamera = (chassisBodyRef, thirdPerson) => {
  useFrame((state) => {
    if (!thirdPerson || !chassisBodyRef.current) return;

    // Get car position and rotation
    const position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBodyRef.current.matrixWorld);

    const quaternion = new Quaternion(0, 0, 0, 1);
    quaternion.setFromRotationMatrix(chassisBodyRef.current.matrixWorld);

    // Calculate camera direction (behind the car)
    const worldDirection = new Vector3(0, 0, -1);
    worldDirection.applyQuaternion(quaternion);
    worldDirection.normalize();

    // Calculate camera position
    const cameraPosition = position.clone().add(
      worldDirection.clone()
        .multiplyScalar(CAMERA_CONSTANTS.THIRD_PERSON_OFFSET.BACK)
        .add(new Vector3(0, CAMERA_CONSTANTS.THIRD_PERSON_OFFSET.UP, 0))
    );

    // Smoothly update camera
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });
}; 