// components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';

const LandingPage = () => {
  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#FEF4F4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#2E2828] text-[#FEF4F4]">
      <Particles options={particlesOptions} />
      <div className="relative z-10 text-center p-5">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown">
          Welcome to Commit Visualization Tool
        </h1>
        <p className="text-lg mb-6 animate__animated animate__fadeInUp">
          Visualize your git commits effortlessly and track your code changes.
        </p>
        <Link
          to="/login"
          className="bg-[#580EF6] text-white px-8 py-4 rounded shadow hover:bg-[#6A1B9A] transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
