import React, { useState } from 'react';
import { ShoppingBag, PlusCircle } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'products'>('submit');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <ShoppingBag className="mr-3" />
            Mini E-Commerce
          </h1>
          <p className="mt-1 text-teal-100">Add and browse products with ease</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('submit')}
              className={`flex items-center py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'submit'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <PlusCircle className="mr-2" size={18} />
              Product Submission
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingBag className="mr-2" size={18} />
              My Products
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'submit' ? <ProductForm /> : <ProductList />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Mini E-Commerce Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;