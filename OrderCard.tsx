import React from 'react';
import { type Order, type OrderStatus } from '../types';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const statusMap: Record<OrderStatus, { text: string; color: string }> = {
  new: { text: '新订单', color: 'bg-blue-500' },
  preparing: { text: '准备中', color: 'bg-yellow-500' },
  ready: { text: '请取餐', color: 'bg-green-500' },
  completed: { text: '已完成', color: 'bg-gray-500' },
  cancelled: { text: '已取消', color: 'bg-red-500' },
};

const ActionButton: React.FC<{ onClick: () => void; text: string; color: string }> = ({ onClick, text, color }) => (
    <button
        onClick={onClick}
        className={`w-full text-white font-bold py-2 px-3 rounded-md transition-all duration-300 transform active:scale-95 shadow ${color}`}
    >
        {text}
    </button>
);

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const { text: statusText, color: statusColor } = statusMap[order.status];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className={`p-3 flex justify-between items-center ${statusColor}`}>
        <div>
            <h4 className="font-bold text-white text-lg">订单 #{order.id}</h4>
            <p className="text-white text-xs font-semibold">桌號: {order.tableNumber}</p>
        </div>
        <span className="text-white text-sm font-semibold">{statusText}</span>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-3">
          {new Date(order.timestamp).toLocaleString('zh-CN')}
        </p>
        <div className="space-y-2 mb-3 border-t border-b py-3">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-800">{item.dish.name} {item.selectedSpecification ? `(${item.selectedSpecification.name})` : ''}</span>
              <span className="text-gray-600">x{item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span className="text-gray-800">总计:</span>
          <span className="text-red-600">¥{order.total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
            {order.status === 'new' && (
                <ActionButton onClick={() => onUpdateStatus(order.id, 'preparing')} text="开始准备" color="bg-yellow-500 hover:bg-yellow-600" />
            )}
            {order.status === 'preparing' && (
                <ActionButton onClick={() => onUpdateStatus(order.id, 'ready')} text="准备好了" color="bg-green-500 hover:bg-green-600" />
            )}
             {order.status === 'ready' && (
                <ActionButton onClick={() => onUpdateStatus(order.id, 'completed')} text="完成" color="bg-gray-600 hover:bg-gray-700" />
            )}
             {(order.status === 'new' || order.status === 'preparing') && (
                <button 
                  onClick={() => onUpdateStatus(order.id, 'cancelled')}
                  className="w-full bg-transparent text-red-600 font-semibold py-2 px-3 rounded-md border border-red-500 hover:bg-red-50"
                >
                  取消订单
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;