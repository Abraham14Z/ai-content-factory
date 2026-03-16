import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = ({ 
  activeTab,
  onMenuClick 
}: { 
  activeTab: string;
  onMenuClick: () => void;
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 mr-4 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 capitalize">
          {activeTab}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="bg-transparent border-none focus:outline-none text-sm w-48 lg:w-64"
          />
        </div>
        
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">John Doe</span>
        </div>
      </div>
    </header>
  );
};