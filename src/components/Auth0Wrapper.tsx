
import { useState } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0Config from './Auth0Config';

interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
}

interface Auth0WrapperProps {
  children: React.ReactNode;
}

const Auth0Wrapper = ({ children }: Auth0WrapperProps) => {
  const [config, setConfig] = useState<Auth0Config | null>(null);

  const handleConfigSaved = (newConfig: Auth0Config) => {
    setConfig(newConfig);
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Auth0Config onConfigSaved={handleConfigSaved} />
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        redirect_uri: config.redirectUri
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
