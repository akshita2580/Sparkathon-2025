import React from 'react';
import { Menu, Plus } from 'lucide-react';

const Header = ({ onMenuToggle, title, onNewReturn, showNewButton }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate">{title}</h2>
        </div>
        
        {showNewButton && onNewReturn && (
          <button
            onClick={onNewReturn}
            className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Return</span>
            <span className="sm:hidden">New</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;