
import React from 'react';

interface CartFooterProps {
  total: number;
  totalItems: number;
  onCartClick: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({ total, totalItems, onCartClick }) => {
  return (
    <footer className="w-full bg-gray-900 p-3 flex-shrink-0 z-20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <button onClick={onCartClick} className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                 <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
             </button>
             {totalItems > 0 ? (
                <div onClick={onCartClick} className="cursor-pointer">
                    <p className="text-white font-bold text-lg">¥{total.toFixed(2)}</p>
                    <p className="text-gray-400 text-xs">预估总计</p>
                </div>
             ) : (
                <p className="text-gray-400 font-semibold">未选购餐品</p>
             )}
          </div>
          <button
            onClick={onCartClick}
            disabled={totalItems === 0}
            className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 ${
              totalItems > 0
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            去结算
          </button>
        </div>
      </div>
    </footer>
  );
};

export default CartFooter;
