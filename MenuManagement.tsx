
import React from 'react';
import { type Dish } from '../types';

interface MenuManagementProps {
  menuData: Dish[];
  onAddDish: () => void;
  onEditDish: (dish: Dish) => void;
  onDeleteDish: (dishId: string) => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({ menuData, onAddDish, onEditDish, onDeleteDish }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center mb-6 pt-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800">餐点列表</h2>
        <button
          onClick={onAddDish}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          新增餐點
        </button>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">餐點</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">分類</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">价格</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((dish) => (
            <tr key={dish.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img className="w-full h-full rounded-md object-cover" src={dish.image} alt={dish.name} />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">{dish.name}</p>
                    <p className="text-gray-600 whitespace-no-wrap text-xs">{dish.subtitle}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{dish.category}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap font-bold text-red-600">¥{dish.price}</p>
                {dish.originalPrice && <p className="text-gray-500 whitespace-no-wrap line-through text-xs">¥{dish.originalPrice}</p>}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button onClick={() => onEditDish(dish)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold">編輯</button>
                <button onClick={() => onDeleteDish(dish.id)} className="text-red-600 hover:text-red-900 font-semibold">刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
