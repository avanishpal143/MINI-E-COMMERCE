import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { Loader, PackageOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        toast.error('Failed to load products');
      }
    };

    fetchProducts();

    // Set up polling for new products every 30 seconds
    const intervalId = setInterval(fetchProducts, 30000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="animate-spin text-teal-600 mb-4" size={40} />
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <>
        <SearchBar onSearch={handleSearch} />
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <PackageOpen size={48} className="mx-auto text-gray-400 mb-4" />
          {searchQuery ? (
            <>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products match your search</h3>
              <p className="text-gray-500">Try using different keywords or browse all products</p>
              <button
                onClick={() => handleSearch('')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Add some products from the Product Submission tab</p>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found for "{searchQuery}"
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;