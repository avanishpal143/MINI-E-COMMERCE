import React from 'react';
import { Product } from '../types';
import { DollarSign, Tag, Calendar } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format price to display with 2 decimal places
  const formattedPrice = parseFloat(product.price.toString()).toFixed(2);
  
  // Format date to be more readable
  const formattedDate = new Date(product.created_at).toLocaleDateString();
  
  // Default image if none provided
  const imageUrl = product.image_url || 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <DollarSign size={16} className="text-teal-600 mr-1" />
          <span className="text-lg font-bold text-teal-600">${formattedPrice}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Tag size={14} className="mr-1" />
            <span>ID: {product.id}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;