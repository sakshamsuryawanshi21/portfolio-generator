import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TestimonialSection from '../components/FormSections/TestimonialSection';
import BlogSection from '../components/FormSections/BlogSection';
import ContactSection from '../components/FormSections/ContactSection';
import SkillsSectionForm from '../components/FormSections/SkillsSectionForm';

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get('id');

  const [currentTab, setCurrentTab] = useState('basic');

  const tabList = [
    { key: 'basic', label: 'Basic Details' },
    { key: 'hero', label: 'Header & Hero' },
    { key: 'about', label: 'About Section' },
    { key: 'skills', label: 'Skills' },
    { key: 'services', label: 'Services' },
    { key: 'projects', label: 'Products' },
    { key: 'testimonials', label: 'Clients & Testimonials' },
    { key: 'contact', label: 'Contact' },
    { key: 'footer', label: 'Footer' },
  ];

  const sectionKeys = tabList.map(t => t.key);

  const [formData, setFormData] = useState<any>({
    hero: { name: '', title: '', tagline: '', profileImage: '' },
    about: { bio: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    skills: '',
    services: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    projects: [
      { title: '', image: '', description: '' },
      { title: '', image: '', description: '' },
      { title: '', image: '', description: '' },
    ],
    testimonials: [],
    blog: {},
    contact: {},
    footer: '',
  });

  // Load existing data for edit
  useEffect(() => {
    if (editId) {
      const stored = JSON.parse(localStorage.getItem('profiles') || '[]');
      const existing = stored.find((p: any) => p.id.toString() === editId);
      if (existing) {
        setFormData({
          hero: existing.heroData,
          about: existing.aboutMe,
          skills: existing.skills.join(', '),
          services: existing.services,
          projects: existing.projects,
          testimonials: existing.testimonials,
          blog: existing.blog,
          contact: existing.contact,
          footer: existing.footer,
        });
      }
    }
  }, [editId]);

  const handleNextTab = () => {
    const currentIndex = sectionKeys.indexOf(currentTab);
    if (currentIndex < sectionKeys.length - 1) {
      setCurrentTab(sectionKeys[currentIndex + 1]);
    } else {
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      const newProfile = {
        id: editId ? parseInt(editId) : Date.now(),
        heroData: formData.hero,
        aboutMe: formData.about,
        skills: formData.skills.split(',').map((s: string) => s.trim()),
        services: formData.services,
        projects: formData.projects,
        testimonials: formData.testimonials,
        blog: formData.blog,
        contact: formData.contact,
        footer: formData.footer,
        template: localStorage.getItem('selectedTemplate') || 'template1',
      };

      const updatedProfiles = editId
        ? profiles.map((p: any) => (p.id.toString() === editId ? newProfile : p))
        : [...profiles, newProfile];

      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      navigate('/profiles');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex flex-wrap gap-3 mb-8">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              currentTab === tab.key
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentTab === 'basic' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Basic Company Details</h2>
          <input type="text" placeholder="Company Name" className="w-full border px-3 py-2 rounded" />
          <input type="text" placeholder="Your Name" className="w-full border px-3 py-2 rounded" />
          <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
          <input type="tel" placeholder="Phone" className="w-full border px-3 py-2 rounded" />
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'hero' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Header & Hero Section</h2>
          <input type="text" placeholder="Name" value={formData.hero.name} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, name: e.target.value } })} className="w-full border px-3 py-2 rounded" />
          <input type="text" placeholder="Title" value={formData.hero.title} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })} className="w-full border px-3 py-2 rounded" />
          <input type="text" placeholder="Tagline" value={formData.hero.tagline} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, tagline: e.target.value } })} className="w-full border px-3 py-2 rounded" />
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, hero: { ...formData.hero, profileImage: reader.result as string } });
              };
              reader.readAsDataURL(file);
            }
          }} className="w-full border px-3 py-2 rounded" />
          {formData.hero.profileImage && <img src={formData.hero.profileImage} alt="preview" className="w-24 h-24 rounded-full mt-2" />}
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'about' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">About Section</h2>
          <textarea value={formData.about.bio} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, bio: e.target.value } })} placeholder="Short bio" className="w-full border px-3 py-2 rounded" />
          <input value={formData.about.location} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, location: e.target.value } })} placeholder="Location" className="w-full border px-3 py-2 rounded" />
          <input value={formData.about.linkedin} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, linkedin: e.target.value } })} placeholder="LinkedIn URL" className="w-full border px-3 py-2 rounded" />
          <input value={formData.about.github} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, github: e.target.value } })} placeholder="GitHub URL" className="w-full border px-3 py-2 rounded" />
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'skills' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <SkillsSectionForm
            skills={formData.skills}
            onChange={(skillsArray: string[]) =>
              setFormData({ ...formData, skills: skillsArray.join(', ') })
            }
          />
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'services' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Services</h2>
          {formData.services.map((service: any, index: number) => (
            <div key={index} className="space-y-2">
              <input value={service.title} onChange={(e) => {
                const updated = [...formData.services];
                updated[index].title = e.target.value;
                setFormData({ ...formData, services: updated });
              }} placeholder={`Service ${index + 1} Title`} className="w-full border px-3 py-2 rounded" />
              <textarea value={service.description} onChange={(e) => {
                const updated = [...formData.services];
                updated[index].description = e.target.value;
                setFormData({ ...formData, services: updated });
              }} placeholder={`Service ${index + 1} Description`} className="w-full border px-3 py-2 rounded" />
            </div>
          ))}
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'projects' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Products / Projects</h2>
          {formData.projects.map((project: any, index: number) => (
            <div key={index} className="space-y-2">
              <input value={project.title} onChange={(e) => {
                const updated = [...formData.projects];
                updated[index].title = e.target.value;
                setFormData({ ...formData, projects: updated });
              }} placeholder={`Project ${index + 1} Title`} className="w-full border px-3 py-2 rounded" />
              <input value={project.image} onChange={(e) => {
                const updated = [...formData.projects];
                updated[index].image = e.target.value;
                setFormData({ ...formData, projects: updated });
              }} placeholder="Image URL" className="w-full border px-3 py-2 rounded" />
              <textarea value={project.description} onChange={(e) => {
                const updated = [...formData.projects];
                updated[index].description = e.target.value;
                setFormData({ ...formData, projects: updated });
              }} placeholder="Project Description" className="w-full border px-3 py-2 rounded" />
            </div>
          ))}
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'testimonials' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Clients & Testimonials</h2>
          <TestimonialSection />
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'contact' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Contact</h2>
          <ContactSection />
          <button onClick={handleNextTab} className="mt-4 bg-black text-white px-4 py-2 rounded">Save & Continue</button>
        </div>
      )}

      {currentTab === 'footer' && (
        <div className="bg-white shadow p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Footer</h2>
          <input type="text" placeholder="Footer Text (e.g. © 2025 Your Name)" className="w-full border px-3 py-2 rounded" onChange={(e) => setFormData({ ...formData, footer: e.target.value })} />
          <button onClick={handleNextTab} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Save & Finish</button>
        </div>
      )}
    </div>
  );
};

export default FormPage;
