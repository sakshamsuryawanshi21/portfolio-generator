import React, { useEffect, useState } from 'react';

const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState([
    { name: '', role: '', image: '', quote: '' }
  ]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    (updated[index] as any)[field] = value;
    setTestimonials(updated);
  };

  const addTestimonial = () => {
    if (testimonials.length < 3) {
      setTestimonials([...testimonials, { name: '', role: '', image: '', quote: '' }]);
    }
  };

  const removeTestimonial = (index: number) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
  };

  return (
    <div>
      {testimonials.map((t, index) => (
        <div key={index} style={{ background: '#fffde7', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
          <label>Client Name</label>
          <input
            type="text"
            value={t.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            placeholder="John Doe"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />

          <label>Client Role</label>
          <input
            type="text"
            value={t.role}
            onChange={(e) => handleChange(index, 'role', e.target.value)}
            placeholder="CEO, ABC Corp"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />

          <label>Client Quote</label>
          <textarea
            value={t.quote}
            onChange={(e) => handleChange(index, 'quote', e.target.value)}
            placeholder="He delivered exceptional work!"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />

          <label>Image URL (optional)</label>
          <input
            type="text"
            value={t.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
            placeholder="https://..."
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />

          <button
            onClick={() => removeTestimonial(index)}
            style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Remove
          </button>
        </div>
      ))}

      {testimonials.length < 3 && (
        <button
          type="button"
          onClick={addTestimonial}
          style={{ padding: '0.5rem 1rem', background: '#fdd835', borderRadius: '8px', border: 'none' }}
        >
          Add Testimonial
        </button>
      )}
    </div>
  );
};

export default TestimonialSection;
