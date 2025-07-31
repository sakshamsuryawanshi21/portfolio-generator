import React, { useEffect, useState } from 'react';

const ContactSection: React.FC = () => {
  const [contact, setContact] = useState({
    message: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contact));
  }, [contact]);

  return (
    <div style={{ background: '#fffde7', padding: '1rem', borderRadius: '10px' }}>
      <label>Message Text</label>
      <textarea
        value={contact.message}
        onChange={(e) => setContact({ ...contact, message: e.target.value })}
        placeholder="Feel free to reach out to me!"
        style={{ width: '100%', marginBottom: '1rem' }}
        rows={3}
      />

      <label>Contact Email</label>
      <input
        type="email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        placeholder="your@email.com"
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Phone Number</label>
      <input
        type="tel"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        placeholder="+91 98765 43210"
        style={{ width: '100%', marginBottom: '1rem' }}
      />
    </div>
  );
};

export default ContactSection;
