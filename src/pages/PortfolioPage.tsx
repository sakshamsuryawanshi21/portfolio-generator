import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PortfolioPage: React.FC = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [template, setTemplate] = useState('template1');

  useEffect(() => {
    const selectedTemplate = localStorage.getItem('selectedTemplate') || 'template1';
    setTemplate(selectedTemplate);

    const stored = JSON.parse(localStorage.getItem('profiles') || '[]');
    const selected = stored.find((p: any) => p.id.toString() === id);
    setProfile(selected);
  }, [id]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (!profile) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="font-sans relative">
      {/* Nav */}
      <div className="flex justify-center gap-3 bg-yellow-100 py-4 sticky top-0 z-50 shadow">
        {['about', 'skills', 'services', 'projects', 'testimonials', 'blog', 'contact'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="bg-white px-4 py-2 rounded shadow text-sm font-medium hover:bg-yellow-200"
          >
            {section[0].toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      {/* Hero */}
      <section className="bg-yellow-300 text-center py-10">
        <img
          src={profile.heroData.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
        />
        <h1 className="text-2xl font-bold mt-2">{profile.heroData.name}</h1>
        <p className="text-gray-700">{profile.heroData.title}</p>
        <p className="italic text-gray-600">{profile.heroData.tagline}</p>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-10 bg-white max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-4">About Me</h2>
        <p className="mb-2">{profile.aboutMe?.bio}</p>
        <p>Email: {profile.aboutMe?.email}</p>
        <p>Phone: {profile.aboutMe?.phone}</p>
        <p>Location: {profile.aboutMe?.location}</p>
        <div className="mt-2 space-x-3">
          {profile.aboutMe?.linkedin && <a href={profile.aboutMe.linkedin} target="_blank" className="text-blue-600 underline">LinkedIn</a>}
          {profile.aboutMe?.github && <a href={profile.aboutMe.github} target="_blank" className="text-blue-600 underline">GitHub</a>}
        </div>
      </section>

     {/* Skills Section with Progress Bars */}
<section id="skills" className="py-10 bg-gray-50 px-6 max-w-4xl mx-auto my-8">
  <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">My Skills</h2>
  <div className="space-y-5">
    {(profile.skills || []).map((skill: string, index: number) => {
      const [name, level] = skill.split(':'); // Example format: "React:85"
      const percentage = parseInt(level || '80');

      return (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-900">{name.trim()}</span>
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
</section>


      {/* Services */}
      <section id="services" className="px-6 py-10 bg-white max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-4">Services</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {profile.services?.map((srv: any, i: number) => (
            <div key={i} className="bg-yellow-100 p-4 rounded-lg shadow">
              <h3 className="font-semibold">{srv.title}</h3>
              <p className="text-sm">{srv.description}</p>
            </div>
          ))}
        </div>
      </section>
  
  {/* Project */}
    <section id="projects" className="px-6 py-10 bg-gray-100 max-w-6xl mx-auto">
  <h2 className="text-xl font-bold text-red-600 mb-4">My Projects</h2>
  <div className="grid md:grid-cols-3 gap-4">
    {(profile.projects || []).map((proj: any, i: number) => (
      <div key={i} className="bg-white shadow p-4 rounded-lg">
        <img
          src={proj.image || 'https://via.placeholder.com/150'}
          alt={proj.title}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h3 className="font-semibold">{proj.title}</h3>
        <p className="text-sm">{proj.description}</p>
      </div>
    ))}
  </div>
</section>


{/* Testimonials Section */}
<section id="testimonials" className="px-6 py-10 bg-white max-w-4xl mx-auto">
  <h2 className="text-xl font-bold text-red-600 mb-4">What Clients Say</h2>
  <div className="space-y-4">
    {(profile.testimonials || []).map((t: any, i: number) => (
      <div key={i} className="bg-yellow-100 p-4 rounded shadow flex items-center gap-4">
        <img
          src={t.image || 'https://via.placeholder.com/50'}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="italic text-sm">“{t.message}”</p>
          <p className="font-semibold mt-1">— {t.name}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Blog */}
      {Array.isArray(profile.blog) && (
        <section id="blog" className="py-10 text-center bg-gray-50">
          <h2 className="text-xl font-bold text-red-600 mb-4">Blog</h2>
          <div className="grid md:grid-cols-2 gap-4 px-4">
            {profile.blog.map((b: any, i: number) => (
              <div key={i} className="bg-yellow-100 p-4 rounded shadow">
                <h3 className="font-bold mb-1">{b.title}</h3>
                <p className="text-sm">{b.summary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

     {/* Contact Section */}
<section id="contact" className="px-6 py-10 text-center bg-white">
  <h2 className="text-xl font-bold text-red-600 mb-4">Contact</h2>
  <p>Email: {profile.contact?.email || profile.aboutMe?.email}</p>
  <p>Phone: {profile.contact?.phone || profile.aboutMe?.phone}</p>
  <p>Message: {profile.contact?.message || 'Feel free to reach out!'}</p>
</section>

    </div>
  );
};

export default PortfolioPage;
