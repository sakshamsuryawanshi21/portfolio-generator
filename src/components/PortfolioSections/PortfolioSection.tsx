import React from 'react';

interface Project {
  title: string;
  image: string;
  description: string;
}

interface Profile {
  projects: Project[];
}

interface Props {
  profile: Profile;
}

const PortfolioSection: React.FC<Props> = ({ profile }) => {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8 text-red-600">My Portfolio</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {profile.projects.map((project: Project, i: number) => (
          <div
            key={i}
            className="bg-yellow-200 rounded-xl overflow-hidden shadow-md border border-yellow-400 hover:scale-[1.02] transition-transform"
          >
            <img
              src={project.image || 'https://via.placeholder.com/400x200'}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-2">{project.title}</h3>
              <p className="text-sm text-gray-800">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
