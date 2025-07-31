import React from 'react';

interface Service {
  title: string;
  description: string;
}

interface Profile {
  services: Service[];
}

interface Props {
  profile: Profile;
}

const ServicesSection: React.FC<Props> = ({ profile }) => {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">My Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {profile.services.map((service: Service, i: number) => (
          <div
            key={i}
            className="bg-yellow-300 text-black rounded-xl p-6 shadow-md border border-yellow-400 hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-lg font-bold mb-2">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
