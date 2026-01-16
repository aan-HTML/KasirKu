import React from 'react';
import { CartItem as CartItemType } from '../types';

interface CartItemComponentProps {
  item: CartItemType;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  formatCurrency: (amount: number) => string;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  formatCurrency
}) => {
  return (
    <div className="flex gap-3 pb-4 border-b border-slate-200 last:border-b-0">
      <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-slate-800 text-sm">{item.name}</h3>
        <p className="text-blue-600 font-bold mt-1">{formatCurrency(item.price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors text-sm font-medium"
          >
            −
          </button>
          <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded font-semibold text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 font-bold text-lg"
        >
          ×
        </button>
        <span className="text-slate-900 font-bold text-sm">
          {formatCurrency(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
};

export default CartItemComponent;
