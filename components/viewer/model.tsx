'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url, loader => {
    loader.setCrossOrigin('anonymous');
  });
  console.log('GLB model loaded successfully:', url);
  return <primitive object={gltf.scene} position={[0, 0, 0]} scale={1.5} />;
}