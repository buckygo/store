
import React, { useState, useMemo } from 'react';
import { type Order, type OrderStatus } from '../types.ts';
import OrderCard from './OrderCard.tsx';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderColumn: React.FC<{ title: string; orders: Order[]; onUpdateStatus: OrderListProps['onUpdateStatus'];}> = ({ title, orders, onUpdateStatus }) => (
  <div className="bg-gray-100 rounded-lg p-4 flex-1">
    <h3 className="text-xl font-bold text-gray-700 mb-4 pb-2 border-b-2 border-gray-300">{title} ({orders.length})</h3>
    <div className="space-y-4 h-[60vh] overflow-y-auto pr-2">
      {orders.length > 0 ? (
         orders.map(order => <OrderCard key={order.id} order={order} onUpdateStatus={onUpdateStatus} />)
      ) : (
        <p className="text-gray-500 text-center pt-10">没有订单</p>
      )}
    </div>
  </div>
);

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateStatus }) => {
  const [showHistory, setShowHistory] = useState(false);
  
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [orders]);

  const newOrders = sortedOrders.filter(o => o.status === 'new');
  const preparingOrders = sortedOrders.filter(o => o.status === 'preparing');
  const readyOrders = sortedOrders.filter(o => o.status === 'ready');
  const historyOrders = sortedOrders.filter(o => o.status === 'completed' || o.status === 'cancelled');

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <OrderColumn title="新订单" orders={newOrders} onUpdateStatus={onUpdateStatus} />
        <OrderColumn title="准备中" orders={preparingOrders} onUpdateStatus={onUpdateStatus} />
        <OrderColumn title="请取餐" orders={readyOrders} onUpdateStatus={onUpdateStatus} />
      </div>
      <div className="mt-8">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transition-transform ${showHistory ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          歷史訂單 ({historyOrders.length})
        </button>
        {showHistory && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
             {historyOrders.length > 0 ? (
               <div className="space-y-4">
                 {historyOrders.map(order => <OrderCard key={order.id} order={order} onUpdateStatus={onUpdateStatus} />)}
               </div>
             ) : (
               <p className="text-gray-500 text-center py-4">没有历史订单</p>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;