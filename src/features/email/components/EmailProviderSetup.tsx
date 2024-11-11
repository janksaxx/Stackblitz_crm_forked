import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { useEmailStore } from '../stores/emailStore';

export function EmailProviderSetup() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { setEmailProvider, setAccessToken } = useEmailStore();

  const handleGmailConnect = async () => {
    setIsConnecting(true);
    try {
      // For demo purposes, we'll just simulate a connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAccessToken('demo-token');
      setEmailProvider('gmail');
    } catch (error) {
      console.error('Failed to connect to Gmail:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6 p-6 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-2xl font-bold mb-4">Connect Email Provider</h2>
          <p className="text-gray-600 mb-6">
            Connect your email account to start managing your emails within the CRM.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGmailConnect}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect Gmail Account'}
          </Button>
        </div>
      </div>
    </div>
  );
}