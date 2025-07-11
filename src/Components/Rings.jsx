import { useGSAP } from '@gsap/react';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useCallback, useRef } from 'react';

const Rings = ({ position, scale }) => {
  const refList = useRef([]);
  const getRef = useCallback((mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  const texture = useTexture('textures/rings.png');

  useGSAP(
    () => {
      if (refList.current.length === 0) return;


      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.5,
        })
        .to(
          refList.current.map((r) => r.rotation),
          {
            y: `+=${Math.PI * 2}`,
            x: `-=${Math.PI * 2}`,
            duration: 2.5,
            stagger: {
              each: 0.15,
            },
          },
        );
    },
    {
      dependencies: position,
    },
  );

  return (
      <group scale={scale} position={position}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            <torusGeometry args={[(index + 1) * 0.5, 0.1]}></torusGeometry>
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
  );
};

export default Rings;