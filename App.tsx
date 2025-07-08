
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import ProductCard from './components/ProductCard';
import CartItemComponent from './components/CartItem';
import { ShoppingCartIcon, XCircleIcon } from './components/Icons';

function App(): React.ReactNode {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddToCart = (product: Product): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productId: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: number): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const handleRemoveItem = (productId: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleClearCart = (): void => {
    setCartItems([]);
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold text-slate-800">Minimarket Kasir</h1>
                 <div className="flex items-center">
                    <ShoppingCartIcon className="h-6 w-6 text-slate-600" />
                    <span className="ml-2 text-lg font-medium text-slate-700">{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Product List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Daftar Produk</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {PRODUCTS.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-700">Keranjang</h2>
                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                  >
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    Kosongkan
                  </button>
                )}
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <ShoppingCartIcon className="w-16 h-16 mb-4" />
                    <p className="text-center">Keranjang belanja Anda kosong.</p>
                    <p className="text-center text-sm">Pilih produk untuk ditambahkan.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onIncrease={handleIncreaseQuantity}
                        onDecrease={handleDecreaseQuantity}
                        onRemove={handleRemoveItem}
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-slate-800">Total</span>
                    <span className="text-2xl font-bold text-slate-900">{formatCurrency(total)}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    Bayar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
