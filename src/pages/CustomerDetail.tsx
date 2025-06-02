
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Info } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { Button } from '../components/ui/button';

const CustomerDetail = () => {
  const { id } = useParams();
  
  // Mock customer data - in a real app this would come from an API
  const customers = [
    {
      id: '1',
      name: 'Ya-Chen Huang',
      type: 'Individual',
      status: 'Active' as const,
      dateCreated: '06/02/25',
      customerId: '2d5f6399-31db-4092-8a76-02d1512162e4',
      firstName: 'Ya-Chen Huang',
      lastName: 'Huang',
      email: 'spacemozzarella@gmail.com',
      tasks: null,
      featureAccess: {
        us: 'Granted',
        sepa: 'Granted',
        cardProcessing: 'Granted',
        card: 'Granted'
      }
    },
    {
      id: '3',
      name: 'Karensa Fisher',
      type: 'Individual',
      status: 'Needs action' as const,
      dateCreated: '06/02/25',
      customerId: '095c0013-ef79-4354-8b10-e6aedf353b3',
      firstName: 'Karensa Fisher',
      lastName: 'Fisher',
      email: 'karensamclean@gmail.com',
      tasks: 1,
      featureAccess: {
        us: 'Pending tasks',
        sepa: 'Pending tasks',
        cardProcessing: 'Pending tasks',
        card: 'Pending tasks'
      }
    }
  ];

  const customer = customers.find(c => c.id === id) || customers[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back navigation */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          All Customers
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
          <StatusBadge status={customer.status} />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{customer.type}</span>
          <span>•</span>
          <span>Created {customer.dateCreated}</span>
          <span>•</span>
          <span className="font-mono">{customer.customerId}</span>
          <button
            onClick={() => copyToClipboard(customer.customerId)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tasks section - only show for customers with pending tasks */}
      {customer.tasks && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tasks ({customer.tasks})</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center mr-3">
                  <Info className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Add customer details</div>
                  <div className="text-sm text-gray-500">Needed for US and SEPA</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Start</Button>
                <Button variant="outline" size="sm">Copy link</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature access section - updated with new items */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Feature access</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-900">US</div>
                <div className="text-sm text-gray-500">Enables US ACH and wire transactions</div>
              </div>
              <div className="flex items-center">
                {customer.featureAccess.us === 'Granted' ? (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-medium mr-2">Granted</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm font-medium mr-2">Pending tasks</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-900">SEPA</div>
                <div className="text-sm text-gray-500">Enables EU-based transactions</div>
              </div>
              <div className="flex items-center">
                {customer.featureAccess.sepa === 'Granted' ? (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-medium mr-2">Granted</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm font-medium mr-2">Pending tasks</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-900">Card Processing</div>
                <div className="text-sm text-gray-500">Enables on/off ramps for card transactions</div>
              </div>
              <div className="flex items-center">
                {customer.featureAccess.cardProcessing === 'Granted' ? (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-medium mr-2">Granted</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm font-medium mr-2">Pending tasks</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-900">Card</div>
                <div className="text-sm text-gray-500">Enables card spending capabilities</div>
              </div>
              <div className="flex items-center">
                {customer.featureAccess.card === 'Granted' ? (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-medium mr-2">Granted</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm font-medium mr-2">Pending tasks</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Details</h2>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="text-sm font-medium text-gray-500">First Name</div>
              <div className="text-sm text-gray-900">{customer.firstName}</div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="text-sm font-medium text-gray-500">Last Name</div>
              <div className="text-sm text-gray-900">{customer.lastName}</div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="text-sm font-medium text-gray-500">Email Address</div>
              <div className="text-sm text-gray-900">{customer.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
