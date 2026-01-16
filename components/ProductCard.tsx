import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  formatCurrency: (amount: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, formatCurrency }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-slate-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-slate-800 text-sm truncate">{product.name}</h3>
        <p className="text-lg font-bold text-slate-900 mt-2">{formatCurrency(product.price)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-3 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Tambah
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
