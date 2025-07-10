import { Search, Plus, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const Customers = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customerType, setCustomerType] = useState<'Individual' | 'Business'>('Individual');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [sepaEndorsement, setSepaEndorsement] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [customers, setCustomers] = useState([
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
  ]);

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const handleTaskClick = (e: React.MouseEvent, customer: any) => {
    e.stopPropagation();
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleRowClick = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

  const handleCreateCustomer = () => {
    // Create new customer object with identity verification task
    const newCustomer = {
      id: (customers.length + 1).toString(),
      name: customerName,
      dateAdded: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
      }),
      type: customerType,
      status: 'Needs action' as const,
      tasks: 1
    };

    // Add customer to the list
    setCustomers(prevCustomers => [newCustomer, ...prevCustomers]);
    
    // Reset form and close modal
    setCustomerName('');
    setCustomerEmail('');
    setCustomerType('Individual');
    setSepaEndorsement(false);
    setIsCreateModalOpen(false);
  };

  const handleCancelCreate = () => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerType('Individual');
    setSepaEndorsement(false);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200"
          style={{ backgroundColor: '#4941EC' }}
        >
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
            {currentCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => handleRowClick(customer.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.name}
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
                        onClick={(e) => handleTaskClick(e, customer)}
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

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button className="text-gray-400 text-sm">← Previous</button>
        <button className="text-gray-900 text-sm font-medium">Next →</button>
      </div>

      {/* Create Customer Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create customer</DialogTitle>
            <p className="text-sm text-gray-600 mt-1">All fields are required.</p>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="text-base font-medium">
                Customer or business name
              </Label>
              <Input
                id="customer-name"
                placeholder="i.e. John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-email" className="text-base font-medium">
                Email address
              </Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="xxxxxx@xxxx.xxx"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">
                  Request SEPA/SWIFT endorsement
                </Label>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center text-xs">?</span>
                  <Switch
                    checked={sepaEndorsement}
                    onCheckedChange={setSepaEndorsement}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Type</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCustomerType('Individual')}
                  className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
                    customerType === 'Individual'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerType('Business')}
                  className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
                    customerType === 'Business'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Business
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleCancelCreate}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCustomer}
                disabled={!customerName || !customerEmail}
                className="flex-1 text-white"
                style={{ backgroundColor: '#4941EC' }}
              >
                Create customer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
