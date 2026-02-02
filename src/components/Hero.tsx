import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ParticleSphere = () => {
    const pointsRef = useRef<THREE.Points>(null!);

    // Create particles
    const particlesFn = () => {
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const r = 4;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Serious/Calm colors (Blue/White/Grey)
            colors[i * 3] = 0.6; // R
            colors[i * 3 + 1] = 0.8; // G
            colors[i * 3 + 2] = 1.0; // B
        }
        return { positions, colors };
    };

    const { positions, colors } = React.useMemo(() => particlesFn(), []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
};

const Hero = () => {
    return (
        <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ParticleSphere />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-7xl font-extralight tracking-tight text-white mb-6">
                        KAALCHAKRA
                    </h1>
                    <div className="h-px w-24 bg-blue-500 mx-auto mb-8"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <h2 className="text-xl md:text-3xl font-light text-stone-300 leading-relaxed mb-10">
                        A digital-first news magazine focused on <br className="hidden md:block" />
                        <span className="text-blue-400 font-normal">credible journalism</span>, ground reports, <br className="hidden md:block" />
                        education, youth issues, and society.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm font-medium tracking-widest text-stone-500 uppercase"
                >
                    <span>Trustworthy Reporting</span>
                    <span className="hidden md:inline">•</span>
                    <span>Explainers</span>
                    <span className="hidden md:inline">•</span>
                    <span>Responsible Opinion</span>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
            </motion.div>
        </div>
    );
};

export default Hero;
