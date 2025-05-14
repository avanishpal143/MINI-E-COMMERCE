import React, { useState } from 'react';
import axios from 'axios';
import { ProductFormData } from '../types';
import { Info, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const initialFormData: ProductFormData = {
  name: '',
  price: '',
  description: '',
  image_url: '',
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:3001/api/products', {
        ...formData,
        price: parseFloat(formData.price),
      });
      
      toast.success('Product added successfully!');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 transition-all">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
        <p className="text-gray-600 mt-1">Complete the form below to add a new product</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price ($) *
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.price}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.description}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            placeholder="Enter image URL"
          />
          <p className="mt-1 text-xs text-gray-500 flex items-center">
            <Info size={12} className="mr-1" />
            If left empty, a default image will be used
          </p>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;