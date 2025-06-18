import { useEffect, useState, useRef } from 'react';
import { PHYSICS_CONSTANTS } from './constants/physics';
import { GAME_CONSTANTS } from './constants/game';

const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({});
  const currentSteering = useRef([0, 0, 0, 0]);
  const targetSteering = useRef([0, 0, 0, 0]);

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true
      }));
    }

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false
      }));
    }

    window.addEventListener('keydown', keyDownPressHandler);
    window.addEventListener('keyup', keyUpPressHandler);

    return () => {
      window.removeEventListener('keydown', keyDownPressHandler);
      window.removeEventListener('keyup', keyUpPressHandler);
    }
  }, []);

  useEffect(() => {
    // Get current velocity to determine if car is moving
    let speed = 0;
    if (chassisApi && chassisApi.velocity) {
      try {
        const velocity = chassisApi.velocity.get();
        if (velocity && typeof velocity === 'object') {
          speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
        }
      } catch (error) {
        console.error("Error getting velocity:", error);
      }
    }
    
    if (controls[GAME_CONSTANTS.CONTROLS.FORWARD]) {
      // Apply forward force
      vehicleApi.applyEngineForce(PHYSICS_CONSTANTS.ENGINE_FORCE, 2);
      vehicleApi.applyEngineForce(PHYSICS_CONSTANTS.ENGINE_FORCE, 3);
      // Release brakes when accelerating
      for (let i = 0; i < 4; i++) {
        vehicleApi.setBrake(0, i);
      }
    } else if (controls[GAME_CONSTANTS.CONTROLS.BACKWARD]) {
      // Apply reverse force
      vehicleApi.applyEngineForce(-PHYSICS_CONSTANTS.ENGINE_FORCE, 2);
      vehicleApi.applyEngineForce(-PHYSICS_CONSTANTS.ENGINE_FORCE, 3);
      // Release brakes when reversing
      for (let i = 0; i < 4; i++) {
        vehicleApi.setBrake(0, i);
      }
    } else {
      // No movement keys pressed - smooth stop
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      
      // Apply moderate braking to prevent flipping
      if (speed > 0.1) {
        for (let i = 0; i < 4; i++) {
          vehicleApi.setBrake(PHYSICS_CONSTANTS.BRAKING_FORCE, i);
        }
        
        // Gradually reduce velocity for smooth stopping
        const currentVelocity = chassisApi.velocity.get();
        chassisApi.velocity.set(
          currentVelocity.x * PHYSICS_CONSTANTS.VELOCITY_DAMPING,
          currentVelocity.y,
          currentVelocity.z * PHYSICS_CONSTANTS.VELOCITY_DAMPING
        );
      } else {
        // When nearly stopped, remove all brakes to prevent jitter
        for (let i = 0; i < 4; i++) {
          vehicleApi.setBrake(0, i);
        }
        
        // Completely stop if very slow
        if (speed < 0.05) {
          chassisApi.velocity.set(0, 0, 0);
          chassisApi.angularVelocity.set(0, 0, 0);
        }
      }
    }

    if (controls[GAME_CONSTANTS.CONTROLS.LEFT]) {
      // Apply left steering directly
      vehicleApi.setSteeringValue(PHYSICS_CONSTANTS.STEERING_ANGLE, 2);
      vehicleApi.setSteeringValue(PHYSICS_CONSTANTS.STEERING_ANGLE, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      targetSteering.current = [
        -0.1, // Front left
        -0.1, // Front right
        PHYSICS_CONSTANTS.STEERING_ANGLE, // Rear left
        PHYSICS_CONSTANTS.STEERING_ANGLE  // Rear right
      ];
    } else if (controls[GAME_CONSTANTS.CONTROLS.RIGHT]) {
      // Apply right steering directly
      vehicleApi.setSteeringValue(-PHYSICS_CONSTANTS.STEERING_ANGLE, 2);
      vehicleApi.setSteeringValue(-PHYSICS_CONSTANTS.STEERING_ANGLE, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      targetSteering.current = [
        0.1, // Front left
        0.1, // Front right
        -PHYSICS_CONSTANTS.STEERING_ANGLE, // Rear left
        -PHYSICS_CONSTANTS.STEERING_ANGLE  // Rear right
      ];
    } else {
      // When no steering input, gradually return to center
      targetSteering.current = [0, 0, 0, 0];
    }

    if (controls[GAME_CONSTANTS.CONTROLS.FLIP_BACKWARD]) 
      chassisApi.applyLocalImpulse([0, PHYSICS_CONSTANTS.FLIP_IMPULSE_FORCE, 0], [0, 0, 1]);
    if (controls[GAME_CONSTANTS.CONTROLS.FLIP_FORWARD]) 
      chassisApi.applyLocalImpulse([0, PHYSICS_CONSTANTS.FLIP_IMPULSE_FORCE, 0], [0, 0, -1]);
    if (controls[GAME_CONSTANTS.CONTROLS.FLIP_LEFT]) 
      chassisApi.applyLocalImpulse([0, PHYSICS_CONSTANTS.FLIP_IMPULSE_FORCE, 0], [-0.5, 0, 0]);
    if (controls[GAME_CONSTANTS.CONTROLS.FLIP_RIGHT]) 
      chassisApi.applyLocalImpulse([0, PHYSICS_CONSTANTS.FLIP_IMPULSE_FORCE, 0], [+0.5, 0, 0]);

    if (controls[GAME_CONSTANTS.CONTROLS.RESET]) {
      chassisApi.position.set(...PHYSICS_CONSTANTS.INITIAL_POSITION);
      chassisApi.velocity.set(...PHYSICS_CONSTANTS.INITIAL_VELOCITY);
      chassisApi.angularVelocity.set(...PHYSICS_CONSTANTS.INITIAL_ANGULAR_VELOCITY);
      chassisApi.rotation.set(...PHYSICS_CONSTANTS.INITIAL_ROTATION);
    }
  }, [controls, vehicleApi, chassisApi]);

  // Smooth steering return to center when no input
  useEffect(() => {
    if (!vehicleApi) return;
    
    // Set up continuous animation frame for smooth steering return
    const animateSteeringFrame = () => {
      if (!vehicleApi) return;
      
      // Only apply smooth transition when returning to center (no active steering)
      const hasSteeringInput = controls[GAME_CONSTANTS.CONTROLS.LEFT] || controls[GAME_CONSTANTS.CONTROLS.RIGHT];
      
      if (!hasSteeringInput) {
        // Gradually transition current steering to target steering (center)
        let needsUpdate = false;
        for (let i = 0; i < 4; i++) {
          if (Math.abs(currentSteering.current[i] - targetSteering.current[i]) > 0.001) {
            needsUpdate = true;
            // Smoothly interpolate between current and target steering
            const diff = targetSteering.current[i] - currentSteering.current[i];
            currentSteering.current[i] += diff * PHYSICS_CONSTANTS.STEERING_RETURN_SPEED;
            
            // Apply small threshold to snap to exact target when very close
            if (Math.abs(diff) < 0.001) {
              currentSteering.current[i] = targetSteering.current[i];
            }
            
            // Apply the smoothed steering value
            vehicleApi.setSteeringValue(currentSteering.current[i], i);
          }
        }
        
        if (needsUpdate) {
          animationFrameId = requestAnimationFrame(animateSteeringFrame);
        }
      } else {
        // Update current steering to match active input
        for (let i = 0; i < 4; i++) {
          currentSteering.current[i] = targetSteering.current[i];
        }
        // Continue the loop for when steering is released
        animationFrameId = requestAnimationFrame(animateSteeringFrame);
      }
    };
    
    // Start animation loop
    let animationFrameId = requestAnimationFrame(animateSteeringFrame);
    
    // Clean up animation frame on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [vehicleApi, controls]);

  return controls;
}

export default useControls