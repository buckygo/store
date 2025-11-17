
import React from 'react';
import { type CartItem as CartItemType } from '../types.ts';
import CartItem from './CartItem.tsx';

interface CartProps {
  items: CartItemType[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onPlaceOrder: () => void;
  onClearCart: () => void;
  onClose: () => void;
  total: number;
  totalItems: number;
  error: string | null;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onPlaceOrder, onClearCart, onClose, total, totalItems, error }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="fixed top-0 right-0 w-full max-w-sm h-full bg-gray-50 shadow-2xl flex flex-col transform transition-transform translate-x-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">我的订单 ({totalItems})</h2>
          <div className="flex items-center space-x-4">
             <button onClick={onClearCart} className="text-sm text-gray-500 hover:text-red-600">
              清空
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-4 text-lg">您的购物车是空的</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-2">
            <div className="bg-white rounded-lg shadow-sm">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
            </div>
          </div>
        )}
        
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">总计:</span>
              <span className="text-2xl font-bold text-red-600">¥{total.toFixed(2)}</span>
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-3 text-sm text-center" role="alert">
                    {error}
                </div>
            )}
            <button
              onClick={onPlaceOrder}
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 transform active:scale-95 shadow"
            >
              确认下单
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;