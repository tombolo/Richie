"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import styles from './GlobalLoading.module.scss';
import LOGO from './Logo/NILOTE.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();
    const [showElements, setShowElements] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeOrb, setActiveOrb] = useState(0);
    const [currentStep, setCurrentStep] = useState('Initializing Platform...');

    // Premium color scheme - Deep blue with gold accents
    const colors = {
        primary: '#0f1b33',        // Deep navy
        secondary: '#1e3a5c',      // Medium blue
        accent: '#c9a96e',         // Premium gold
        highlight: '#e6c78a',      // Light gold
        success: '#2ecc71',        // Emerald green
        gradient: 'linear-gradient(135deg, #0f1b33 0%, #1e3a5c 50%, #0f1b33 100%)',
        goldGradient: 'linear-gradient(135deg, #c9a96e 0%, #e6c78a 50%, #c9a96e 100%)'
    };

    // Loading steps with realistic timing
    const loadingSteps = [
        { text: 'Initializing Platform...', threshold: 10 },
        { text: 'Loading Market Data...', threshold: 30 },
        { text: 'Connecting to Exchange...', threshold: 50 },
        { text: 'Syncing Portfolio...', threshold: 70 },
        { text: 'Finalizing Setup...', threshold: 90 }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (prev < 100 ? 1 : 0);
                
                // Update current step based on progress
                const step = loadingSteps.find(s => newProgress <= s.threshold) || loadingSteps[loadingSteps.length - 1];
                setCurrentStep(step.text);

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                }
                return newProgress;
            });
        }, 40);

        // Rotate active orb
        const orbInterval = setInterval(() => {
            setActiveOrb(prev => (prev + 1) % 8);
        }, 1200);

        setTimeout(() => {
            controls.start('visible');
            setShowElements(true);
        }, 200);

        return () => {
            clearInterval(progressInterval);
            clearInterval(orbInterval);
        };
    }, []);

    return (
        <div 
            className={styles['global-loading']} 
            style={{
                '--primary': colors.primary,
                '--secondary': colors.secondary,
                '--accent': colors.accent,
                '--highlight': colors.highlight,
                '--success': colors.success
            }}
        >
            
            {/* Animated Background with Depth */}
            <div className={styles['premium-bg']}>
                <div className={styles['bg-grid']}></div>
                <div className={styles['bg-glow']}></div>
                
                {/* Floating Particles */}
                <div className={styles['floating-particles']}>
                    {Array.from({ length: isMobile ? 15 : 25 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={styles['particle']}
                            style={{
                                background: i % 4 === 0 ? colors.accent : 
                                           i % 4 === 1 ? colors.highlight : 
                                           i % 4 === 2 ? '#fff' : colors.success
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: Math.random() * 200 - 100,
                                y: Math.random() * 200 - 100,
                            }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                scale: [0, Math.random() * 0.5 + 0.5, 0],
                                x: Math.random() * 400 - 200,
                                y: Math.random() * 400 - 200,
                            }}
                            transition={{
                                duration: 6 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content Container */}
            <div className={styles['main-content']}>
                
                {/* Premium Logo Section */}
                <motion.div
                    className={styles['logo-section']}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className={styles['logo-orb']}>
                        <div className={styles['logo-main']}>
                            <img src={LOGO.src} alt='Delta Logo' className={styles.logo} />
                            <div className={styles['logo-aura']}></div>
                        </div>
                        
                        {/* Orbital Rings */}
                        <motion.div 
                            className={styles['orbital-ring']}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                            className={styles['orbital-ring']}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Pulsing Glow */}
                        <motion.div 
                            className={styles['pulse-glow']}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Advanced Progress Visualization */}
                <div className={styles['progress-visualization']}>
                    
                    {/* Main Circular Progress */}
                    <div className={styles['circular-progress-wrapper']}>
                        
                        {/* Outer Glow Effect */}
                        <motion.div 
                            className={styles['progress-aura']}
                            animate={{ 
                                rotate: 360,
                                opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{ 
                                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />
                        
                        {/* Progress SVG */}
                        <svg className={styles['progress-svg']} viewBox="0 0 140 140">
                            <defs>
                                {/* Gold Gradient */}
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={colors.accent} />
                                    <stop offset="50%" stopColor={colors.highlight} />
                                    <stop offset="100%" stopColor={colors.accent} />
                                </linearGradient>
                                
                                {/* Glow Effects */}
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Background Track */}
                            <circle
                                cx="70"
                                cy="70"
                                r="60"
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="3"
                            />
                            
                            {/* Main Progress Track */}
                            <motion.circle
                                cx="70"
                                cy="70"
                                r="60"
                                fill="none"
                                stroke="url(#goldGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="376.8"
                                strokeDashoffset={376.8 - (progress / 100) * 376.8}
                                filter="url(#glow)"
                                initial={{ strokeDashoffset: 376.8 }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                            
                            {/* Animated Dots */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    fill="none"
                                    stroke={activeOrb === i ? colors.highlight : "rgba(201, 169, 110, 0.2)"}
                                    strokeWidth="1"
                                    strokeDasharray="2,8"
                                    initial={{ rotate: i * 45 }}
                                    animate={{ rotate: 360 + i * 45 }}
                                    transition={{ 
                                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                                        stroke: { duration: 0.5 }
                                    }}
                                />
                            ))}
                            
                            {/* Center Display */}
                            <g className={styles['center-display']}>
                                <motion.circle 
                                    cx="70" 
                                    cy="70" 
                                    r="35" 
                                    fill="rgba(15, 27, 51, 0.8)" 
                                    stroke="rgba(201, 169, 110, 0.3)"
                                    strokeWidth="1"
                                />
                                <text
                                    x="70"
                                    y="65"
                                    textAnchor="middle"
                                    fontSize="18"
                                    fill={colors.highlight}
                                    fontWeight="700"
                                    fontFamily="'Inter', system-ui"
                                >
                                    {progress}%
                                </text>
                                <text
                                    x="70"
                                    y="80"
                                    textAnchor="middle"
                                    fontSize="8"
                                    fill="rgba(255,255,255,0.6)"
                                    fontWeight="500"
                                    letterSpacing="1px"
                                >
                                    COMPLETE
                                </text>
                            </g>
                        </svg>

                        {/* Progress Particles */}
                        <div className={styles['progress-particles']}>
                            {Array.from({ length: 16 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={styles['progress-particle']}
                                    style={{
                                        background: `conic-gradient(from ${i * 22.5}deg, ${colors.accent}, ${colors.highlight})`
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        x: [0, Math.cos((i * 22.5) * Math.PI / 180) * 75],
                                        y: [0, Math.sin((i * 22.5) * Math.PI / 180) * 75],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Loading Status */}
                    <motion.div 
                        className={styles['loading-status']}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className={styles['current-step']}>
                            <motion.span
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep}
                            </motion.span>
                        </div>
                        
                        {/* Progress Steps */}
                        <div className={styles['progress-steps']}>
                            {loadingSteps.map((step, index) => (
                                <div key={index} className={styles['step']}>
                                    <motion.div 
                                        className={styles['step-indicator']}
                                        animate={{ 
                                            scale: progress >= step.threshold ? [1, 1.3, 1] : 1,
                                            background: progress >= step.threshold ? colors.success : 'rgba(255,255,255,0.1)',
                                            borderColor: progress >= step.threshold ? colors.success : 'rgba(255,255,255,0.3)'
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {progress >= step.threshold && (
                                            <motion.svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <path
                                                    d="M10 3L4.5 8.5L2 6"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </motion.svg>
                                        )}
                                    </motion.div>
                                    <span className={styles['step-text']}>
                                        {step.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Connection Visualization */}
                <div className={styles['connection-visualization']}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={styles['connection-beam']}
                            style={{
                                background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`
                            }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                scaleX: [0, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Premium Branding */}
                <motion.div
                    className={styles['premium-branding']}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className={styles['brand-text']}>
                        <span>POWERED BY</span>
                        <span className={styles['brand-name']}>DERIV</span>
                    </div>
                    <motion.div 
                        className={styles['brand-underline']}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    />
                </motion.div>
            </div>

            {/* Ambient Lighting */}
            <div className={styles['ambient-lighting']}>
                <motion.div 
                    className={styles['light-beam']}
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
                    animate={{
                        x: ['-100%', '200%', '-100%'],
                        opacity: [0, 0.1, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
};

export default GlobalLoading;