export const GAME_CONSTANTS = {
  // Controls
  CONTROLS: {
    FORWARD: 'w',
    BACKWARD: 's',
    LEFT: 'a',
    RIGHT: 'd',
    RESET: 'r',
    CAMERA_TOGGLE: 'k',
    FLIP_BACKWARD: 'arrowdown',
    FLIP_FORWARD: 'arrowup',
    FLIP_LEFT: 'arrowleft',
    FLIP_RIGHT: 'arrowright',
  },
  
  // UI
  CONTROLS_TEXT: {
    MOVE: 'Press w a s d to MOVE',
    CAMERA: 'Press k to SWAP camera',
    RESET: 'Press r to RESET',
    FLIPS: 'Press arrows for flips',
  },
  
  // Environment
  ENVIRONMENT: {
    PRESET: 'park',
    NEAR: 1,
    FAR: 1000,
    RESOLUTION: 256,
    BLUR: 1,
    GROUND: {
      HEIGHT: 5,
      RADIUS: 40,
      SCALE: 20,
    },
  },
  
  // Assets
  MODELS: {
    CAR: '/models/car.glb',
    TRACK: '/models/track.glb',
    RAMP: '/models/ramp.glb',
  },
  
  TEXTURES: {
    TRACK: '/textures/track.png',
    GRID: '/textures/grid.png',
    GROUND_AO: '/textures/ground-ao.png',
    ALPHA_MAP: '/textures/alpha-map.png',
  },
  
  // Car model scaling
  CAR_SCALE: 0.0012,
  CAR_MODEL_OFFSET: [-365, -18, -67],
  
  // Ground material settings
  GROUND_MATERIAL: {
    COLOR: [0.9, 0.8, 0.6],       // Sandy/beige color
    ENV_MAP_INTENSITY: 0.25,      // Light environment reflection
    METALNESS: 0.0,               // Completely non-metallic (sand)
    ROUGHNESS: 0.95,              // Very rough sand texture
    MIX_STRENGTH: 2,              // Very weak reflection strength
    MIX_CONTRAST: 0.6,            // Low contrast for soft look
    MIRROR: 0.05,                 // Minimal mirror effect
    RESOLUTION: 256,              // Lower resolution for natural look
  },
}; 