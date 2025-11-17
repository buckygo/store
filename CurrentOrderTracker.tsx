
import React from 'react';
import { type Order, type OrderStatus } from '../types.ts';

const statusMap: Record<OrderStatus, { text: string; color: string; textColor: string }> = {
  new: { text: '新订单', color: 'bg-blue-100', textColor: 'text-blue-800' },
  preparing: { text: '准备中', color: 'bg-yellow-100', textColor: 'text-yellow-800' },
  ready: { text: '请取餐', color: 'bg-green-100', textColor: 'text-green-800' },
  completed: { text: '已完成', color: 'bg-gray-100', textColor: 'text-gray-800' },
  cancelled: { text: '已取消', color: 'bg-red-100', textColor: 'text-red-800' },
};

interface CurrentOrderTrackerProps {
  order: Order;
}

const CurrentOrderTracker: React.FC<CurrentOrderTrackerProps> = ({ order }) => {
  const { text: statusText, color, textColor } = statusMap[order.status];
  
  return (
    <div className="w-full bg-white p-3 border-t-2 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold text-gray-800">
                    您的订单 (桌號: {order.tableNumber})
                </p>
                <p className="text-sm text-gray-500">
                   订单号: #{order.id}
                </p>
            </div>
            <div className="text-right">
               <p className="font-semibold text-gray-800">订单状态</p>
               <span className={`px-3 py-1 text-sm font-bold rounded-full ${color} ${textColor}`}>
                   {statusText}
               </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrderTracker;