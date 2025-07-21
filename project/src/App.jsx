import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ReturnCard from './components/ReturnCard';
import ReturnForm from './components/ReturnForm';
// import { mockReturns } from './data/mockData';
import axios from 'axios';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/returns');
        const fetchedReturns = res.data.map((ret) => ({
          id: ret._id,
          userId: ret.userId,
          product: ret.product,
          reason: ret.reason,
          condition: ret.condition,
          imageUrls: ret.imageIds.map((id) => `http://localhost:5000/api/image/${id}`),
          suggestion: ret.suggestion,
          status: ret.status,
          createdAt: ret.createdAt,
        }));
        setReturns(fetchedReturns);
      } catch (err) {
        console.error("Error fetching returns:", err);
      }
    };
  
    fetchReturns();
  }, []);
  
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  const handleNewReturn = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = (saved) => {
    const newReturn = {
      id: saved._id,
      userId: saved.userId,
      product: saved.product,
      reason: saved.reason,
      condition: saved.condition,
      imageUrls: saved.imageIds.map((id) => `http://localhost:5000/api/image/${id}`),
      suggestion: saved.suggestion,
      status: saved.status,
      createdAt: saved.createdAt,
    };
  
    setReturns(prev => [newReturn, ...prev]);
    setCurrentView('returns');
  };
  
  const handleFormCancel = () => {
    setCurrentView('returns');
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'returns': return 'My Returns';
      case 'form': return 'New Return Request';
      default: return 'EcoSort';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'returns':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm sm:text-base text-gray-600">
                You have {returns.length} return{returns.length !== 1 ? 's' : ''} in total
              </p>
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {returns.map((productReturn) => (
                <ReturnCard key={productReturn.id} productReturn={productReturn} />
              ))}
            </div>
            {returns.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No returns yet</h3>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">Start by submitting your first return request</p>
                <button
                  onClick={handleNewReturn}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Submit First Return
                </button>
              </div>
            )}
          </div>
        );
      case 'form':
        return (
          <ReturnForm 
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Always visible on desktop, overlay on mobile */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      
      {/* Main content - Adjusts based on screen size */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        <Header
          onMenuToggle={handleSidebarToggle}
          title={getHeaderTitle()}
          onNewReturn={currentView === 'returns' ? handleNewReturn : undefined}
          showNewButton={currentView === 'returns'}
        />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;