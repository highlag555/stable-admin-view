import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus, Copy, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/StatusBadge';

const topBlockchains = [
  { name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { name: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
  { name: 'Arbitrum', logo: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
  { name: 'Base', logo: 'https://assets.coingecko.com/coins/images/30646/small/base.png' },
  { name: 'Optimism', logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
];

const topStablecoins = [
  { name: 'USDC', logo: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { name: 'USDT', logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { name: 'DAI', logo: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png' },
  { name: 'FRAX', logo: 'https://assets.coingecko.com/coins/images/13422/small/frax_logo.png' },
];

const globalCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK'];

const Payments = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'liquidation-addresses'>('transactions');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customer, setCustomer] = useState('');
  const [asset, setAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  
  // Payment form state variables
  const [paymentType, setPaymentType] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [sourcePaymentRail, setSourcePaymentRail] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [sourceBlockchain, setSourceBlockchain] = useState('');
  const [developerFee, setDeveloperFee] = useState('');
  const [destinationPaymentRail, setDestinationPaymentRail] = useState('');
  const [destinationBlockchain, setDestinationBlockchain] = useState('');
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [destinationWalletAddress, setDestinationWalletAddress] = useState('');
  const [returnWalletAddress, setReturnWalletAddress] = useState('');
  
  const { toast } = useToast();

  const itemsPerPage = 10;

  // Derived state
  const shouldShowGlobalCurrencies = (paymentType === 'on-ramp' && sourcePaymentRail !== '') || 
                                   (paymentType === 'off-ramp' && sourcePaymentRail !== '');
  const shouldShowMemo = destinationPaymentRail === 'Stellar' || destinationPaymentRail === 'XRP';

  const transactions = [
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
      id: '1',
      customer: 'Hakim Hettak',
      asset: 'USDC',
      chain: 'Ethereum',
      bank: 'Chase',
      payoutMethod: 'ACH',
      address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      assetIcon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
      chainIcon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    {
      id: '2',
      customer: 'Ya-Chen Huang',
      asset: 'USDT',
      chain: 'Polygon',
      bank: 'Bank of America',
      payoutMethod: 'Wire',
      address: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u',
      assetIcon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      chainIcon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
    },
    {
      id: '3',
      customer: 'Karensa Fisher',
      asset: 'DAI',
      chain: 'Arbitrum',
      bank: 'Wells Fargo',
      payoutMethod: 'ACH',
      address: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v',
      assetIcon: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png',
      chainIcon: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg'
    },
    {
      id: '4',
      customer: 'Simon Sibiya',
      asset: 'USDC',
      chain: 'Base',
      bank: 'Citibank',
      payoutMethod: 'Wire',
      address: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w',
      assetIcon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
      chainIcon: 'https://assets.coingecko.com/coins/images/30646/small/base.png'
    },
    {
      id: '5',
      customer: 'Abhishek Singh',
      asset: 'USDT',
      chain: 'Ethereum',
      bank: 'JPMorgan',
      payoutMethod: 'ACH',
      address: '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x',
      assetIcon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      chainIcon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    }
  ];

  const totalPages = Math.ceil((activeTab === 'transactions' ? transactions : liquidationAddresses).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = activeTab === 'transactions' 
    ? transactions.slice(startIndex, endIndex)
    : liquidationAddresses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: 'transactions' | 'liquidation-addresses') => {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied to clipboard',
        description: 'Address copied successfully.',
      });
    }).catch((err) => {
      toast({
        title: 'Failed to copy',
        description: 'Failed to copy address.',
        variant: 'destructive',
      });
    });
  };

  const renderTransactionsTable = () => (
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
        {currentData.map((payment, index) => (
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
  );

  const renderLiquidationTable = () => (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank/Wallet</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <img 
                      src={item.assetIcon} 
                      alt={item.asset} 
                      className="w-5 h-5 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/20/6B7280/FFFFFF?text=${item.asset.charAt(0)}`;
                      }}
                    />
                    <span className="text-sm font-medium text-gray-900">{item.asset}</span>
                  </div>
                  <span className="text-gray-400">on</span>
                  <div className="flex items-center space-x-1">
                    <img 
                      src={item.chainIcon} 
                      alt={item.chain} 
                      className="w-4 h-4 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/16/6B7280/FFFFFF?text=${item.chain.charAt(0)}`;
                      }}
                    />
                    <span className="text-sm text-gray-600">{item.chain}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bank}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.payoutMethod}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 font-mono">
                    {item.address.slice(0, 6)}...{item.address.slice(-4)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item.address)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
          onClick={() => handleTabChange('transactions')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'transactions' 
              ? 'border-gray-900 text-gray-900' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Transactions
        </button>
        <button 
          onClick={() => handleTabChange('liquidation-addresses')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'liquidation-addresses' 
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
            placeholder={activeTab === 'transactions' ? "Search all transactions..." : "Search all liquidation addresses..."}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {activeTab === 'transactions' ? renderTransactionsTable() : renderLiquidationTable()}

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

      {/* Create Payment Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create payment
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
