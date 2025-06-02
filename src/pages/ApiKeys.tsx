import { Plus, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  key: string;
  created: string;
  isVisible?: boolean;
  type: 'sandbox' | 'production';
}

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      key: 'sk-live●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●348e',
      created: '24/09/2024, 21:23:33',
      type: 'production'
    }
  ]);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [newGeneratedKey, setNewGeneratedKey] = useState<string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [activeTab, setActiveTab] = useState<'sandbox' | 'production'>('production');
  const { toast } = useToast();

  const generateApiKey = (type: 'sandbox' | 'production') => {
    const prefix = type === 'sandbox' ? 'sk-test-' : 'sk-live-';
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newKey = prefix + randomString;
    
    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      key: newKey,
      created: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(',', ','),
      isVisible: true,
      type: type
    };

    setApiKeys(prev => [newApiKey, ...prev]);
    setNewGeneratedKey(newKey);
    setIsGenerateModalOpen(true);

    toast({
      title: "API Key Generated",
      description: `Your new ${type} API key has been generated successfully.`,
    });
  };

  const deleteApiKey = (keyId: string, keyToDelete: string) => {
    const lastFourDigits = keyToDelete.slice(-4);
    
    if (deleteConfirmation === lastFourDigits) {
      setApiKeys(prev => prev.filter(key => key.id !== keyId));
      setDeleteConfirmation('');
      toast({
        title: "API Key Deleted",
        description: "The API key has been deleted successfully.",
      });
    } else {
      toast({
        title: "Invalid Confirmation",
        description: "Please enter the correct last four digits.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const maskApiKey = (key: string, isVisible: boolean = false) => {
    if (isVisible) return key;
    const prefix = key.split('-').slice(0, 2).join('-') + '-';
    const suffix = key.slice(-4);
    const maskedMiddle = '●'.repeat(20);
    return prefix + maskedMiddle + suffix;
  };

  const filteredKeys = apiKeys.filter(key => key.type === activeTab);

  const renderApiKeysTable = (keys: ApiKey[]) => (
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
          {keys.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                No {activeTab} API keys found. Generate one to get started.
              </td>
            </tr>
          ) : (
            keys.map((apiKey) => (
              <tr key={apiKey.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-900">
                      {maskApiKey(apiKey.key, apiKey.isVisible)}
                    </span>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {apiKey.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  {apiKey.isVisible && (
                    <p className="text-xs text-orange-600 mt-1">
                      Please copy this key as it will only be visible this one time.
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.created}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="sm:max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete API key</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                          <p>
                            Are you sure you want to delete your API key? This may result in breaking changes to your application. This action cannot be undone.
                          </p>
                          <div className="bg-gray-100 p-3 rounded-md">
                            <code className="text-sm text-gray-600">
                              {maskApiKey(apiKey.key)}
                            </code>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmation">Type the last four digits above to delete</Label>
                            <Input
                              id="confirmation"
                              placeholder="Type the last four digits above to delete"
                              value={deleteConfirmation}
                              onChange={(e) => setDeleteConfirmation(e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteApiKey(apiKey.id, apiKey.key)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={deleteConfirmation !== apiKey.key.slice(-4)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Your keys will allow you to authenticate API requests. A maximum of two keys can be used at the same time.{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">More Info</a>
        </p>
      </div>

      {/* Environment Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('production')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'production'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Production
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sandbox'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sandbox
          </button>
        </div>
      </div>

      {/* Environment Info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={`w-3 h-3 rounded-full mt-1 ${
              activeTab === 'production' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              {activeTab === 'production' ? 'Production Environment' : 'Sandbox Environment'}
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              {activeTab === 'production' 
                ? 'Keys in this environment will process real transactions and charges.'
                : 'Keys in this environment are for testing purposes and will not process real transactions.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Generate Key Button */}
      <div className="flex justify-end mb-4">
        <Button 
          onClick={() => generateApiKey(activeTab)} 
          className="bg-gray-800 hover:bg-gray-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate {activeTab === 'production' ? 'Production' : 'Sandbox'} Key
        </Button>
      </div>

      {/* API Keys Table */}
      {renderApiKeysTable(filteredKeys)}

      {/* Generate Key Success Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your API key has been generated successfully. Please copy it now as it will not be shown again.
            </p>
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-md">
              <code className="flex-1 text-sm font-mono text-gray-900 break-all">
                {newGeneratedKey}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(newGeneratedKey)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-orange-600">
              Please copy this key as it will only be visible this one time.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsGenerateModalOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiKeys;
