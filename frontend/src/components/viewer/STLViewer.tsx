"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onError }: { url: string; onError: () => void }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const loader = new STLLoader();
    
    if (url.startsWith('data:')) {
      try {
        // Handle Data URI directly via parse
        const base64Data = url.split(',')[1];
        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const geom = loader.parse(bytes.buffer);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGeometry(geom);
      } catch (e) {
        console.error("Failed to parse Data URI STL:", e);
        onError();
      }
    } else {
      // Handle regular URL
      loader.load(
        url,
        (geom) => setGeometry(geom),
        undefined,
        (error) => {
          console.error("Error loading STL URL:", error);
          onError();
        }
      );
    }
  }, [url, onError]);

  if (!geometry) return null;

  return (
    <Center>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#94a3b8" 
          metalness={0.8} 
          roughness={0.2} 
          flatShading={false}
        />
      </mesh>
    </Center>
  );
}

export default function STLViewer({ url }: { url: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="w-full h-full relative bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-800 flex items-center justify-center">
      {error ? (
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">3D Model Yüklenemedi</div>
          <div className="text-slate-600 text-xs mt-2 italic">Dosya bulunamadı veya geçersiz.</div>
        </div>
      ) : (
        <>
          <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback={null}>
              <Stage intensity={0.5} environment="city" adjustCamera={1.2}>
                <Model url={url} onError={() => setError(true)} />
              </Stage>
            </Suspense>
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
              3D VIEW MODE
            </div>
          </div>
        </>
      )}
      
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
          🔍
        </button>
        <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
          📏
        </button>
      </div>
    </div>
  );
}
