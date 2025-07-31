import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (template: string) => {
    localStorage.setItem('selectedTemplate', template);
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 font-sans text-center">
      <h1 className="text-4xl font-bold mb-2">
        Choose Your <span className="text-red-600">Template</span>
      </h1>
      <p className="text-gray-600 mb-10 text-sm">
        Select a professional template that best represents your style and customize it to your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Template 1 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg border border-gray-100">
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=1700/uploads/users/1631/posts/39588/image-upload/woman_hands_with_camera_working_on_laptop_at_table_2021_08_26_22_49_05_utc_copy.jpg"
            alt="Template 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h2 className="text-lg font-bold mb-1">Template 1</h2>
            <p className="text-sm text-gray-600 mb-3">
              Modern and clean design with yellow hero section and professional layout
            </p>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-800 mb-6 pl-1">
              <div className="flex items-center gap-1">🔴 Yellow Hero Section</div>
              <div className="flex items-center gap-1">🔴 Grid Portfolio</div>
              <div className="flex items-center gap-1">🔴 Testimonials Carousel</div>
              <div className="flex items-center gap-1">🔴 Contact Form</div>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                onClick={() => handleSelect('template1')}
              >
                Customize This Template <ArrowRight size={16} />
              </button>
              <button className="border border-yellow-500 text-yellow-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-yellow-50">
                <Eye size={16} /> Preview
              </button>
            </div>
          </div>
        </div>

        {/* Template 2 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg border border-gray-100">
          <img
            src="https://th.bing.com/th/id/OIP.xq_mr6uf_Equq4TUY7NTGwHaE7?w=235&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
            alt="Template 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-left">
            <h2 className="text-lg font-bold mb-1">Template 2</h2>
            <p className="text-sm text-gray-600 mb-3">
              Split-screen layout with timeline skills and masonry portfolio grid
            </p>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-800 mb-6 pl-1">
              <div className="flex items-center gap-1">🔴 Split Hero Layout</div>
              <div className="flex items-center gap-1">🔴 Masonry Portfolio</div>
              <div className="flex items-center gap-1">🔴 Timeline Skills</div>
              <div className="flex items-center gap-1">🔴 Blog Section</div>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
                onClick={() => handleSelect('template2')}
              >
                Customize This Template <ArrowRight size={16} />
              </button>
              <button className="border border-yellow-500 text-yellow-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-yellow-50">
                <Eye size={16} /> Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
