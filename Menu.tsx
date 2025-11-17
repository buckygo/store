
import React from 'react';
import { type Dish } from '../types.ts';
import MenuItem from './MenuItem.tsx';

interface MenuProps {
  menuData: Dish[];
  onShowDetail: (dish: Dish) => void;
}

const Menu: React.FC<MenuProps> = ({ menuData, onShowDetail }) => {
  return (
    <div className="flex flex-col gap-4">
      {menuData.length > 0 ? (
        menuData.map((dish) => (
          <MenuItem key={dish.id} dish={dish} onShowDetail={onShowDetail} />
        ))
       ) : (
        <p className="text-gray-500 text-center py-10">此分类下没有餐点。</p>
      )}
    </div>
  );
};

export default Menu;