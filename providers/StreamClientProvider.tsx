'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!API_KEY) {
      console.error('Stream API key is missing');
      return;
    }

    const initializeClient = async () => {
      try {
        // Generate a unique user ID for this session
        const userId = crypto.randomUUID();
        console.log('Initializing client for userId:', userId);

        // Fetch token from API
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }

        const { token } = await response.json();
        console.log('Fetched token:', token);

        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: userId,
            name: `User ${userId.slice(0, 8)}`,
            image: '',
          },
          token,
        });

        setVideoClient(client);
      } catch (error) {
        console.error('Failed to create Stream client:', error);
      }
    };

    initializeClient();
  }, []);

  if (!videoClient) {
    // Render children without StreamVideo if client failed to initialize
    console.warn('Stream client not initialized, rendering without video capabilities');
    return <>{children}</>;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
