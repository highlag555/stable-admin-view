import { Search, Plus, MoreHorizontal, Copy } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

const Payments = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('history');
  const [paymentType, setPaymentType] = useState<string>('');
  const [customerId, setCustomerId] = useState('');
  const [sourcePaymentRail, setSourcePaymentRail] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [sourceBlockchain, setSourceBlockchain] = useState('');
  const [amount, setAmount] = useState('');
  const [developerFee, setDeveloperFee] = useState('');
  const [destinationPaymentRail, setDestinationPaymentRail] = useState('');
  const [destinationBlockchain, setDestinationBlockchain] = useState('');
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [destinationWalletAddress, setDestinationWalletAddress] = useState('');
  const [returnWalletAddress, setReturnWalletAddress] = useState('');
  const [memo, setMemo] = useState('');

  const topBlockchains = [
    { name: 'Ethereum', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'Bitcoin', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'Binance Smart Chain', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'Polygon', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' },
    { name: 'Avalanche', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'Solana', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'Cardano', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'Polkadot', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' },
    { name: 'Chainlink', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'Litecoin', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'Stellar', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'Cosmos', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' },
    { name: 'Algorand', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'Tron', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'Near Protocol', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'Fantom', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' },
    { name: 'Harmony', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'Arbitrum', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'Optimism', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'Cronos', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' }
  ];

  const topStablecoins = [
    { name: 'USDC', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' },
    { name: 'USDT', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop&crop=center' },
    { name: 'DAI', logo: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=24&h=24&fit=crop&crop=center' },
    { name: 'BUSD', logo: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=24&h=24&fit=crop&crop=center' },
    { name: 'FRAX', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=24&h=24&fit=crop&crop=center' }
  ];

  const globalCurrencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'SEK',
    'NZD',
    'MXN',
    'SGD',
    'HKD',
    'NOK',
    'TRY',
    'ZAR',
    'BRL',
    'INR',
    'KRW',
    'PLN'
  ];

  // Blockchains that require memo fields
  const blockchainsRequiringMemo = ['Stellar', 'Cosmos', 'Algorand'];

  // Check if the selected destination blockchain requires a memo
  const shouldShowMemo = paymentType === 'crypto-to-crypto' && 
    blockchainsRequiringMemo.includes(destinationPaymentRail);

  // Check if we should show global currencies for source currency
  const shouldShowGlobalCurrencies = (paymentType === 'on-ramp' || paymentType === 'off-ramp') && 
    ['bank-transfer', 'card', 'mobile-wallet'].includes(sourcePaymentRail);

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

  const liquidationAddresses = [
    {
      date: 'Jan 21, 2025',
      customer: 'Stables Europe Spolka z ograniczona Odpowiedzialnoscia',
      email: 'team@stables.money',
      id: '69661421-b545-4a34-9a01-fffe68d828e0',
      status: 'active' as const,
      asset: 'USDC on Polygon',
      bankName: 'UNICREDIT SPA',
      accountInfo: '****0973',
      payoutMethod: 'Sepa',
      address: '0x938e9e4b586726cc380e6bcd00ab3e64a83d331b'
    },
    {
      date: 'Dec 10, 2024',
      customer: 'Stables.Money',
      email: 'bernardo@stables.money',
      id: 'bd9c9663-9228-41b1-9b25-762de72199a7',
      status: 'active' as const,
      asset: 'USDC on Polygon',
      bankName: 'Community Federal Savings Bank',
      accountInfo: '****8065',
      payoutMethod: 'ACH',
      address: '0xd82f2fe54a38cb1a35eb3cb6e309445e6323d2b1'
    },
    {
      date: 'Dec 10, 2024',
      customer: 'Stables.Money',
      email: 'bernardo@stables.money',
      id: 'bd9c9663-9228-41b1-9b25-762de72199a7',
      status: 'active' as const,
      asset: 'USDC on Ethereum',
      bankName: 'Community Federal Savings Bank',
      accountInfo: '****8065',
      payoutMethod: 'ACH',
      address: '0x627c214c26a316e3cbfa76cd04f156623f97bf64'
    },
    {
      date: 'Nov 4, 2024',
      customer: 'Stables.Money',
      email: 'bernardo@stables.money',
      id: 'bd9c9663-9228-41b1-9b25-762de72199a7',
      status: 'active' as const,
      asset: 'USDT on Ethereum',
      bankName: 'Polygon Address: 0x...4ab5',
      accountInfo: '',
      payoutMethod: 'Polygon',
      address: '0xba418a7ebfe1c3fa76633855ec3333d2764f61da'
    },
    {
      date: 'Oct 28, 2024',
      customer: 'Stables.Money',
      email: 'bernardo@stables.money',
      id: 'bd9c9663-9228-41b1-9b25-762de72199a7',
      status: 'active' as const,
      asset: 'USDC on Solana',
      bankName: 'Choice Financial Group',
      accountInfo: '****6179',
      payoutMethod: 'ACH',
      address: '61f1xqGLYha4e1TaYo5xL3XsBbWmAzteHNv7okdKvfsh'
    }
  ];

  // Pagination logic
  const itemsPerPage = 10;
  const currentData = activeTab === 'history' ? payments : liquidationAddresses;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  const handleCreatePayment = () => {
    console.log('Creating payment:', {
      paymentType,
      customerId,
      sourcePaymentRail,
      sourceCurrency,
      sourceBlockchain,
      amount,
      developerFee,
      destinationPaymentRail,
      destinationBlockchain,
      destinationCurrency,
      destinationWalletAddress,
      returnWalletAddress,
      memo
    });
    
    // Reset form and close modal
    setPaymentType('');
    setCustomerId('');
    setSourcePaymentRail('');
    setSourceCurrency('');
    setSourceBlockchain('');
    setAmount('');
    setDeveloperFee('');
    setDestinationPaymentRail('');
    setDestinationBlockchain('');
    setDestinationCurrency('');
    setDestinationWalletAddress('');
    setReturnWalletAddress('');
    setMemo('');
    setIsCreateModalOpen(false);
  };

  const handleCancelCreate = () => {
    setPaymentType('');
    setCustomerId('');
    setSourcePaymentRail('');
    setSourceCurrency('');
    setSourceBlockchain('');
    setAmount('');
    setDeveloperFee('');
    setDestinationPaymentRail('');
    setDestinationBlockchain('');
    setDestinationCurrency('');
    setDestinationWalletAddress('');
    setReturnWalletAddress('');
    setMemo('');
    setIsCreateModalOpen(false);
  };

  const getAssetLogo = (asset: string) => {
    if (asset.includes('USDC')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&h=20&fit=crop&crop=center';
    }
    if (asset.includes('USDT')) {
      return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=20&h=20&fit=crop&crop=center';
    }
    return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=20&h=20&fit=crop&crop=center';
  };

  const getChainLogo = (asset: string) => {
    if (asset.includes('Polygon')) {
      return 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=20&h=20&fit=crop&crop=center';
    }
    if (asset.includes('Ethereum')) {
      return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&h=20&fit=crop&crop=center';
    }
    if (asset.includes('Solana')) {
      return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=20&h=20&fit=crop&crop=center';
    }
    return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=20&h=20&fit=crop&crop=center';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200"
          style={{ backgroundColor: '#4941EC' }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create payment
        </button>
      </div>

      <div className="flex space-x-6 mb-6">
        <button 
          onClick={() => handleTabChange('history')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'history' 
              ? 'border-gray-900 text-gray-900' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          History
        </button>
        <button 
          onClick={() => handleTabChange('liquidation')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'liquidation' 
              ? 'border-gray-900 text-gray-900' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Liquidation Addresses
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={activeTab === 'history' ? "Search all transactions..." : "Search all liquidation addresses..."}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {activeTab === 'history' ? (
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
              {currentItems.map((payment, index) => (
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
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date ↓</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank/Wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((address, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.date}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{address.customer}</div>
                      <div className="text-sm text-gray-500">{address.email}</div>
                      <div className="text-xs text-gray-400 font-mono">{address.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {address.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <img 
                          src={getAssetLogo(address.asset)} 
                          alt="Asset logo" 
                          className="w-5 h-5 rounded-full"
                        />
                        <img 
                          src={getChainLogo(address.asset)} 
                          alt="Chain logo" 
                          className="w-5 h-5 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-900">{address.asset}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{address.bankName}</div>
                      {address.accountInfo && (
                        <div className="text-xs text-gray-500">{address.accountInfo}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.payoutMethod}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-gray-600">{address.address}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit address</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
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
                      handlePageChange(page);
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
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Create Payment Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {paymentType === 'crypto-to-crypto' ? 'Create crypto to crypto' : 'Create on-ramp'}
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">All fields are required.</p>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="payment-type" className="text-base font-medium">
                Payment Type
              </Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-ramp">On-Ramp</SelectItem>
                  <SelectItem value="off-ramp">Off-Ramp</SelectItem>
                  <SelectItem value="crypto-to-crypto">Crypto to Crypto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-id" className="text-base font-medium">
                Customer ID
              </Label>
              <Input
                id="customer-id"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full"
              />
            </div>

            {paymentType === 'crypto-to-crypto' ? (
              // Crypto to Crypto fields
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source-blockchain" className="text-base font-medium">
                      Source Blockchain
                    </Label>
                    <Select value={sourceBlockchain} onValueChange={setSourceBlockchain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent>
                        {topBlockchains.map((blockchain) => (
                          <SelectItem key={blockchain.name} value={blockchain.name}>
                            <div className="flex items-center space-x-2">
                              <img src={blockchain.logo} alt={blockchain.name} className="w-4 h-4 rounded-full" />
                              <span>{blockchain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source-currency" className="text-base font-medium">
                      Source Currency
                    </Label>
                    <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {topStablecoins.map((coin) => (
                          <SelectItem key={coin.name} value={coin.name}>
                            <div className="flex items-center space-x-2">
                              <img src={coin.logo} alt={coin.name} className="w-4 h-4 rounded-full" />
                              <span>{coin.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination-payment-rail" className="text-base font-medium">
                      Destination payment rail
                    </Label>
                    <Select value={destinationPaymentRail} onValueChange={setDestinationPaymentRail}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent>
                        {topBlockchains.map((blockchain) => (
                          <SelectItem key={blockchain.name} value={blockchain.name}>
                            <div className="flex items-center space-x-2">
                              <img src={blockchain.logo} alt={blockchain.name} className="w-4 h-4 rounded-full" />
                              <span>{blockchain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination-currency" className="text-base font-medium">
                      Destination Currency
                    </Label>
                    <Select value={destinationCurrency} onValueChange={setDestinationCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {topStablecoins.map((coin) => (
                          <SelectItem key={coin.name} value={coin.name}>
                            <div className="flex items-center space-x-2">
                              <img src={coin.logo} alt={coin.name} className="w-4 h-4 rounded-full" />
                              <span>{coin.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination-wallet-address" className="text-base font-medium">
                    Destination wallet address
                  </Label>
                  <Input
                    id="destination-wallet-address"
                    placeholder=""
                    value={destinationWalletAddress}
                    onChange={(e) => setDestinationWalletAddress(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return-wallet-address" className="text-base font-medium">
                    Return wallet address
                  </Label>
                  <Input
                    id="return-wallet-address"
                    placeholder=""
                    value={returnWalletAddress}
                    onChange={(e) => setReturnWalletAddress(e.target.value)}
                    className="w-full"
                  />
                </div>

                {shouldShowMemo && (
                  <div className="space-y-2">
                    <Label htmlFor="memo" className="text-base font-medium">
                      Memo for {destinationPaymentRail} transfer
                    </Label>
                    <Input
                      id="memo"
                      placeholder="Optional"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="w-full"
                    />
                  </div>
                )}
              </>
            ) : (
              // On-ramp/Off-ramp fields
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source-payment-rail" className="text-base font-medium">
                      Source payment rail
                    </Label>
                    <Select value={sourcePaymentRail} onValueChange={setSourcePaymentRail}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment rail" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="mobile-wallet">Mobile Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source-currency" className="text-base font-medium">
                      Source Currency
                    </Label>
                    <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {shouldShowGlobalCurrencies ? (
                          globalCurrencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))
                        ) : (
                          topStablecoins.map((coin) => (
                            <SelectItem key={coin.name} value={coin.name}>
                              <div className="flex items-center space-x-2">
                                <img src={coin.logo} alt={coin.name} className="w-4 h-4 rounded-full" />
                                <span>{coin.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base font-medium">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developer-fee" className="text-base font-medium">
                    Developer fee
                  </Label>
                  <Input
                    id="developer-fee"
                    placeholder="0"
                    value={developerFee}
                    onChange={(e) => setDeveloperFee(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination-blockchain" className="text-base font-medium">
                      Destination Blockchain
                    </Label>
                    <Select value={destinationBlockchain} onValueChange={setDestinationBlockchain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent>
                        {topBlockchains.map((blockchain) => (
                          <SelectItem key={blockchain.name} value={blockchain.name}>
                            <div className="flex items-center space-x-2">
                              <img src={blockchain.logo} alt={blockchain.name} className="w-4 h-4 rounded-full" />
                              <span>{blockchain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination-currency" className="text-base font-medium">
                      Destination Currency
                    </Label>
                    <Select value={destinationCurrency} onValueChange={setDestinationCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {topStablecoins.map((coin) => (
                          <SelectItem key={coin.name} value={coin.name}>
                            <div className="flex items-center space-x-2">
                              <img src={coin.logo} alt={coin.name} className="w-4 h-4 rounded-full" />
                              <span>{coin.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet-address" className="text-base font-medium">
                    Wallet address
                  </Label>
                  <Input
                    id="wallet-address"
                    placeholder=""
                    value={destinationWalletAddress}
                    onChange={(e) => setDestinationWalletAddress(e.target.value)}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleCancelCreate}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreatePayment}
                disabled={!paymentType || !customerId}
                className="flex-1 text-white"
                style={{ backgroundColor: '#4941EC' }}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;
