
import { Plus, Trash2 } from 'lucide-react';

const ApiKeys = () => {
  const apiKeys = [
    {
      key: 'sk-live●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●348e',
      created: '24/09/2024, 21:23:33'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
        <button className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
          Generate Key
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Your keys will allow you to authenticate API requests. A maximum of two keys can be used at the same time.{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">More Info</a>
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sandbox</span>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apiKeys.map((apiKey, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{apiKey.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.created}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiKeys;
