import React from 'react';
import { type Dish } from '../types';

interface MenuItemProps {
  dish: Dish;
  onShowDetail: (dish: Dish) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ dish, onShowDetail }) => {
  return (
    <div 
      className="flex bg-white rounded-lg overflow-hidden h-32 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onShowDetail(dish)}
    >
      <img src={dish.image} alt={dish.name} className="w-32 h-32 object-cover flex-shrink-0" />
      <div className="p-3 flex flex-col flex-grow overflow-hidden">
        <h3 className="text-base font-bold text-gray-800 truncate">{dish.name}</h3>
        {dish.subtitle && <p className="text-xs text-gray-500 mt-1 truncate">{dish.subtitle}</p>}
        <div className="mt-auto flex justify-between items-end">
          <div>
            <span className="text-lg font-bold text-red-600">¥{dish.price.toFixed(1)}</span>
            <span className="text-xs text-gray-400">起</span>
            {dish.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">¥{dish.originalPrice.toFixed(1)}</span>
            )}
          </div>
          <div
            className="bg-red-600 text-white font-bold py-1.5 px-4 rounded-full text-sm shadow"
          >
            选规格
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
