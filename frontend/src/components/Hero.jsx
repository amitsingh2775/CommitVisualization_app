// components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Visualize Your Git Commits</h2>
        <p className="text-xl mb-8">Track your code changes effortlessly with our visualization tool.</p>
        <a href="/repos" className="bg-blue-500 text-white px-6 py-3 rounded">Get Started</a>
      </div>
    </section>
  );
};

export default Hero;
