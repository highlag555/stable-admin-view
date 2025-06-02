
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
}

interface Auth0ConfigProps {
  onConfigSaved: (config: Auth0Config) => void;
}

const Auth0Config = ({ onConfigSaved }: Auth0ConfigProps) => {
  const [config, setConfig] = useState<Auth0Config>({
    domain: '',
    clientId: '',
    redirectUri: window.location.origin
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('auth0Config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      onConfigSaved(parsedConfig);
    }
  }, [onConfigSaved]);

  const handleSave = () => {
    if (!config.domain || !config.clientId) {
      toast({
        title: "Missing Configuration",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('auth0Config', JSON.stringify(config));
    onConfigSaved(config);
    toast({
      title: "Configuration Saved",
      description: "Auth0 configuration has been saved successfully."
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Auth0 Configuration</CardTitle>
        <CardDescription>
          Enter your Auth0 application settings to enable authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Auth0 Domain</Label>
          <Input
            id="domain"
            placeholder="your-app.auth0.com"
            value={config.domain}
            onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientId">Client ID</Label>
          <Input
            id="clientId"
            placeholder="Your Auth0 Client ID"
            value={config.clientId}
            onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="redirectUri">Redirect URI</Label>
          <Input
            id="redirectUri"
            value={config.redirectUri}
            onChange={(e) => setConfig(prev => ({ ...prev, redirectUri: e.target.value }))}
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
};

export default Auth0Config;
