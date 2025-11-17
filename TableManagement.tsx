
import React, { useState, useEffect } from 'react';
import { type RestaurantTable } from '../types.ts';
import { TABLES_STORAGE_KEY } from '../constants.ts';
import QrCodeModal from './QrCodeModal.tsx';

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<RestaurantTable[]>(() => {
    try {
      const storedTables = localStorage.getItem(TABLES_STORAGE_KEY);
      if (!storedTables) return [];

      const parsedTables: any[] = JSON.parse(storedTables);
      // Data migration: Ensure all table IDs are strings to handle legacy data
      // and ensure consistency with UUIDs. This prevents comparison issues (e.g., 123 !== "123").
      return parsedTables.map(table => ({
        ...table,
        id: String(table.id),
      }));
    } catch (error) {
      console.error("從 localStorage 解析桌號資料時出錯", error);
      return [];
    }
  });

  const [newTableName, setNewTableName] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedTableForQr, setSelectedTableForQr] = useState<RestaurantTable | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
    } catch (error) {
      console.error("儲存桌號資料至 localStorage 時出錯", error);
    }
  }, [tables]);

  const handleAddTable = () => {
    if (newTableName.trim() === '') {
      alert('桌號不能為空');
      return;
    }
    if (tables.some(table => table.name === newTableName.trim())) {
      alert('該桌號已存在');
      return;
    }
    const newTable: RestaurantTable = {
      id: crypto.randomUUID(),
      name: newTableName.trim(),
    };
    setTables(prev => [...prev, newTable]);
    setNewTableName('');
  };

  const handleDeleteTable = (tableId: string) => {
    if (window.confirm('確定要刪除這個桌號嗎？')) {
      setTables(prev => prev.filter(table => table.id !== tableId));
    }
  };

  const handleShowQrCode = (table: RestaurantTable) => {
    setSelectedTableForQr(table);
    setIsQrModalOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">桌號管理</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTable();
          }}
          className="flex items-center gap-4 mb-6"
        >
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="例如：A01, 包廂B2"
            className="flex-grow shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            新增桌號
          </button>
        </form>
        <div className="space-y-4">
          {tables.length > 0 ? tables.map(table => (
            <div key={table.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border">
              <span className="font-bold text-lg text-gray-800">{table.name}</span>
              <div className="flex items-center gap-4">
                <button onClick={() => handleShowQrCode(table)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors">查看二維碼</button>
                <button onClick={() => handleDeleteTable(table.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors">刪除</button>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-6">尚未新增任何桌號。</p>
          )}
        </div>
      </div>
      {isQrModalOpen && selectedTableForQr && (
        <QrCodeModal
          table={selectedTableForQr}
          onClose={() => setIsQrModalOpen(false)}
        />
      )}
    </>
  );
};

export default TableManagement;