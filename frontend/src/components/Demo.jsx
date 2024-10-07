// components/Demo.jsx
import React from 'react';

const Demo = () => {
  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-lg mb-8">Check out our demo to see how it works!</p>
        <a href="/repos" className="bg-blue-500 text-white px-6 py-3 rounded">View Demo</a>
      </div>
    </section>
  );
};

export default Demo;
