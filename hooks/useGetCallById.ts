import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) return;

    const loadCall = async () => {
      try {
        console.log('Loading call with id:', id);
        const callInstance = client.call('default', id as string);
        await callInstance.getOrCreate();
        console.log('Call loaded/created, call.id:', callInstance.id);
        setCall(callInstance);
        setIsCallLoading(false);
      } catch (error) {
        console.error('Error loading call:', error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
