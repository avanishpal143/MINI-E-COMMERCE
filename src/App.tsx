import React from 'react';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Layout />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

export default App;