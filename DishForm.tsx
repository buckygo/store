
import React, { useState, useEffect } from 'react';
import { type Dish, type Specification } from '../types';

interface DishFormProps {
  dish: Dish | null;
  onSave: (dish: Omit<Dish, 'id'> & { id?: string }) => void;
  onClose: () => void;
}

const DishForm: React.FC<DishFormProps> = ({ dish, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Dish, 'id'>>({
    name: '',
    subtitle: '',
    description: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: '',
    specifications: [],
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name,
        subtitle: dish.subtitle || '',
        description: dish.description,
        price: dish.price,
        originalPrice: dish.originalPrice || 0,
        image: dish.image,
        category: dish.category,
        specifications: dish.specifications || [],
      });
    } else {
      setFormData({ name: '', subtitle: '', description: '', price: 0, originalPrice: 0, image: '', category: '', specifications: [] });
    }
  }, [dish]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: (name === 'price' || name === 'originalPrice') ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSpecChange = (index: number, field: keyof Specification, value: string | number) => {
    const newSpecs = [...(formData.specifications || [])];
    newSpecs[index] = { ...newSpecs[index], [field]: field === 'price' ? parseFloat(value as string) || 0 : value };
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };
  
  const addSpecification = () => {
    const newSpecs = [...(formData.specifications || []), { name: '', price: 0 }];
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const removeSpecification = (index: number) => {
    const newSpecs = (formData.specifications || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || formData.price <= 0) {
      alert('請填寫所有必填欄位 (名稱、分類、价格)。');
      return;
    }
    const dishToSave: Omit<Dish, 'id'> & { id?: string } = {
      id: dish?.id,
      ...formData,
      originalPrice: formData.originalPrice || undefined,
      subtitle: formData.subtitle || undefined,
      specifications: formData.specifications && formData.specifications.length > 0 ? formData.specifications : undefined,
    };
    onSave(dishToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{dish ? '編輯餐點' : '新增餐點'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">名稱*</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="subtitle">副標題 (選填)</label>
            <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">描述</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" rows={2} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="price">基础售价*</label>
              <input type="number" step="0.01" name="price" id="price" value={formData.price} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="originalPrice">原价 (選填)</label>
              <input type="number" step="0.01" name="originalPrice" id="originalPrice" value={formData.originalPrice} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" />
            </div>
          </div>
          <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">分類*</label>
              <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">圖片網址*</label>
            <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">餐點規格 (選填)</h3>
            <div className="space-y-3">
              {(formData.specifications || []).map((spec, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <input
                    type="text"
                    placeholder="規格名稱"
                    value={spec.name}
                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                    className="flex-1 shadow-sm border rounded py-2 px-3 text-gray-700"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="价格"
                    value={spec.price}
                    onChange={(e) => handleSpecChange(index, 'price', e.target.value)}
                    className="w-28 shadow-sm border rounded py-2 px-3 text-gray-700"
                  />
                  <button type="button" onClick={() => removeSpecification(index)} className="text-red-500 hover:text-red-700 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              ))}
            </div>
             <button
              type="button"
              onClick={addSpecification}
              className="mt-3 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
            >
              + 新增規格
            </button>
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">取消</button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">儲存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DishForm;