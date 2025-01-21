'use client';

import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';

export default function ClientProviders({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of unstyled content and hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-800"></div>
          <div className="p-4">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
} 