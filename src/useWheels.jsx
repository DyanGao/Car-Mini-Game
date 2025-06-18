import { useRef } from "react";
import { useCompoundBody } from "@react-three/cannon";
import { PHYSICS_CONSTANTS } from "./constants/physics";

export const useWheels = (width, height, front, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: PHYSICS_CONSTANTS.SUSPENSION_STIFFNESS,
    suspensionRestLength: PHYSICS_CONSTANTS.SUSPENSION_REST_LENGTH,
    frictionSlip: PHYSICS_CONSTANTS.FRICTION_SLIP * 1.5, // Increase friction for better stability
    dampingRelaxation: PHYSICS_CONSTANTS.DAMPING_RELAXATION,
    dampingCompression: PHYSICS_CONSTANTS.DAMPING_COMPRESSION,
    maxSuspensionForce: PHYSICS_CONSTANTS.MAX_SUSPENSION_FORCE,
    rollInfluence: 0.05, // Increase roll influence for better stability
    maxSuspensionTravel: PHYSICS_CONSTANTS.MAX_SUSPENSION_TRAVEL,
    customSlidingRotationalSpeed: PHYSICS_CONSTANTS.CUSTOM_SLIDING_ROTATIONAL_SPEED,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];


  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });

  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};