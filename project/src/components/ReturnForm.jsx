import React, { useState } from 'react';
import { Upload, X, Calendar, Package, Tag, MessageSquare, AlertTriangle } from 'lucide-react';



const ReturnForm = ({ onSubmit, onCancel }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const initialFormData = {
    name: '',
    brand: '',
    category: '',
    reason: '',
    condition: '',
    purchaseDate: '',
    images: [],
  };
  
  const [formData, setFormData] = useState(initialFormData);
  

  const [dragActive, setDragActive] = useState(false);

  const categories = [
    'Electronics', 'Appliances', 'Clothing', 'Furniture', 
    'Books', 'Sports', 'Beauty', 'Home & Garden', 'Other'
  ];

  const reasons = [
    'Defective/Broken', 'Wrong Item', 'Poor Quality', 
    'No Longer Needed', 'Size Issue', 'Upgrade', 'Other'
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Unused, excellent condition' },
    { value: 'damaged', label: 'Slightly Damaged', description: 'Minor wear or cosmetic issues' },
    { value: 'broken', label: 'Broken', description: 'Not working properly, needs repair' },
    { value: 'unusable', label: 'Unusable', description: 'Completely broken, beyond repair' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (files) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - formData.images.length);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submit button clicked");

  
    const submitData = new FormData();
    console.log("🗾 FormData ready");

  
    submitData.append('name', formData.name);
    submitData.append('brand', formData.brand);
    submitData.append('category', formData.category);
    submitData.append('reason', formData.reason);
    submitData.append('condition', formData.condition);
    submitData.append('purchaseDate', formData.purchaseDate);
  
    formData.images.forEach((image, i) => {
      console.log(`🖼️ Image ${i + 1}:`, image);
      submitData.append('images', image);
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/returns', {
        method: 'POST',
        body: submitData,
      });
  
      if (!response.ok) {
        console.error("⚠️ Server responded with error status:", response.status);
        throw new Error('Server error');
      }
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        alert('Submission succeeded, but invalid server response.');
        return;
      }
      
      console.log('✅ Return submitted:', data);
      alert('Return submitted successfully!');
      
      // Save image URLs to state if you want to display after submit 
      if (data.return && data.return.imageIds) {
        const urls = data.return.imageIds.map(
          (id) => `http://localhost:5000/api/image/${id}`
        );
        setImageUrls(urls);  // this will trigger rendering of <img> tags
      }
      
      // Optional: clear form
      setFormData(initialFormData);

      if (onSubmit && data.return) {
        onSubmit(data.return); // ✅ only call with backend-validated object
      }
      

    } catch (error) {
      console.error('❌ Submission error:', error);
      alert('Submission failed. Please try again.');
    }
  };
  

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'border-green-200 bg-green-50';
      case 'damaged': return 'border-yellow-200 bg-yellow-50';
      case 'broken': return 'border-orange-200 bg-orange-50';
      case 'unusable': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Submit Return Request</h2>
        <p className="text-sm sm:text-base text-gray-600">Fill out the details below to request a product return</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 mr-2" />
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 mr-2" />
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 mr-2" />
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Purchase Date *
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            Reason for Return *
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
          >
            <option value="">Select reason</option>
            {reasons.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3 sm:mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Product Condition *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {conditions.map((condition) => (
              <label
                key={condition.value}
                className={`relative flex cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all hover:shadow-md ${
                  formData.condition === condition.value
                    ? `${getConditionColor(condition.value)} border-current`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  value={condition.value}
                  checked={formData.condition === condition.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                      formData.condition === condition.value
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.condition === condition.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {condition.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 ml-7">
                    {condition.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3 sm:mb-4">
            <Upload className="w-4 h-4 mr-2" />
            Product Images ({formData.images.length}/3)
          </label>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600 mb-2">Drag and drop images here, or click to select</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">PNG, JPG up to 10MB each (max 3 images)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
              id="image-upload"
              disabled={formData.images.length >= 3}
            />
            <label
              htmlFor="image-upload"
              className={`inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors ${
                formData.images.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Choose Files
            </label>
          </div>

          {formData.images.length > 0 && (
            <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            Submit Return Request
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReturnForm;