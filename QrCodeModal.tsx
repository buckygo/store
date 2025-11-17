
import React, { useRef, useEffect, useState } from 'react';
import { type RestaurantTable } from '../types.ts';

interface QrCodeModalProps {
  table: RestaurantTable;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ table, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!table || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const url = `${window.location.origin}${window.location.pathname}?table=${table.name}`;
    
    // The QRCode library is now loaded from index.html, so it should be on the window object.
    const QRCode = (window as any).QRCode;

    if (QRCode) {
        QRCode.toCanvas(canvas, url, { width: 256, margin: 1 }, (error: Error | null) => {
            if (error) {
                console.error('QR Code generation failed:', error);
                setErrorMessage('生成二维码时出错，请重试。');
                setStatus('error');
            } else {
                setStatus('success');
            }
        });
    } else {
        // This should not happen if the script is in index.html, but it's a good safeguard.
        console.error('QRCode library not found.');
        setErrorMessage('无法加载二维码库，请刷新页面重试。');
        setStatus('error');
    }

  }, [table]);

  const handleDownload = () => {
    if (canvasRef.current && status === 'success') {
      const link = document.createElement('a');
      link.download = `桌號-${table.name}-二維碼.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handlePrint = () => {
    if (canvasRef.current && status === 'success') {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const windowContent = `
            <!DOCTYPE html>
            <html>
                <head><title>打印二維碼 - 桌號 ${table.name}</title></head>
                <body style="text-align: center; margin-top: 50px;">
                    <h2 style="font-family: sans-serif;">桌號: ${table.name}</h2>
                    <img src="${dataUrl}" style="width: 300px; height: 300px;" />
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
            </html>
        `;
        const printWin = window.open('', '', 'width=400,height=400');
        printWin?.document.write(windowContent);
        printWin?.document.close();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm text-center"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">桌號: {table.name}</h2>
        <div className="flex justify-center items-center my-4 w-[256px] h-[256px] mx-auto bg-gray-100 rounded-lg">
           {status === 'loading' && <p className="text-gray-500">正在生成二维码...</p>}
           {status === 'error' && <p className="text-red-500 px-4">{errorMessage}</p>}
           <canvas ref={canvasRef} style={{ display: status === 'success' ? 'block' : 'none' }} />
        </div>
        <p className="text-sm text-gray-500 mb-6">掃描此二維碼開始點餐</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleDownload} disabled={status !== 'success'} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">下載</button>
          <button onClick={handlePrint} disabled={status !== 'success'} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">打印</button>
        </div>
        <button onClick={onClose} className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg">關閉</button>
      </div>
    </div>
  );
};

export default QrCodeModal;