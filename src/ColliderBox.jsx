/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { useBox } from "@react-three/cannon";
import { DEBUG_FLAGS } from './constants/physics';

const ColliderBox = ({ position, scale }) => {
  useBox(() => ({
    args: scale,
    position,
    type: 'Static',
  }));

  return (
    DEBUG_FLAGS.SHOW_COLLIDERS && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={ true } opacity={0.25} />
      </mesh>
    )
  )
}

ColliderBox.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ColliderBox