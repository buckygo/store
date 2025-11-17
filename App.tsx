
import React, { useState, useMemo, useEffect } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import CategoryTabs from './components/CategoryTabs';
import AdminPanel from './components/AdminPanel';
import CartFooter from './components/CartFooter';
import RestaurantInfo from './components/RestaurantInfo';
import DishDetailModal from './components/DishDetailModal';
import CurrentOrderTracker from './components/CurrentOrderTracker';
import OrderConfirmation from './components/OrderConfirmation';
import { INITIAL_MENU_DATA, MENU_STORAGE_KEY, ORDERS_STORAGE_KEY } from './constants';
import { type CartItem, type Dish, type Specification, type Order } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderJustPlaced, setOrderJustPlaced] = useState<Order | null>(null);
  const [isAdminAllowed, setIsAdminAllowed] = useState(false);

  const [menuData, setMenuData] = useState<Dish[]>(() => {
    try {
      const storedData = localStorage.getItem(MENU_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // 增加驗證以確保資料是陣列格式，防止因localStorage損壞導致的崩潰
        if (Array.isArray(parsedData)) {
          return parsedData;
        }
      }
      return INITIAL_MENU_DATA;
    } catch (error) {
      console.error("從 localStorage 解析菜單資料時出錯", error);
      return INITIAL_MENU_DATA;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
       if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        // 增加驗證以確保資料是陣列格式
        if (Array.isArray(parsedOrders)) {
          return parsedOrders;
        }
      }
      return [];
    } catch (error)
 {
      console.error("從 localStorage 解析訂單資料時出錯", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuData));
    } catch (error) {
       console.error("儲存菜單資料至 localStorage 時出錯", error);
    }
  }, [menuData]);
  
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
       console.error("儲存訂單資料至 localStorage 時出錯", error);
    }
  }, [orders]);

  // 從 URL 讀取桌號和管理員權限
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get('table');
    if (table) {
        setTableNumber(table);
    }
    if (urlParams.get('admin') === 'true') {
        setIsAdminAllowed(true);
    }
  }, []);

  // 根據桌號和訂單列表，尋找當前進行中的訂單
  useEffect(() => {
    if (tableNumber) {
        const lastOrderForTable = [...orders]
            .reverse()
            .find(o => o.tableNumber === tableNumber && ['new', 'preparing', 'ready'].includes(o.status));
        setCurrentOrder(lastOrderForTable || null);
    }
  }, [orders, tableNumber]);


  const categories = useMemo(() => {
    const categoryOrder = ["周末疯狂拼", "人气热卖", "西式早餐", "中式早餐", "OK餐单人餐", "汁汁牛堡", "全鸡", "吮指原味鸡", "炸鸡小食", "饮料"];
    const presentCategories = new Set(menuData.map(d => d.category));
    return categoryOrder.filter(c => presentCategories.has(c));
  }, [menuData]);

  const [activeCategory, setActiveCategory] = useState('');

  // 優化 activeCategory 的狀態管理，使其更健壯
  useEffect(() => {
    // 當分類列表存在，且當前選中的分類無效時（包括初始狀態），自動選中第一個分類
    if (categories.length > 0 && !categories.includes(activeCategory)) {
        setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredMenu = useMemo(() => {
    if (!activeCategory) return []; // 如果沒有有效分類，返回空陣列
    return menuData.filter((dish) => dish.category === activeCategory);
  }, [activeCategory, menuData]);

  const handleOpenModal = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const addToCart = (dish: Dish, spec: Specification | undefined, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedSpecification?.name === spec?.name
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${dish.id}-${spec?.name || ''}-${Date.now()}`,
          dish,
          quantity: quantity,
          selectedSpecification: spec,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    setOrderError(null);
    if (!tableNumber) {
        setOrderError('無效的桌號，請掃描桌上QR碼點餐！');
        return;
    }
    if (cartItems.length > 0) {
      const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
      const newOrder: Order = {
        id: orderNumber,
        items: cartItems,
        total: cartTotal,
        status: 'new',
        timestamp: new Date().toISOString(),
        tableNumber: tableNumber,
      };
      setOrders(prevOrders => [...prevOrders, newOrder]);
      clearCart();
      setIsCartOpen(false);
      setOrderJustPlaced(newOrder);
    }
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
       const price = item.selectedSpecification?.price ?? item.dish.price;
       return total + price * item.quantity;
    }, 0);
  }, [cartItems]);
  
  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const toggleView = () => {
    setViewMode(prev => prev === 'customer' ? 'admin' : 'customer');
  };
  
  useEffect(() => {
    if (isCartOpen || isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isCartOpen, isModalOpen]);


  if (viewMode === 'admin') {
    return <AdminPanel 
      menuData={menuData} 
      setMenuData={setMenuData} 
      orders={orders}
      setOrders={setOrders}
      onToggleView={toggleView}
    />;
  }

  if (orderJustPlaced) {
    return (
      <OrderConfirmation 
        orderNumber={orderJustPlaced.id}
        onNewOrder={() => setOrderJustPlaced(null)}
      />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-white overflow-hidden">
      <header className="flex-shrink-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <RestaurantInfo onToggleView={toggleView} tableNumber={tableNumber} isAdminAllowed={isAdminAllowed} />
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-24 md:w-28 flex-shrink-0 bg-gray-100 overflow-y-auto">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </aside>

        <section className="flex-1 flex flex-col overflow-y-auto">
          <h2 className="sticky top-0 z-10 bg-white text-lg font-bold text-gray-800 px-4 pt-4 pb-2 border-b border-gray-200">{activeCategory}</h2>
          <div className="px-4 pb-24">
             <Menu menuData={filteredMenu} onShowDetail={handleOpenModal} />
          </div>
        </section>
      </main>

      <div className="flex-shrink-0 z-20 shadow-[-1px_0px_10px_rgba(0,0,0,0.1)]">
        {currentOrder && <CurrentOrderTracker order={currentOrder} />}
        <CartFooter 
          total={cartTotal} 
          totalItems={totalItems}
          onCartClick={() => setIsCartOpen(true)}
        />
      </div>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onPlaceOrder={placeOrder}
          onClearCart={clearCart}
          total={cartTotal}
          totalItems={totalItems}
          onClose={() => {
            setIsCartOpen(false);
            setOrderError(null);
          }}
          error={orderError}
        />
      )}
      {isModalOpen && selectedDish && (
        <DishDetailModal 
          dish={selectedDish}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default App;
