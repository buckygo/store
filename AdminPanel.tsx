
import React, { useState } from 'react';
import { type Dish, type Order, type OrderStatus } from '../types';
import DishForm from './DishForm';
import OrderList from './OrderList';
import MenuManagement from './MenuManagement';
import TableManagement from './TableManagement';

interface AdminPanelProps {
  menuData: Dish[];
  setMenuData: (data: Dish[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  onToggleView: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ menuData, setMenuData, orders, setOrders, onToggleView }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'tables'>('orders');

  const handleOpenForm = (dish: Dish | null) => {
    setEditingDish(dish);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingDish(null);
    setIsFormOpen(false);
  };

  const handleSaveDish = (dishToSave: Omit<Dish, 'id'> & { id?: string }) => {
    let updatedMenu;
    if (dishToSave.id) { // Editing
      updatedMenu = menuData.map(dish => dish.id === dishToSave.id ? dishToSave as Dish : dish);
    } else { // Creating
      const newDish: Dish = { ...(dishToSave as Omit<Dish, 'id'>), id: crypto.randomUUID() };
      updatedMenu = [...menuData, newDish];
    }
    setMenuData(updatedMenu);
    handleCloseForm();
  };
  
  const handleDeleteDish = (dishId: string) => {
    if (window.confirm('確定要刪除這個餐點嗎？')) {
      const updatedMenu = menuData.filter(dish => dish.id !== dishId);
      setMenuData(updatedMenu);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
       <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">后台管理</h1>
          <button
            onClick={onToggleView}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 transform active:scale-95 shadow"
          >
            返回点餐
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
         <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              >
                订单管理
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`${
                  activeTab === 'menu'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              >
                菜单管理
              </button>
              <button
                onClick={() => setActiveTab('tables')}
                className={`${
                  activeTab === 'tables'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
              >
                桌號管理
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'orders' && <OrderList orders={orders} onUpdateStatus={handleUpdateOrderStatus} />}
        {activeTab === 'menu' && (
          <MenuManagement
            menuData={menuData}
            onAddDish={() => handleOpenForm(null)}
            onEditDish={handleOpenForm}
            onDeleteDish={handleDeleteDish}
          />
        )}
        {activeTab === 'tables' && <TableManagement />}
       
        {isFormOpen && (
          <DishForm 
            dish={editingDish} 
            onSave={handleSaveDish} 
            onClose={handleCloseForm} 
          />
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
