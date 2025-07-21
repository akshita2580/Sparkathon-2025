import React from 'react';




const ReturnCard = ({ productReturn }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'inspected': return 'text-blue-600 bg-blue-50';
      case 'assigned': return 'text-purple-600 bg-purple-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'text-green-600';
      case 'damaged': return 'text-yellow-600';
      case 'broken': return 'text-red-600';
      case 'unusable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getSuggestionColor = (suggestion) => {
    switch (suggestion) {
      case 'reuse': return 'text-green-600';
      case 'repair': return 'text-blue-600';
      case 'recycle': return 'text-purple-600';
      case 'discard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
              {productReturn.product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{productReturn.product.brand}</p>
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(productReturn.status)}`}>
            {productReturn.status.charAt(0).toUpperCase() + productReturn.status.slice(1)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Condition</p>
            <p className={`text-xs sm:text-sm font-medium ${getConditionColor(productReturn.condition)}`}>
            {productReturn.condition.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Suggestion</p>
            <p className={`text-xs sm:text-sm font-medium ${getSuggestionColor(productReturn.suggestion)}`}>
              {productReturn.suggestion.charAt(0).toUpperCase() + productReturn.suggestion.slice(1)}
            </p>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mb-3 sm:mb-4">
           <div>
            <p className="text-xs sm:text-sm text-gray-500">
              {productReturn.status === 'resolved' ? 'Earned' : 'Potential'}
            </p>
          </div> 
           <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-base sm:text-lg font-bold text-green-600">+{productReturn.pointsEarned}</span>
            <span className="text-xs sm:text-sm text-gray-500">points</span>
          </div> 
        </div> */}

        {productReturn.imageUrls.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto">
            {productReturn.imageUrls.slice(0, 3).map((url, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={url}
                  alt={`${productReturn.product.name} ${index + 1}`}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border-2 border-gray-100"
                />
              </div>
            ))}
            {productReturn.imageUrls.length > 3 && (
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">+{productReturn.imageUrls.length - 3}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnCard;