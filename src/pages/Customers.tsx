
import { Search, Plus } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const Customers = () => {
  const customers = [
    { name: 'Ya-Chen Huang', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Hakim Hettak', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Karensa Fisher', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { name: 'Ciro Felipe Rincon Yepez', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { name: 'Simon Sibiya', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Abhishek Singh', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Ayasy El Qodri', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Wan Zulazmi', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { name: 'Ranjani Prasad', dateAdded: '06/01/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { name: 'Farjana Akter', dateAdded: '06/01/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <button className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Create customer
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search all customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Individual</option>
            <option>Business</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Needs action</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date added</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.dateAdded}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.tasks && (
                    <div className="flex items-center">
                      <span className="text-yellow-600 font-medium">{customer.tasks}</span>
                      <span className="ml-1 text-yellow-500">⭐</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="text-gray-400 text-sm">← Previous</button>
        <button className="text-gray-900 text-sm font-medium">Next →</button>
      </div>
    </div>
  );
};

export default Customers;
