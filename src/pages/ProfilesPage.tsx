import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number;
  heroData: {
    name: string;
    title: string;
    tagline: string;
    profileImage: string;
  };
  aboutMe: {
    bio: string;
  };
  skills: string[];
  rating?: number; // Optional: for dynamic stars
}

const ProfilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('profiles') || '[]');
    setProfiles(stored);
  }, []);

  const handleView = (id: number) => {
    navigate(`/portfolio/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/form?id=${String(id)}`);
  };

  const handleDelete = (id: number) => {
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    localStorage.setItem('profiles', JSON.stringify(updated));
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.heroData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.heroData.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSkill =
      !skillFilter ||
      profile.skills.some((skill) =>
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      );

    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Meet Our Professionals
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded border w-64"
        />
        <input
          type="text"
          placeholder="Filter by skill (e.g. React)"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="px-4 py-2 rounded border w-64"
        />
      </div>

      {/* Profile Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-yellow-300 border-2 border-yellow-400 p-6 rounded-2xl shadow hover:scale-[1.01] transition-transform"
          >
            <img
              src={
                profile.heroData.profileImage || 'https://via.placeholder.com/100'
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center">
              {profile.heroData.name}
            </h2>
            <p className="text-sm text-center italic text-gray-700">
              {profile.heroData.title}
            </p>

            {/* ⭐ Star Rating */}
            <div className="flex justify-center mt-1 text-yellow-500">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09L5.5 12 1 7.91l6.06-.88L10 2l2.94 5.03 6.06.88L14.5 12l1.378 6.09z" />
                </svg>
              ))}
            </div>

            {/* ✅ If using dynamic rating, replace the above block with this:
            <div className="flex justify-center mt-1 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < (profile.rating || 4)
                      ? 'fill-yellow-500'
                      : 'fill-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09L5.5 12 1 7.91l6.06-.88L10 2l2.94 5.03 6.06.88L14.5 12l1.378 6.09z" />
                </svg>
              ))}
            </div> 
            */}

            <p className="text-sm mt-2 text-center text-gray-600">
              {profile.aboutMe.bio?.slice(0, 100)}...
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {profile.skills.slice(0, 5).map((skill, i) => (
                <span
                  key={i}
                  className="bg-black text-white text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handleView(profile.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                View Portfolio
              </button>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                onClick={() => handleEdit(profile.id)}
              >
                Edit
              </button>
              <button
                className="text-sm px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-900"
                onClick={() => handleDelete(profile.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <p className="text-center mt-10 text-gray-600">No profiles found.</p>
      )}
    </div>
  );
};

export default ProfilesPage;
