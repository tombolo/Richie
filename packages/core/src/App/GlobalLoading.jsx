"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import styles from './CopyTradingPage.module.scss';
import LOGO from './LOGO/NILOTE.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();
    const [showElements, setShowElements] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeOrb, setActiveOrb] = useState(0);

    // Professional color scheme
    const colors = {
        primary: '#3a7bd5',    // Professional blue
        secondary: '#00d1b2',  // Teal accent
        accent: '#6c5ce7',     // Soft purple
        success: '#00b894',    // Green for success
        warning: '#fdcb6e',    // Gold for warnings
        gradient: 'linear-gradient(135deg, #3a7bd5 0%, #00d1b2 100%)'
    };

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
                const newProgress = prev + 1;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                }
                return newProgress;
            });
        }, 60);

        // Rotate active orb
        const orbInterval = setInterval(() => {
            setActiveOrb(prev => (prev + 1) % 5);
        }, 1500);

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
        <div className={styles['global-loading']} style={{ '--primary': colors.primary, '--secondary': colors.secondary, '--accent': colors.accent } as any}>
            {/* Animated Gradient Background */}
            <div className={styles['gradient-bg']}>
                <div className={styles['gradient-orbit']}></div>
                <div className={styles['gradient-orbit']}></div>
                <div className={styles['gradient-orbit']}></div>
            </div>

            {/* Floating Geometric Shapes */}
            <div className={styles['geometric-shapes']}>
                {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles['shape']}
                        style={{
                            background: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: Math.random() * 360,
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.8, 1.2, 0.8],
                            rotate: [0, 180, 360],
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className={styles['main-content']}>
                {/* Logo with Holographic Effect */}
                <motion.div
                    className={styles['logo-container']}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        },
                    }}
                >
                    <div className={styles['logo-wrapper']}>
                        <img src={LOGO.src} alt='Delta Logo' className={styles.logo} />
                        <div className={styles['logo-orbital']}>
                            <div className={styles['orbital-ring']}></div>
                            <div className={styles['orbital-ring']}></div>
                        </div>
                        <div className={styles['logo-glow']}></div>
                    </div>
                </motion.div>

                {/* Advanced Circular Progress */}
                <div className={styles['progress-section']}>
                    <div className={styles['circular-progress-container']}>
                        {/* Outer Glow Ring */}
                        <motion.div 
                            className={styles['progress-glow-ring']}
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />
                        
                        {/* Main Progress Circle */}
                        <svg className={styles['progress-svg']} viewBox="0 0 120 120">
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={colors.primary} />
                                    <stop offset="50%" stopColor={colors.secondary} />
                                    <stop offset="100%" stopColor={colors.accent} />
                                </linearGradient>
                                <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                                    <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            
                            {/* Background Track */}
                            <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="4"
                            />
                            
                            {/* Progress Track */}
                            <motion.circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="326.56"
                                strokeDashoffset={326.56 - (progress / 100) * 326.56}
                                initial={{ strokeDashoffset: 326.56 }}
                                transition={{ duration: 0.1, ease: "linear" }}
                                filter="url(#glow)"
                            />
                            
                            {/* Animated Orbs */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.circle
                                    key={i}
                                    cx="60"
                                    cy="60"
                                    r="52"
                                    fill="none"
                                    stroke={activeOrb === i ? colors.primary : "rgba(255,255,255,0.3)"}
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    initial={{ rotate: i * 72 }}
                                    animate={{ rotate: 360 + i * 72 }}
                                    transition={{ 
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        stroke: { duration: 0.3 }
                                    }}
                                />
                            ))}
                            
                            {/* Center Content */}
                            <motion.g
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <circle cx="60" cy="60" r="30" fill="url(#glowGradient)" opacity="0.3" />
                                <text
                                    x="60"
                                    y="58"
                                    textAnchor="middle"
                                    fontSize="20"
                                    fill="#fff"
                                    fontWeight="700"
                                    fontFamily="'Segoe UI', system-ui"
                                >
                                    {progress}%
                                </text>
                                <text
                                    x="60"
                                    y="75"
                                    textAnchor="middle"
                                    fontSize="8"
                                    fill="rgba(255,255,255,0.7)"
                                    fontWeight="500"
                                >
                                    LOADING
                                </text>
                            </motion.g>
                        </svg>

                        {/* Floating Particles around progress */}
                        <div className={styles['progress-particles']}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={styles['progress-particle']}
                                    style={{
                                        background: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                        x: [0, Math.cos((i * 30) * Math.PI / 180) * 80],
                                        y: [0, Math.sin((i * 30) * Math.PI / 180) * 80],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Loading Steps */}
                    <motion.div 
                        className={styles['loading-steps']}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className={styles['step']}>
                            <motion.div 
                                className={styles['step-dot']}
                                animate={{ 
                                    scale: progress > 25 ? [1, 1.2, 1] : 1,
                                    background: progress > 25 ? colors.success : 'rgba(255,255,255,0.3)'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className={styles['step-text']}>
                                {progress > 25 ? '✓' : '•'} System Initialization
                            </span>
                        </div>
                        <div className={styles['step']}>
                            <motion.div 
                                className={styles['step-dot']}
                                animate={{ 
                                    scale: progress > 50 ? [1, 1.2, 1] : 1,
                                    background: progress > 50 ? colors.success : 'rgba(255,255,255,0.3)'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className={styles['step-text']}>
                                {progress > 50 ? '✓' : '•'} Market Data
                            </span>
                        </div>
                        <div className={styles['step']}>
                            <motion.div 
                                className={styles['step-dot']}
                                animate={{ 
                                    scale: progress > 75 ? [1, 1.2, 1] : 1,
                                    background: progress > 75 ? colors.success : 'rgba(255,255,255,0.3)'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className={styles['step-text']}>
                                {progress > 75 ? '✓' : '•'} Trading Engine
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Connection Lines */}
                <div className={styles['connection-lines']}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={styles['connection-line']}
                            style={{
                                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? colors.primary : colors.secondary}, transparent)`
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scaleX: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Branding */}
                <motion.div
                    className={styles['branding']}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className={styles['brand-text']}>
                        POWERED BY <span className={styles['brand-name']}>DELTA TRADING</span>
                    </div>
                    <motion.div 
                        className={styles['brand-glow']}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>

            {/* Ambient Light Effects */}
            <div className={styles['ambient-lights']}>
                <motion.div 
                    className={styles['ambient-light']}
                    style={{ background: colors.primary }}
                    animate={{
                        x: ['0%', '100%', '0%'],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className={styles['ambient-light']}
                    style={{ background: colors.secondary }}
                    animate={{
                        x: ['100%', '0%', '100%'],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
};

export default GlobalLoading;