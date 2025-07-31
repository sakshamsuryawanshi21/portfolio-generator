import React, { useEffect, useState } from 'react';

const BlogSection: React.FC = () => {
  const [blog, setBlog] = useState({
    title: '',
    summary: ''
  });

  useEffect(() => {
    localStorage.setItem('blog', JSON.stringify(blog));
  }, [blog]);

  return (
    <div style={{ background: '#fffde7', padding: '1rem', borderRadius: '10px' }}>
      <label>Blog Title</label>
      <input
        type="text"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        placeholder="e.g. My Developer Journey"
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Blog Summary</label>
      <textarea
        value={blog.summary}
        onChange={(e) => setBlog({ ...blog, summary: e.target.value })}
        placeholder="Short summary or excerpt from your blog..."
        style={{ width: '100%', marginBottom: '1rem' }}
        rows={4}
      />
    </div>
  );
};

export default BlogSection;
