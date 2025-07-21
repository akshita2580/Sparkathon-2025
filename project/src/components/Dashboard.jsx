import React from 'react';
import { BarChart3, TrendingUp, Package, Recycle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Returns', value: '4', icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Points Earned', value: '140', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Items Recycled', value: '2', icon: Recycle, color: 'text-purple-600 bg-purple-50' },
    { label: 'Success Rate', value: '90%', icon: BarChart3, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome back!</h2>
        <p className="text-sm sm:text-base text-gray-600">Here's an overview of your return activities</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { action: 'New return submitted', item: 'wood', time: '1 day ago', status: 'sucess' },
              { action: 'Points awarded', item: '20 points', time: '2 days ago', status: 'success' },
              { action: 'Return processed', item: 'Mobile', time: '3 days ago', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.item}</p>
                </div>
                <p className="text-xs text-gray-500 flex-shrink-0">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">1.4 kg</div>
              <p className="text-sm sm:text-base text-gray-600">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">2</div>
              <p className="text-sm sm:text-base text-gray-600">Items Diverted from Landfill</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Great job! Your returns have helped save the equivalent of 3 trees this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;