
import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        {categories.map((category) => (
            <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-center px-1 py-4 text-sm font-semibold transition-colors duration-200 ${
                activeCategory === category
                ? 'bg-white text-red-600 border-l-4 border-red-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            >
            {category}
            </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
