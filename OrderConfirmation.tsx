
import React from 'react';
import { RESTAURANT_NAME } from '../constants.ts';

interface OrderConfirmationProps {
  orderNumber: string;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderNumber, onNewOrder }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-md w-full">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">下单成功！</h2>
        <p className="text-gray-600 mt-3">感谢您在 {RESTAURANT_NAME} 订餐。</p>
        <div className="mt-8 bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-lg text-gray-700">您的取餐号是：</p>
            <p className="text-4xl font-extrabold text-red-600 tracking-wider mt-2">{orderNumber}</p>
        </div>
        <p className="text-sm text-gray-500 mt-6">餐点正在准备中，请稍候。</p>
        <button
          onClick={onNewOrder}
          className="mt-8 w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg"
        >
          返回菜单
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;