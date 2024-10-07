// components/Features.jsx
import React from 'react';

const features = [
  { title: 'Easy Integration', description: 'Seamlessly integrates with your Git repositories.' },
  { title: 'Interactive Graphs', description: 'Visualize your commits with interactive graphs.' },
  { title: 'Real-Time Data', description: 'Get real-time updates on your repository activities.' },
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
