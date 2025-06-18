export const PHYSICS_CONSTANTS = {
  // Car physics
  CAR_MASS: 150,
  CHASSIS_WIDTH: 0.15,
  CHASSIS_HEIGHT: 0.07,
  CHASSIS_FRONT: 0.15,
  
  // Wheel physics
  WHEEL_RADIUS: 0.05,
  SUSPENSION_STIFFNESS: 60,
  SUSPENSION_REST_LENGTH: 0.1,
  FRICTION_SLIP: 5,
  DAMPING_RELAXATION: 2.3,
  DAMPING_COMPRESSION: 4.4,
  MAX_SUSPENSION_FORCE: 100000,
  ROLL_INFLUENCE: 0.01,
  MAX_SUSPENSION_TRAVEL: 0.1,
  CUSTOM_SLIDING_ROTATIONAL_SPEED: -30,
  
  // Control forces
  ENGINE_FORCE: 150,
  BRAKING_FORCE: 50, // Moderate braking to prevent flipping
  VELOCITY_DAMPING: 0.85, // How much to reduce velocity each frame
  STEERING_RETURN_SPEED: 0.2, // How quickly steering returns to center
  STEERING_ANGLE: 0.35,
  FLIP_IMPULSE_FORCE: -5,
  
  // World physics
  GRAVITY: [0, -2.6, 0],
  
  // Car positioning
  INITIAL_POSITION: [-1.5, 0.5, 3],
  INITIAL_ROTATION: [0, 0, 0],
  INITIAL_VELOCITY: [0, 0, 0],
  INITIAL_ANGULAR_VELOCITY: [0, 0, 0],
};

export const CAMERA_CONSTANTS = {
  DEFAULT_POSITION: [-6, 3.9, 6.21],
  FOV: 50,
  THIRD_PERSON_OFFSET: {
    BACK: -1,
    UP: 0.3,
  },
  ORBIT_TARGET: [-2.64, -0.71, 0.03],
  // Camera angle limits (in radians)
  MIN_POLAR_ANGLE: Math.PI * 0.15, // 27 degrees from top (prevents going too high)
  MAX_POLAR_ANGLE: Math.PI * 0.35, // 63 degrees from top (tighter angle limit)
  MIN_DISTANCE: 4,
  MAX_DISTANCE: 8, // Very tight zoom limit to prevent seeing ground edges
  // Camera movement limits
  MIN_AZIMUTH_ANGLE: -Math.PI * 0.3, // -54 degrees (left limit)
  MAX_AZIMUTH_ANGLE: Math.PI * 0.3,  // +54 degrees (right limit)
};

export const DEBUG_FLAGS = {
  SHOW_WHEELS: false,
  SHOW_COLLIDERS: false,
  SHOW_PHYSICS_DEBUG: false,
}; 