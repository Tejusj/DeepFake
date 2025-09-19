import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const containerRef = useRef(null);
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const titleLinesRef = useRef([]);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const ctaRef = useRef(null);
    const backgroundRef = useRef(null);
    const cursorRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const { gsap } = window;

        if (!gsap) {
            console.error('GSAP not loaded');
            return;
        }

        // Loading animation
        const loadingTl = gsap.timeline();

        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Watch for loading completion
        const checkLoading = () => {
            if (loadingProgress >= 100) {
                setTimeout(() => {
                    // Hide loader
                    gsap.to(loaderRef.current, {
                        duration: 0.8,
                        y: '-100%',
                        ease: "power4.inOut",
                        onComplete: () => {
                            setIsLoaded(true);
                            startMainAnimation();
                        }
                    });
                }, 500);
            }
        };

        if (loadingProgress >= 100) {
            checkLoading();
        }

        // Main content animation after loading
        const startMainAnimation = () => {
            const mainTl = gsap.timeline();

            // Set initial states
            gsap.set(titleLinesRef.current, {
                y: '100%',
                opacity: 0
            });

            gsap.set([subtitleRef.current, descriptionRef.current, ctaRef.current, menuRef.current], {
                opacity: 0,
                y: 30
            });

            gsap.set(backgroundRef.current, {
                scale: 1.1,
                opacity: 0
            });

            // Animate in sequence
            mainTl
                .to(backgroundRef.current, {
                    duration: 1.5,
                    scale: 1,
                    opacity: 0.6,
                    ease: "power3.out"
                })
                .to(menuRef.current, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out"
                }, "-=1.2")
                .to(titleLinesRef.current, {
                    duration: 1.2,
                    y: '0%',
                    opacity: 1,
                    stagger: 0.1,
                    ease: "power4.out"
                }, "-=0.8")
                .to(subtitleRef.current, {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out"
                }, "-=0.6")
                .to(descriptionRef.current, {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out"
                }, "-=0.8")
                .to(ctaRef.current, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out"
                }, "-=0.6");
        };

        // Mouse parallax
        const handleMouseMove = (e) => {
            if (!isLoaded) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;

            gsap.to(backgroundRef.current, {
                duration: 1.5,
                x: xPos,
                y: yPos,
                ease: "power2.out"
            });

            gsap.to(titleLinesRef.current, {
                duration: 0.8,
                x: xPos * 0.2,
                y: yPos * 0.2,
                ease: "power2.out"
            });
        };

        // Custom cursor
        const handleCursorMove = (e) => {
            if (cursorRef.current && isLoaded) {
                gsap.to(cursorRef.current, {
                    duration: 0.3,
                    x: e.clientX,
                    y: e.clientY,
                    ease: "power2.out"
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousemove', handleCursorMove);

        return () => {
            clearInterval(progressInterval);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousemove', handleCursorMove);
            loadingTl.kill();
        };
    }, [loadingProgress, isLoaded]);

    // Update progress counter
    useEffect(() => {
        if (progressRef.current) {
            const { gsap } = window;
            gsap?.to(progressRef.current, {
                duration: 0.3,
                textContent: Math.floor(loadingProgress),
                roundProps: "textContent",
                ease: "power2.out"
            });
        }
    }, [loadingProgress]);

    return (
        <>
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: 'translate(-50%, -50%)' }}
            />

        {/* Loading Screen */}
            <div
                ref={loaderRef}
                className={`fixed inset-0 bg-black z-40 flex items-center justify-center ${isLoaded ? 'pointer-events-none' : ''}`}
            >
                <div className="text-center">
                    <div className="text-white text-[clamp(4rem,12vw,12rem)] font-extralight leading-none mb-8">
                        <div className="overflow-hidden">
                            <div ref={progressRef} className="inline-block">0</div>
                            <span className="text-gray-500">%</span>
                        </div>
                    </div>
                    <div className="w-64 h-px bg-gray-800 mx-auto">
                        <div
                            className="h-full bg-white transition-all duration-300 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        />
                    </div>
                </div>
            </div>

        {/* Main Content */}
            <section ref={containerRef} className={`relative min-h-screen bg-black overflow-hidden ${isLoaded ? 'cursor-none' : ''}`}>
                {/* Background Elements */}
                <div ref={backgroundRef} className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.015]"
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                     }}>
                </div>

                {/* Navigation */}
                <nav ref={menuRef} className="absolute top-8 w-full px-8 z-30">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-sm font-light tracking-[0.2em]">STUDIO</div>
                        <div className="flex gap-8 text-white text-sm font-light">
                            <span className="hover:opacity-60 transition-opacity cursor-pointer">WORK</span>
                            <span className="hover:opacity-60 transition-opacity cursor-pointer">ABOUT</span>
                            <span className="hover:opacity-60 transition-opacity cursor-pointer">CONTACT</span>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
                    <div className="text-center max-w-7xl mx-auto">

                        {/* Subtitle */}
                        <div ref={subtitleRef} className="mb-8">
              <span className="text-gray-400 text-xs uppercase tracking-[0.4em] font-light">
                Creative Digital Studio
              </span>
                        </div>

                        {/* Main Title */}
                        <div className="mb-12 overflow-hidden">
                            {['WE CREATE', 'DIGITAL', 'EXPERIENCES'].map((line, index) => (
                                <div key={index} className="overflow-hidden">
                                    <h1
                                        ref={el => titleLinesRef.current[index] = el}
                                        className="text-[clamp(4rem,15vw,16rem)] font-extralight leading-[0.85] tracking-[-0.03em] text-white"
                                    >
                                        {line}
                                    </h1>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <p ref={descriptionRef} className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-extralight">
                            We craft immersive digital experiences that challenge conventions
                            and redefine the boundaries between art and technology.
                        </p>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex justify-center">
                            <button className="group relative px-12 py-4 border border-gray-700 text-white font-light text-sm tracking-[0.1em] hover:border-white transition-all duration-500 overflow-hidden">
                                <span className="relative z-10">EXPLORE WORK</span>
                                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 tracking-[0.1em]">
                  EXPLORE WORK
                </span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-gray-500 text-xs font-light">
                    <div className="flex flex-col gap-1">
                        <span>01 / 04</span>
                        <span>INTRO</span>
                    </div>

                    <div className="text-center">
                        <div className="w-px h-12 bg-gray-700 mx-auto mb-2"></div>
                        <span>SCROLL</span>
                    </div>

                    <div className="flex flex-col gap-1 text-right">
                        <span>©2025</span>
                        <span>ALL RIGHTS RESERVED</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;