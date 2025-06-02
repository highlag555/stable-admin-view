
import { Search, Plus } from 'lucide-react';
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

const Payments = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    'Ethereum',
    'Bitcoin',
    'Binance Smart Chain',
    'Polygon',
    'Avalanche',
    'Solana',
    'Cardano',
    'Polkadot',
    'Chainlink',
    'Litecoin',
    'Stellar',
    'Cosmos',
    'Algorand',
    'Tron',
    'Near Protocol',
    'Fantom',
    'Harmony',
    'Arbitrum',
    'Optimism',
    'Cronos'
  ];

  const topStablecoins = [
    'USDC',
    'USDT',
    'DAI',
    'BUSD',
    'FRAX'
  ];

  // Blockchains that require memo fields
  const blockchainsRequiringMemo = ['Stellar', 'Cosmos', 'Algorand'];

  // Check if the selected destination blockchain requires a memo
  const shouldShowMemo = paymentType === 'crypto-to-crypto' && 
    blockchainsRequiringMemo.includes(destinationPaymentRail);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
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
        <button className="text-gray-400 text-sm">{'<'} Previous</button>
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
        <button className="text-gray-900 text-sm font-medium">Next {'>'}</button>
      </div>

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
                          <SelectItem key={blockchain} value={blockchain}>
                            {blockchain}
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
                          <SelectItem key={coin} value={coin}>
                            {coin}
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
                          <SelectItem key={blockchain} value={blockchain}>
                            {blockchain}
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
                          <SelectItem key={coin} value={coin}>
                            {coin}
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
                        {topStablecoins.map((coin) => (
                          <SelectItem key={coin} value={coin}>
                            {coin}
                          </SelectItem>
                        ))}
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
                          <SelectItem key={blockchain} value={blockchain}>
                            {blockchain}
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
                          <SelectItem key={coin} value={coin}>
                            {coin}
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
                className="flex-1 bg-black hover:bg-gray-800 text-white"
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
