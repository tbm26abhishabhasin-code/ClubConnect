
import React, { useEffect } from 'react';
import { ToastMessage } from '../types';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const baseStyle = "font-semibold tracking-wide transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] border border-transparent",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    outline: "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
    danger: "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 hover:text-red-300"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className = '', rightElement, ...props }) => (
  <div className="relative w-full group">
    <input
      className={`w-full bg-zinc-900/50 text-white border border-zinc-800 rounded-none px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-zinc-600 ${rightElement ? 'pr-12' : ''} ${className}`}
      {...props}
    />
    {rightElement && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 flex items-center justify-center">
        {rightElement}
      </div>
    )}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <div className="relative w-full">
    <select
      className={`w-full appearance-none bg-zinc-900/50 text-white border border-zinc-800 rounded-none px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-zinc-600 ${className}`}
      {...props}
    >
      {children}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea
    className={`w-full bg-zinc-900/50 text-white border border-zinc-800 rounded-none px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-zinc-600 ${className}`}
    {...props}
  />
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`relative group bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 hover:border-white/20 transition-all duration-500 hover:bg-zinc-800/60 overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void; className?: string }> = ({ children, active = false, onClick, className = '' }) => (
  <span 
    onClick={onClick}
    className={`px-3 py-1 text-xs font-medium uppercase tracking-wider border transition-all cursor-default ${onClick ? 'cursor-pointer' : ''} ${active ? 'bg-white text-black border-white' : 'text-zinc-400 border-zinc-800 bg-zinc-900/80 hover:border-zinc-600'} ${className}`}
  >
    {children}
  </span>
);

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-zinc-900 border border-white/10 w-full max-w-lg p-6 animate-in zoom-in-95 duration-200 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white"><X size={20}/></button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const Toast: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[110] flex flex-col gap-2">
            {toasts.map(toast => (
                <div 
                    key={toast.id}
                    className={`flex items-center gap-3 p-4 min-w-[300px] border shadow-lg animate-in slide-in-from-right duration-300 ${
                        toast.type === 'success' ? 'bg-zinc-900 border-green-500/50 text-green-400' :
                        toast.type === 'error' ? 'bg-zinc-900 border-red-500/50 text-red-400' :
                        'bg-zinc-900 border-blue-500/50 text-blue-400'
                    }`}
                >
                    {toast.type === 'success' && <CheckCircle size={20} />}
                    {toast.type === 'error' && <AlertCircle size={20} />}
                    {toast.type === 'info' && <Info size={20} />}
                    <span className="text-sm font-medium text-white">{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)} className="ml-auto text-zinc-500 hover:text-white"><X size={16}/></button>
                </div>
            ))}
        </div>
    );
};
