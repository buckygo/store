
import { type Dish } from './types';

export const RESTAURANT_NAME = "中正广场餐厅";
export const MENU_STORAGE_KEY = 'restaurant-menu-data';
export const ORDERS_STORAGE_KEY = 'restaurant-orders-data';
export const TABLES_STORAGE_KEY = 'restaurant-tables-data';

export const INITIAL_MENU_DATA: Dish[] = [
  {
    id: '1',
    name: '早餐周末疯狂拼',
    subtitle: '四拼66折',
    description: '多款产品任拼，超值优惠，活力满满一整天。',
    price: 13.2,
    originalPrice: 20,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '周末疯狂拼',
  },
  {
    id: '2',
    name: '早餐周末疯狂拼',
    subtitle: '六拼55折',
    description: '更多选择，更多欢笑，家庭分享首选。',
    price: 16.2,
    originalPrice: 30,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '周末疯狂拼',
  },
  {
    id: '3',
    name: '早餐周末疯狂拼',
    subtitle: '八拼5折',
    description: '终极优惠，派对必备，美味无需等待。',
    price: 20,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '周末疯狂拼',
  },
  {
    id: '4',
    name: '经典帕尼尼套餐',
    description: '含经典帕尼尼、薯条及中杯可乐。',
    price: 35,
    image: 'https://images.unsplash.com/photo-1484723051597-626151182a54?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '人气热卖',
  },
  {
    id: '5',
    name: '香脆鸡腿堡',
    description: '整块无骨鸡腿肉，香脆多汁。',
    price: 28,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '人气热卖',
    specifications: [
      { name: '单点', price: 28 },
      { name: '套餐(含薯条+可乐)', price: 42 },
    ]
  },
  {
    id: '6',
    name: '美式炒蛋早餐盘',
    description: '含炒蛋、培根、香肠和烤面包。',
    price: 42,
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '西式早餐',
  },
  {
    id: '7',
    name: '皮蛋瘦肉粥',
    description: '绵密粥底，搭配皮蛋和瘦肉丝。',
    price: 18,
    image: 'https://images.unsplash.com/photo-1544034325-a75d50129c8c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: '中式早餐',
  },
   {
    id: '8',
    name: '单人炸鸡餐',
    description: '两块吮指原味鸡 + 薯条 + 饮料。',
    price: 45,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    category: 'OK餐单人餐',
    specifications: [
      { name: '配可乐', price: 45 },
      { name: '配雪碧', price: 45 },
      { name: '配橙汁(+¥2)', price: 47 },
    ]
  },
];