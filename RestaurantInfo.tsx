import React from 'react';
import { RESTAURANT_NAME } from '../constants';

interface RestaurantInfoProps {
  onToggleView: () => void;
  tableNumber: string | null;
  isAdminAllowed: boolean;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ onToggleView, tableNumber, isAdminAllowed }) => {
  return (
    <div className="p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-red-600 text-white font-bold flex items-center justify-center rounded-md mr-4 text-xl">
            中
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{RESTAURANT_NAME}</h1>
            <div className="flex items-center space-x-3 mt-1">
                <p className="text-xs text-gray-500">
                自取 | 长安镇长安东门中路 | 店内柜台 | 252m
                </p>
                {tableNumber && (
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                        桌號: {tableNumber}
                    </span>
                )}
            </div>
          </div>
        </div>
        {isAdminAllowed && (
            <button
            onClick={onToggleView}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-sm"
            aria-label="切换到后台管理视图"
            >
            管理后台
            </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;