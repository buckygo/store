
import React from 'react';
import { type CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
}

const QuantityControl: React.FC<{
  quantity: number, 
  onDecrease: () => void, 
  onIncrease: () => void
}> = ({ quantity, onDecrease, onIncrease }) => (
    <div className="flex items-center">
        <button
            onClick={onDecrease}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="减少数量"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </button>
        <span className="w-8 text-center text-base font-semibold text-gray-800">{quantity}</span>
        <button
            onClick={onIncrease}
            className="w-7 h-7 rounded-full border border-red-500 bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            aria-label="增加数量"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </button>
    </div>
);


const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {
  const price = item.selectedSpecification?.price ?? item.dish.price;
  
  return (
    <div className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
      <img src={item.dish.image} alt={item.dish.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
      <div className="ml-3 flex-grow">
        <p className="text-sm font-bold text-gray-800">{item.dish.name}</p>
        {item.selectedSpecification && (
          <p className="text-xs text-gray-500">{item.selectedSpecification.name}</p>
        )}
        <p className="text-base font-bold text-red-600 mt-2">¥{price.toFixed(2)}</p>
      </div>
      <div className="ml-3 flex-shrink-0">
        <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
        />
      </div>
    </div>
  );
};

export default CartItem;
