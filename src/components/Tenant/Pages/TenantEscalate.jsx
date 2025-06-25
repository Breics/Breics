import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { tenantTicketService } from '../api/tenantApiService';

const TenantEscalate = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.tenantAuth);
  const fileInputRef = useRef(null);
  
  const [userProperties, setUserProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    images: []
  });
  
  // Fetch user's properties on component mount
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        // In a production environment, we would make an API call to get the user's properties
        // For example: const response = await tenantProfileService.getTenantProperties();
        
        // For now, we'll simulate having one property
        setUserProperties([{
          id: '60f7b0b9e6b3f32b4c9a1234',
          title: 'Sample Property',
          address: '123 Main St',
          status: 'active'
        }]);
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast.error('Failed to load your properties. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProperties();
    
    // Clean up function to revoke any object URLs when component unmounts
    return () => {
      formData.images.forEach(img => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, []);
  
  const hasActiveRentals = userProperties.length > 0;
  
  const categories = [
    'Wiring',
    'Plumbing',
    'Heating',
    'Cooling',
    'Appliances',
    'Structural',
    'Other'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Limit to max 4 images total
      const newImages = [...formData.images];
      
      files.forEach(file => {
        if (newImages.length < 4) {
          // Create preview URL
          const imageUrl = URL.createObjectURL(file);
          newImages.push({
            file,
            preview: imageUrl
          });
        }
      });
      
      setFormData({
        ...formData,
        images: newImages
      });
    }
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages
    });
  };
  
  const handleCancel = () => {
    navigate('/tenant/facility');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!hasActiveRentals) {
      toast.error("You don't have an active rental yet!");
      return;
    }
    
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    // Set loading state while submitting
    setIsSubmitting(true);
    
    // Create FormData object for multipart/form-data submission (required for file uploads)
    const ticketFormData = new FormData();
    
    // Add text fields
    ticketFormData.append('title', formData.title);
    ticketFormData.append('description', formData.description);
    ticketFormData.append('category', formData.category);
    ticketFormData.append('propertyId', userProperties[0]?.id || '60f7b0b9e6b3f32b4c9a1234');
    
    // Add image files
    formData.images.forEach((imageObj, index) => {
      ticketFormData.append('images', imageObj.file);
    });
    
    // Submit the ticket using the API service
    tenantTicketService.createTicket(ticketFormData)
      .then(response => {
        console.log('Ticket created successfully:', response.data);
        toast.success("Issue submitted successfully!");
        
        // Clean up any object URLs to prevent memory leaks
        formData.images.forEach(img => {
          if (img.preview) URL.revokeObjectURL(img.preview);
        });
        
        // Navigate back to facility page
        navigate('/tenant/facility');
      })
      .catch(error => {
        console.error('Error submitting ticket:', error);
        toast.error(error.response?.data?.message || "Failed to submit issue. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mx-auto md:mt-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">Escalate Issue</h1>
          <button 
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Escalate an Issue with your Home</h2>
            <p className="text-sm text-gray-500 mb-4">Create a ticket to report issue with your home for repairs</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Escalation Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief title of the issue"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the issue"
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attach supporting images <span className="text-xs text-gray-500">(min of 2 and max. of 4 photos)</span>
              </label>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                    <img 
                      src={image.preview} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))}
                
                {formData.images.length < 4 && (
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-orange-500"
                  >
                    <FaPlus className="text-gray-400" />
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Save & Submit'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default TenantEscalate;
