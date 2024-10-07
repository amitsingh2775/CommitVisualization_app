// components/Testimonials.jsx
import React from 'react';

const testimonials = [
  { name: 'John Doe', feedback: 'This tool changed the way I visualize my work!' },
  { name: 'Jane Smith', feedback: 'A must-have for any developer working with Git.' },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <p className="italic">"{testimonial.feedback}"</p>
              <p className="font-bold mt-4">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
