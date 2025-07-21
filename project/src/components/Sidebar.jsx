import React from 'react';
import { Home, RotateCcw, LogOut, X } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'returns', label: 'My Returns', icon: RotateCcw },
  ];

  return (
    <>
      {/* Mobile overlay - only appears on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar - Fixed on desktop, sliding overlay on mobile */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 sm:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Reloop</h1>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-1 sm:space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="mt-auto pt-4 sm:pt-6">
            <button className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors text-sm sm:text-base">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;