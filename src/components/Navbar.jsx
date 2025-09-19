import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navLinks } from '../constants'; // We'll create this file next
import '../index.css'; // Ensure Tailwind CSS is imported

// ESSENTIAL SETUP: Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(() => {
        // This animation triggers once you scroll down a little bit
        // and reverses when you scroll back to the very top.
        gsap.to('nav', {
            // The scrollTrigger object controls when the animation fires
            scrollTrigger: {
                trigger: 'body', // The animation is triggered by the page scroll
                start: 'top -10%', // Starts when the page has scrolled 10% of the viewport height
                toggleActions: 'play none none reverse', // Plays on scroll down, reverses on scroll back up
            },
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Using rgba for transparency
            backdropFilter: 'blur(10px)', // The correct CSS property is 'backdropFilter'
            duration: 0.5, // A quicker, smoother animation duration
            ease: 'power1.inOut',
        });
    });

    return (
        // Use <header> for semantic HTML, fixed to the top of the viewport
        <header className="w-full py-4 fixed top-0 left-0 z-50">
            <nav className="w-full max-w-5xl mx-auto flex justify-between items-center px-6 py-3 rounded-full">
                {/* Logo and Brand Name */}
                <a href="#home" className="flex items-center gap-3">
                    <img src="/images/logo.png" alt="logo" width={32} height={32} />
                    <p className="text-white font-dark text-xl">Velvet Pour</p>
                </a>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className="text-gray-300 hover:text-white font-dark transition-colors duration-300"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;