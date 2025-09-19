import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "../constants";
import "../index.css";

const Navbar = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".sidebar",
      { x: -100 },
      {
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  });

  return (
    <aside className="fixed top-6 left-6 bottom-6 h-[90vh] z-50">
      {/* Sidebar container */}
      <nav
        className="sidebar group h-full flex flex-col items-start
                   bg-white/10 backdrop-blur-md border border-white/20
                   rounded-3xl py-6 px-4 transition-all duration-300
                   w-16 hover:w-56 shadow-lg"
      >
        {/* Logo / Title */}
        <a href="#home" className="flex items-center gap-3 mb-8">
          <img
            src="src\assets\Images\Logo.jpg"
            alt="logo"
            width={32}
            height={32}
          />
          <span className="hidden group-hover:block font-dark text-white font-bold text-lg whitespace-nowrap">
            DeepFake
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-6 text-white/80">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="flex items-center gap-3 font-dark hover:text-white transition-colors duration-200"
              >
                {/* Icons can go here */}
                <span className="hidden group-hover:block">{link.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
