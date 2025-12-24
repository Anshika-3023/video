import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const StreamVideoProvider = dynamic(() => import('@/providers/StreamClientProvider'), { ssr: false });

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
