
import React, { useState, useMemo } from 'react';
import { type Dish, type Specification } from '../types';

interface DishDetailModalProps {
  dish: Dish;
  onClose: () => void;
  onAddToCart: (dish: Dish, spec: Specification | undefined, quantity: number) => void;
}

const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, onAddToCart }) => {
  const hasSpecs = dish.specifications && dish.specifications.length > 0;
  const [selectedSpec, setSelectedSpec] = useState<Specification | undefined>(hasSpecs ? dish.specifications![0] : undefined);
  const [quantity, setQuantity] = useState(1);

  const price = useMemo(() => {
    return selectedSpec?.price ?? dish.price;
  }, [selectedSpec, dish.price]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(dish, selectedSpec, quantity);
      onClose();
    }
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(q => q + 1);
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-2xl shadow-xl p-6 relative animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start space-x-4">
            <img src={dish.image} alt={dish.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{dish.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{dish.description}</p>
                 <div className="mt-2">
                    <span className="text-2xl font-bold text-red-600">¥{price.toFixed(2)}</span>
                    {dish.originalPrice && (
                    <span className="ml-2 text-sm text-gray-400 line-through">¥{dish.originalPrice.toFixed(1)}</span>
                    )}
                </div>
            </div>
        </div>
        
        {hasSpecs && (
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">规格</h3>
            <div className="flex flex-wrap gap-2">
              {dish.specifications?.map(spec => (
                <button
                  key={spec.name}
                  onClick={() => setSelectedSpec(spec)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                    selectedSpec?.name === spec.name
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-md font-semibold text-gray-700">数量</h3>
          <div className="flex items-center">
            <button
                onClick={handleDecreaseQuantity}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="减少数量"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
            <span className="w-10 text-center text-lg font-semibold text-gray-800">{quantity}</span>
            <button
                onClick={handleIncreaseQuantity}
                className="w-8 h-8 rounded-full border border-red-600 bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                aria-label="增加数量"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>

        <div className="mt-8">
            <button 
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-all duration-300 transform active:scale-95 shadow"
            >
                加入购物车
            </button>
        </div>
        
        <style>{`
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default DishDetailModal;
