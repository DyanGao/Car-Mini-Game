/* eslint-disable react/no-unknown-property */
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { BufferAttribute  } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { GAME_CONSTANTS } from './constants/game';

const Ground = () => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0]
  }),
    useRef(null)
  )
  const gridMap = useLoader(
    TextureLoader,
    GAME_CONSTANTS.TEXTURES.GRID
  );
  const aoMap = useLoader(
    TextureLoader,
    GAME_CONSTANTS.TEXTURES.GROUND_AO
  );
  const alphaMap = useLoader(
    TextureLoader,
    GAME_CONSTANTS.TEXTURES.ALPHA_MAP
  );

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);
  useEffect(() => {
    let uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));

    let uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute('uv2', new BufferAttribute(uvs2, 2))
  }, [meshRef2]);

  

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI*0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={'white'}
        />
      </mesh>
      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
      <circleGeometry args={[6, 12, 50]} />
      <MeshReflectorMaterial
        aoMap={aoMap}
        alphaMap={alphaMap}
        transparent={true}
        color={GAME_CONSTANTS.GROUND_MATERIAL.COLOR}
        envMapIntensity={GAME_CONSTANTS.GROUND_MATERIAL.ENV_MAP_INTENSITY}
        metalness={GAME_CONSTANTS.GROUND_MATERIAL.METALNESS}
        roughness={GAME_CONSTANTS.GROUND_MATERIAL.ROUGHNESS}
        
        dithering={true}
        blur={[128, 128]}        // More blur for softer sand look
        mixBlur={0.5}            // Very light blur mixing
        mixStrength={GAME_CONSTANTS.GROUND_MATERIAL.MIX_STRENGTH}
        mixContrast={GAME_CONSTANTS.GROUND_MATERIAL.MIX_CONTRAST}
        resolution={GAME_CONSTANTS.GROUND_MATERIAL.RESOLUTION}
        mirror={GAME_CONSTANTS.GROUND_MATERIAL.MIRROR}
        depthScale={0.2}         // Minimal depth for flat sand
        minDepthThreshold={0.2}  // Very wide depth range
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.05} // Minimal depth-based blur
        debug={0}
        reflectorOffset={0.005}  // Very small offset for sand
      />
      </mesh>
    </>
  )
}

export default Ground