
import { Search, Plus } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const Payments = () => {
  const payments = [
    {
      date: 'Jun 1, 2025',
      customer: 'Maria Michaela Jazmines',
      email: 'mikea.jazmines@gmail.com',
      id: '1328ee72-669c-4cc4-890a-f7137b0ab52b',
      status: 'Payment Processed' as const,
      amount: '$100.75 USD',
      type: 'Off-Ramp',
      transactionId: 'bf61f29f-91da-4...',
      currency: 'USDC (Poly) → USD (ACH)',
      bankName: 'Community Federal Savings Bank',
      accountInfo: '****5025, 026073150, 101019646682214'
    },
    {
      date: 'May 31, 2025',
      customer: 'Jesse Smythe',
      email: 'jesse@activedigital.fund',
      id: '0d0270c6-3a5a-4c1c-863b-18e99fbc162d',
      status: 'Payment Processed' as const,
      amount: '$10,000.23 USD',
      type: 'Off-Ramp',
      transactionId: 'ff14e17b-0e36-4...',
      currency: 'USDC (Poly) → EUR (Sepa)',
      bankName: 'Revolut Bank UAB',
      accountInfo: '****2513, REVOFFRP2'
    },
    {
      date: 'May 27, 2025',
      customer: 'Jesse Smythe',
      email: 'jesse@activedigital.fund',
      id: '0d0270c6-3a5a-4c1c-863b-18e99fbc162d',
      status: 'Payment Processed' as const,
      amount: '$57.45 USD',
      type: 'Off-Ramp',
      transactionId: '1b09bf45-1eed-4...',
      currency: 'USDC (Poly) → EUR (Sepa)',
      bankName: 'Revolut Bank UAB',
      accountInfo: '****2513, REVOFFRP2'
    },
    {
      date: 'May 26, 2025',
      customer: 'Eyal Sandroussi',
      email: 'yalouah23@outlook.com',
      id: '83b1ebb8-7bf2-44f2-a69a-e2110b3c1341',
      status: 'Payment Processed' as const,
      amount: '€116.82 EUR',
      type: 'On-Ramp',
      transactionId: '26fa90ec-de23-4...',
      currency: 'EUR (Sepa) → USDC (Poly)',
      bankName: 'MODRIE22XXX',
      accountInfo: 'a2d2d3cb-ed81-4a91-96f6-dda0f42b0e12'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <button className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Create payment
        </button>
      </div>

      <div className="flex space-x-6 mb-6">
        <button className="text-blue-600 border-b-2 border-blue-600 pb-2 text-sm font-medium">History</button>
        <button className="text-gray-500 pb-2 text-sm hover:text-gray-700">Liquidation Addresses</button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search all transactions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                    <div className="text-sm text-gray-500">{payment.email}</div>
                    <div className="text-xs text-gray-400 font-mono">{payment.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-xs text-gray-500">Transaction ID:</div>
                    <div className="text-xs font-mono text-gray-600">{payment.transactionId}</div>
                    <div className="text-xs text-gray-500 mt-1">Currency:</div>
                    <div className="text-xs text-gray-600">{payment.currency}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-xs text-gray-500">Bank name:</div>
                    <div className="text-xs text-gray-600">{payment.bankName}</div>
                    <div className="text-xs text-gray-400 mt-1">{payment.accountInfo}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        <button className="text-gray-400 text-sm">< Previous</button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 text-sm rounded ${
              page === 1 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="text-gray-900 text-sm font-medium">Next ></button>
      </div>
    </div>
  );
};

export default Payments;
