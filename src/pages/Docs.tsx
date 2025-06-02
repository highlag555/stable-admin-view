
import { ExternalLink, BookOpen, Code, Zap } from 'lucide-react';

const Docs = () => {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Quick start guide to integrate with Stables API',
      icon: Zap,
      link: '#'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      icon: Code,
      link: '#'
    },
    {
      title: 'Guides & Tutorials',
      description: 'Step-by-step guides for common use cases',
      icon: BookOpen,
      link: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600 text-lg mt-2">Everything you need to integrate with Stables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <a href={section.link} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                Learn more
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
          Contact Support
          <ExternalLink className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Docs;
