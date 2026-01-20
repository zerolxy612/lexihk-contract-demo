import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

export interface ToastRef {
    addToast: (message: string, type?: 'buy' | 'sell' | 'create') => void;
}

interface Toast {
    id: number;
    message: string;
    type: 'buy' | 'sell' | 'create';
}

export const ToastContainer = forwardRef<ToastRef>((_, ref) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useImperativeHandle(ref, () => ({
        addToast: (message, type = 'buy') => {
            const id = Date.now();
            setToasts(prev => [...prev.slice(-4), { id, message, type }]); // Keep max 5
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        }
    }));

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`
            animate-in fade-in slide-in-from-right-10 duration-300 
            bg-[#15171e]/90 backdrop-blur-md border rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 min-w-[240px]
            ${toast.type === 'buy' ? 'border-green-500/30' :
                            toast.type === 'sell' ? 'border-red-500/30' : 'border-blue-500/30'}
          `}
                >
                    <div className={`p-1.5 rounded-full ${toast.type === 'buy' ? 'bg-green-500/20 text-green-400' :
                            toast.type === 'sell' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                        {toast.type === 'buy' ? '💸' : toast.type === 'sell' ? '📉' : '✨'}
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">{toast.message}</p>
                        <p className="text-white/40 text-[10px] uppercase font-bold">Just now</p>
                    </div>
                </div>
            ))}
        </div>
    );
});

ToastContainer.displayName = 'ToastContainer';
