# 🏎️ Car Mini-Game

A 3D racing game built with React Three Fiber, featuring realistic physics, smooth controls, and immersive 3D graphics.

## 🚀 Live Demo

**Play the game:** [https://car-mini-game.vercel.app/](https://car-mini-game.vercel.app/)

## ✨ Features

### 🎮 Gameplay

- **Realistic Car Physics**: Powered by Cannon.js physics engine with raycast vehicle simulation
- **Smooth Controls**: Arcade-style driving with immediate response and smooth steering
- **Dual Camera Modes**: Toggle between free orbit camera and third-person following camera
- **Track Environment**: Custom 3D track with barriers, ramps, and obstacles
- **Flip Mechanics**: Perform aerial tricks with arrow key controls

### 🎨 Visual Features

- **3D Graphics**: Built with Three.js and React Three Fiber
- **Realistic Lighting**: HDR environment lighting with "park" preset
- **Sandy Ground**: Natural-looking sandy surface with realistic material properties
- **Car Model**: Detailed 3D car model with proper scaling and positioning
- **Smooth Animations**: 60fps rendering with optimized performance

### 🎯 Controls

- **W/S**: Forward/Backward movement
- **A/D**: Left/Right steering
- **Arrow Keys**: Flip controls for aerial tricks
- **R**: Reset car position
- **K**: Toggle camera mode (Free/Third-person)
- **Mouse**: Orbit camera (in free camera mode)
- **Scroll**: Zoom in/out (limited range)

## 🛠️ Technical Stack

### Core Technologies

- **React 18**: Modern React with hooks and context
- **React Three Fiber**: React renderer for Three.js
- **Three.js**: 3D graphics library
- **@react-three/cannon**: Physics engine integration
- **@react-three/drei**: Useful R3F utilities and helpers
- **Vite**: Fast build tool and development server

### Physics & 3D

- **Cannon.js**: Realistic physics simulation
- **Raycast Vehicle**: Authentic car physics with suspension
- **Collision Detection**: SAP (Sweep and Prune) broadphase algorithm
- **Custom Gravity**: Tuned for arcade-style gameplay (-2.6 units)

## 📁 Project Structure

```
Car-Mini-Game/
├── src/
│   ├── constants/
│   │   ├── physics.js      # Physics constants and camera settings
│   │   └── game.js         # Game constants and asset paths
│   ├── context/
│   │   └── GameContext.jsx # Global state management
│   ├── hooks/
│   │   └── useGameCamera.js # Camera following logic
│   ├── components/
│   │   ├── Car.jsx         # Main car component with physics
│   │   ├── Scene.jsx       # 3D scene setup
│   │   ├── Track.jsx       # Race track and barriers
│   │   ├── Ground.jsx      # Sandy ground surface
│   │   ├── Ramp.jsx        # Jump ramp
│   │   ├── ColliderBox.jsx # Invisible collision barriers
│   │   ├── WheelDebug.jsx  # Wheel visualization (debug)
│   │   ├── useControls.jsx # Input handling
│   │   ├── useWheels.jsx   # Wheel physics setup
│   │   └── main.jsx        # App entry point
│   └── index.css           # Styling
├── public/
│   ├── models/             # 3D models (.glb files)
│   │   ├── car.glb
│   │   ├── track.glb
│   │   └── ramp.glb
│   └── textures/           # Texture files
│       ├── track.png
│       ├── grid.png
│       ├── ground-ao.png
│       └── alpha-map.png
└── package.json
```

## 🚗 Car Physics System

### Vehicle Configuration

- **Mass**: 150 units
- **Chassis**: Box collider (0.15 × 0.07 × 0.30 meters)
- **Wheels**: 4-wheel setup with independent suspension
- **Engine Force**: 150 units
- **Steering Angle**: 0.35 radians (20 degrees)

### Wheel Physics

- **Suspension Stiffness**: 60
- **Friction**: 7.5 (enhanced for stability)
- **Damping**: Compression (4.4) and Relaxation (2.3)
- **Roll Influence**: 0.05 for realistic body roll

### Control System

- **Immediate Response**: Car responds instantly to input
- **Smooth Stopping**: Progressive braking with velocity damping
- **Gradual Steering Return**: Wheels smoothly return to center
- **Flip Controls**: Apply impulse forces for aerial maneuvers

## 📷 Camera System

### Free Camera Mode

- **Orbit Controls**: Mouse-controlled camera orbiting
- **Angle Limits**: 27° to 63° vertical range
- **Rotation Limits**: ±54° horizontal range  
- **Zoom Limits**: 4-8 units distance (prevents seeing ground edges)
- **Smooth Damping**: Natural camera movement

### Third-Person Mode

- **Dynamic Following**: Camera follows car position and rotation
- **Smart Positioning**: Stays behind and above the car
- **Smooth Tracking**: No jarring movements during turns

## 🎨 Visual Design

### Ground Surface

- **Sandy Appearance**: Warm beige color [0.9, 0.8, 0.6]
- **Realistic Material**: High roughness (0.95), no metalness
- **Subtle Reflections**: Minimal mirror effect for natural look
- **Optimized Performance**: Balanced quality and frame rate

### Lighting

- **HDR Environment**: "Park" preset for realistic lighting
- **Ambient Occlusion**: Enhanced depth and realism
- **Environment Mapping**: Subtle reflections on car surface

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/DyanGao/Car-Mini-Game.git
cd Car-Mini-Game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

- Development server runs on `http://localhost:5173`
- Hot module replacement for instant updates
- ESLint configuration for code quality

## 🎯 Game Mechanics

### Driving Physics

- **Arcade Style**: Immediate response for fun gameplay
- **Realistic Elements**: Proper weight transfer and momentum
- **Smooth Controls**: No jerky movements or sudden stops
- **Stable Handling**: Enhanced friction prevents sliding

### Track Features

- **Barriers**: Invisible collision boxes for track boundaries
- **Ramps**: Jump opportunities for aerial tricks
- **Surface Variation**: Different textures and materials
- **Strategic Layout**: Designed for engaging gameplay

## 🔄 State Management

### Game Context

- **Camera State**: Third-person toggle and position
- **Game State**: Playing, paused, menu states
- **Debug Mode**: Development tools and visualization
- **Centralized**: No prop drilling, clean component structure

### Performance Optimizations

- **Efficient Rendering**: Optimized Three.js setup
- **Physics Optimization**: Tuned collision detection
- **Asset Loading**: Efficient model and texture loading
- **Memory Management**: Proper cleanup and disposal

## 🎮 Controls Reference

| Input | Action | Description |
|-------|--------|-------------|
| `W` | Accelerate | Move car forward |
| `S` | Reverse | Move car backward |
| `A` | Turn Left | Steer left |
| `D` | Turn Right | Steer right |
| `↑` | Flip Forward | Nose down trick |
| `↓` | Flip Backward | Nose up trick |
| `←` | Flip Left | Roll left |
| `→` | Flip Right | Roll right |
| `R` | Reset | Return to start position |
| `K` | Camera Toggle | Switch camera modes |
| Mouse | Orbit Camera | Free camera control |
| Scroll | Zoom | Adjust camera distance |

## 🚀 Deployment

The game is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://car-mini-game.vercel.app/](https://car-mini-game.vercel.app/)

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- **Three.js Community**: For the amazing 3D library
- **React Three Fiber**: For the excellent React integration
- **Cannon.js**: For realistic physics simulation
- **Vercel**: For seamless deployment platform

---

**🎮 Ready to race? [Play now!](https://car-mini-game.vercel.app/)**
