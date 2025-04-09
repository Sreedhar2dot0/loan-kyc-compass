
import React from 'react';
import Header from '@/components/layout/Header';
import KycVerification from './KycVerification';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <KycVerification />
      </main>
    </div>
  );
};

export default Index;
