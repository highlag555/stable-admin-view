import { Search, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    { id: '1', name: 'Ya-Chen Huang', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '2', name: 'Hakim Hettak', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '3', name: 'Karensa Fisher', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { id: '4', name: 'Ciro Felipe Rincon Yepez', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { id: '5', name: 'Simon Sibiya', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '6', name: 'Abhishek Singh', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '7', name: 'Ayasy El Qodri', dateAdded: '06/02/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '8', name: 'Wan Zulazmi', dateAdded: '06/02/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
    { id: '9', name: 'Ranjani Prasad', dateAdded: '06/01/25', type: 'Individual', status: 'Active' as const, tasks: null },
    { id: '10', name: 'Farjana Akter', dateAdded: '06/01/25', type: 'Individual', status: 'Needs action' as const, tasks: 1 },
  ];

  const handleTaskClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

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
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link 
                    to={`/customer/${customer.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.dateAdded}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.tasks && (
                    <div className="flex items-center">
                      <span className="text-yellow-600 font-medium mr-2">{customer.tasks}</span>
                      <button
                        onClick={() => handleTaskClick(customer)}
                        className="w-2 h-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer"
                        title="View verification tasks"
                      ></button>
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

      {/* Tasks Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-yellow-600" />
              Tasks blocking approval
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">Add customer details</div>
                  <div className="text-sm text-gray-600 mb-3">
                    Required information needed for US and SEPA verification
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Start task
                    </Button>
                    <Button variant="outline" size="sm">
                      Copy link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Complete these tasks to enable feature access for {selectedCustomer?.name}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
