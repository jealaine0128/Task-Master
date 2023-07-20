import LandingHeader from '@/components/landing/LandingHeader';
import LandingMain from '@/components/landing/LandingMain';
import React from 'react';

interface AppProps {
}

const App: React.FC<AppProps> = ({  }) => {
  return (
    <>
      <LandingHeader />
      <LandingMain />
    </>
  );
};

export default App;
