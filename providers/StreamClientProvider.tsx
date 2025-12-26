'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    // Validate required environment variables
    if (!API_KEY) {
      console.error('NEXT_PUBLIC_STREAM_API_KEY is not configured');
      return;
    }

    // NEXT_PUBLIC_APP_URL is optional on client - warn but don't fail
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.warn('NEXT_PUBLIC_APP_URL is not configured - falling back to window.location.origin');
    }

    const initializeClient = async () => {
      try {
        // Use a stable user ID stored in localStorage
        let userId = localStorage.getItem('streamUserId');
        if (!userId) {
          userId = crypto.randomUUID();
          localStorage.setItem('streamUserId', userId);
        }
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
