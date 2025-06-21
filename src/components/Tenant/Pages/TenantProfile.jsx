import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../redux/slices/tenantAuthSlice';

const TenantProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isStudent, setIsStudent] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, token } = useSelector((state) => state.tenantAuth);
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    occupation: '',
    gender: 'Male',
    
    // Address Information
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    },
    
    // Government ID
    governmentId: {
      idType: 'NationalID',
      idNumber: '',
      idDocument: null
    },
    
    // Student Verification
    isStudent: false,
    educationalInfo: {
      schoolName: '',
      faculty: '',
      courseOfStudy: '',
      academicLevel: '',
      matriculationNumber: '',
      yearOfStudy: '',
      expectedGraduationDate: ''
    },
    tenantAffairsVerificationNumber: '',
    
    // Next of Kin
    nextOfKin: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      relationship: '',
      address: ''
    },
    
    // Bank Details
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: ''
    },
    clearanceDocuments: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects in the form data
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePhoto') {
      setFormData({
        ...formData,
        [name]: files[0],
        profilePhotoPreview: URL.createObjectURL(files[0])
      });
    } else if (name === 'governmentId.document') {
      // Handle nested governmentId document
      setFormData({
        ...formData,
        governmentId: {
          ...formData.governmentId,
          document: files[0],
          documentName: files[0].name
        }
      });
    } else if (name === 'clearanceDocuments') {
      // Handle multiple clearance documents
      setFormData({
        ...formData,
        clearanceDocuments: files
      });
    } else {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGovIdChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        governmentId: {
          ...formData.governmentId,
          idDocument: file,
          idNumber: formData.governmentId.idNumber || file.name
        }
      });
    }
  };

  const handleStudentChange = (e) => {
    const isStudentValue = e.target.value === 'Yes';
    setIsStudent(isStudentValue);
    
    if (isStudentValue) {
      // If selecting Yes, update occupation to Student
      setFormData(prevState => ({
        ...prevState,
        isStudent: true,
        occupation: 'Student'
      }));
    } else {
      // If selecting No, clear educational info fields
      setFormData(prevState => ({
        ...prevState,
        isStudent: false,
        // Only reset occupation if it was 'Student'
        occupation: prevState.occupation === 'Student' ? '' : prevState.occupation,
        educationalInfo: {
          schoolName: '',
          faculty: '',
          courseOfStudy: '',
          academicLevel: '',
          matriculationNumber: '',
          yearOfStudy: '',
          expectedGraduationDate: ''
        },
        tenantAffairsVerificationNumber: ''
      }));
    }
  };

  // Fetch user profile data when component mounts
  useEffect(() => {
    // First, initialize form with Redux user data if available
    if (user) {
      console.log('Initializing form with Redux user data:', user);
      setFormData(prevState => ({
        ...prevState,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        occupation: user.occupation || '',
        gender: user.gender || '',
        tenantAffairsVerificationNumber: user.tenantAffairsVerificationNumber || '',
        
        // Initialize nested objects with user data if available
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Nigeria'
        },
        
        governmentId: {
          idType: user.governmentId?.idType || '',
          idNumber: user.governmentId?.idNumber || '',
          document: null,
          documentName: ''
        },
        
        educationalInfo: {
          schoolName: user.educationalInfo?.schoolName || '',
          faculty: user.educationalInfo?.faculty || '',
          courseOfStudy: user.educationalInfo?.courseOfStudy || '',
          matriculationNumber: user.educationalInfo?.matriculationNumber || '',
          academicLevel: user.educationalInfo?.academicLevel || '',
          yearOfStudy: user.educationalInfo?.yearOfStudy || '',
          expectedGraduationDate: user.educationalInfo?.expectedGraduationDate ? 
            new Date(user.educationalInfo.expectedGraduationDate).toISOString().split('T')[0] : ''
        },
        
        nextOfKin: {
          firstName: user.nextOfKin?.firstName || '',
          lastName: user.nextOfKin?.lastName || '',
          phoneNumber: user.nextOfKin?.phoneNumber || '',
          relationship: user.nextOfKin?.relationship || '',
          address: user.nextOfKin?.address || ''
        },
        
        bankDetails: {
          accountName: user.bankDetails?.accountName || '',
          accountNumber: user.bankDetails?.accountNumber || '',
          bankName: user.bankDetails?.bankName || ''
        },
        
        clearanceDocuments: []
      }));
      
      // Set student status based on occupation
      if (user.occupation?.toLowerCase() === 'student') {
        setIsStudent(true);
      }
    }
    
    const fetchProfileData = async () => {
      if (!token) {
        navigate('/tenant/login');
        return;
      }
      
      try {
        setIsLoading(true);
        console.log('Fetching profile data with token:', token);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tenants/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data);
        // Check if the response data structure is as expected
        const profileData = response.data.data || {};
        console.log('Profile data extracted:', profileData);
        
        if (!profileData || Object.keys(profileData).length === 0) {
          console.warn('No profile data returned from API');
          return;
        }
        
        // Debug the profile data structure
        console.log('Detailed profile data structure:', JSON.stringify(profileData, null, 2));
        
        // Update form data with fetched profile - with improved field mapping
        setFormData(prevState => ({
          ...prevState,
          firstName: profileData.firstName || prevState.firstName,
          lastName: profileData.lastName || prevState.lastName,
          email: profileData.email || prevState.email,
          phoneNumber: profileData.phoneNumber || prevState.phoneNumber,
          dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().split('T')[0] : prevState.dateOfBirth,
          occupation: profileData.occupation || prevState.occupation,
          gender: profileData.gender || prevState.gender,
          tenantAffairsVerificationNumber: profileData.tenantAffairsVerificationNumber || prevState.tenantAffairsVerificationNumber,
          
          // Handle nested address object
          address: {
            street: profileData.address?.street || prevState.address.street,
            city: profileData.address?.city || prevState.address.city,
            state: profileData.address?.state || prevState.address.state,
            zipCode: profileData.address?.zipCode || prevState.address.zipCode,
            country: profileData.address?.country || prevState.address.country
          },
          
          // Handle nested government ID object with improved field mapping
          governmentId: {
            idType: profileData.governmentId?.idType || prevState.governmentId.idType,
            idNumber: profileData.governmentId?.idNumber || prevState.governmentId.idNumber,
            document: null,
            // Handle both possible document field structures
            documentName: profileData.governmentId?.idDocument?.url ? 
              profileData.governmentId.idDocument.url.split('/').pop() : 
              (profileData.governmentId?.documentPath ? 
                profileData.governmentId.documentPath.split('/').pop() : 
                prevState.governmentId.documentName)
          },
          
          // Handle educational info with improved field mapping
          educationalInfo: {
            schoolName: profileData.educationalInfo?.schoolName || prevState.educationalInfo.schoolName,
            faculty: profileData.educationalInfo?.faculty || prevState.educationalInfo.faculty,
            courseOfStudy: profileData.educationalInfo?.courseOfStudy || prevState.educationalInfo.courseOfStudy,
            matriculationNumber: profileData.educationalInfo?.matriculationNumber || prevState.educationalInfo.matriculationNumber,
            academicLevel: profileData.educationalInfo?.academicLevel || prevState.educationalInfo.academicLevel,
            yearOfStudy: profileData.educationalInfo?.yearOfStudy || prevState.educationalInfo.yearOfStudy,
            expectedGraduationDate: profileData.educationalInfo?.expectedGraduationDate ? 
              new Date(profileData.educationalInfo.expectedGraduationDate).toISOString().split('T')[0] : 
              prevState.educationalInfo.expectedGraduationDate
          },
          
          // Handle next of kin with improved field mapping
          nextOfKin: {
            firstName: profileData.nextOfKin?.firstName || prevState.nextOfKin.firstName,
            lastName: profileData.nextOfKin?.lastName || prevState.nextOfKin.lastName,
            phoneNumber: profileData.nextOfKin?.phoneNumber || prevState.nextOfKin.phoneNumber,
            relationship: profileData.nextOfKin?.relationship || prevState.nextOfKin.relationship,
            address: profileData.nextOfKin?.address || prevState.nextOfKin.address
          },
          
          // Handle bank details
          bankDetails: {
            accountName: profileData.bankDetails?.accountName || prevState.bankDetails.accountName,
            accountNumber: profileData.bankDetails?.accountNumber || prevState.bankDetails.accountNumber,
            bankName: profileData.bankDetails?.bankName || prevState.bankDetails.bankName
          },
          
          // Handle clearance documents with improved mapping
          clearanceDocuments: profileData.clearanceDocuments?.length ? 
            profileData.clearanceDocuments.map(doc => ({
              name: doc.documentName,
              url: doc.url,
              isVerified: doc.isVerified
            })) : 
            prevState.clearanceDocuments,
          
          // Set profile photo preview if exists with improved field mapping
          profilePhotoPreview: profileData.profilePhoto?.url ? 
            profileData.profilePhoto.url : 
            (profileData.profilePhoto ? 
              `${import.meta.env.VITE_API_URL}/${profileData.profilePhoto}` : 
              prevState.profilePhotoPreview)
        }));
        
        // Set student status based on educational info or occupation
        if ((profileData.educationalInfo && 
            (profileData.educationalInfo.schoolName || 
             profileData.educationalInfo.matriculationNumber)) ||
            profileData.occupation?.toLowerCase() === 'student') {
          setIsStudent(true);
        }
        
        toast.success('Profile data loaded successfully');
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data from server, using local data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [token, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Determine if we have any files to upload
      const hasFiles = 
        (formData.profilePhoto instanceof File) || 
        (formData.governmentId?.document instanceof File) || 
        (formData.clearanceDocuments && formData.clearanceDocuments.length > 0);
      
      let response;
      
      // If we have files, use FormData approach
      if (hasFiles) {
        // Create a FormData object to handle file uploads
        const formDataToSend = new FormData();
        
        // Add profile photo if it exists and is a File object
        if (formData.profilePhoto instanceof File) {
          formDataToSend.append('profilePhoto', formData.profilePhoto);
        }

        // Add government ID document if it exists
        if (formData.governmentId?.document instanceof File) {
          formDataToSend.append('governmentIdDocument', formData.governmentId.document);
        }

        // Add clearance documents if they exist
        if (formData.clearanceDocuments && formData.clearanceDocuments.length > 0) {
          Array.from(formData.clearanceDocuments).forEach((file) => {
            formDataToSend.append('clearanceDocuments', file);
          });
        }

        // Convert the form data to a JSON string and append it
        const profileData = { ...formData };
        
        // Remove file objects before JSON conversion
        delete profileData.profilePhoto;
        delete profileData.profilePhotoPreview;
        if (profileData.governmentId) {
          delete profileData.governmentId.document;
        }
        delete profileData.clearanceDocuments;
        
        // Make sure isStudent is properly set
        profileData.isStudent = isStudent;
        
        // Add an empty password field to avoid backend errors with Google OAuth users
        profileData.password = user?.password || '';

        // Append the JSON string to the FormData
        formDataToSend.append('profileData', JSON.stringify(profileData));

        console.log('Submitting profile update with FormData');
        // Send the update request with FormData
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/tenants/profile`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // No files to upload, use regular JSON
        const profileData = { ...formData };
        
        // Remove any preview data
        delete profileData.profilePhotoPreview;
        
        // Make sure isStudent is properly set
        profileData.isStudent = isStudent;
        
        // Add an empty password field to avoid backend errors with Google OAuth users
        profileData.password = user?.password || '';
        
        console.log('Submitting profile update with JSON data');
        // Send the update request with JSON
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/tenants/profile`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      console.log('Profile update response:', response.data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
      // Update local state with the response data
      // Check for different response data structures
      const updatedTenant = response.data.tenant || response.data.data || {};
      
      if (updatedTenant && Object.keys(updatedTenant).length > 0) {
        console.log('Updating form with server response data:', updatedTenant);
        
        // Create an updated user object for Redux store
        const updatedUserData = {
          ...user,
          firstName: updatedTenant.firstName || user.firstName,
          lastName: updatedTenant.lastName || user.lastName,
          email: updatedTenant.email || user.email,
          phoneNumber: updatedTenant.phoneNumber || user.phoneNumber,
          profilePhoto: updatedTenant.profilePhoto || user.profilePhoto,
          occupation: updatedTenant.occupation || user.occupation,
          gender: updatedTenant.gender || user.gender,
          // Include other fields that should be updated in the Redux store
        };
        
        // Update Redux store with the new user data
        dispatch(updateUser(updatedUserData));
        
        // Update the form data with the new values from the server
        setFormData(prevState => ({
          ...prevState,
          firstName: updatedTenant.firstName || prevState.firstName,
          lastName: updatedTenant.lastName || prevState.lastName,
          email: updatedTenant.email || prevState.email,
          phoneNumber: updatedTenant.phoneNumber || prevState.phoneNumber,
          dateOfBirth: updatedTenant.dateOfBirth ? new Date(updatedTenant.dateOfBirth).toISOString().split('T')[0] : prevState.dateOfBirth,
          occupation: updatedTenant.occupation || prevState.occupation,
          gender: updatedTenant.gender || prevState.gender,
          tenantAffairsVerificationNumber: updatedTenant.tenantAffairsVerificationNumber || prevState.tenantAffairsVerificationNumber,
          
          // Preserve nested objects structure
          address: updatedTenant.address || prevState.address,
          governmentId: {
            ...prevState.governmentId,
            idType: updatedTenant.governmentId?.idType || prevState.governmentId.idType,
            idNumber: updatedTenant.governmentId?.idNumber || prevState.governmentId.idNumber,
            documentName: updatedTenant.governmentId?.documentPath ? 
              updatedTenant.governmentId.documentPath.split('/').pop() : prevState.governmentId.documentName
          },
          educationalInfo: updatedTenant.educationalInfo || prevState.educationalInfo,
          nextOfKin: updatedTenant.nextOfKin || prevState.nextOfKin,
          bankDetails: updatedTenant.bankDetails || prevState.bankDetails,
          
          // Keep the preview if it exists
          profilePhotoPreview: updatedTenant.profilePhoto ? 
            `${import.meta.env.VITE_API_URL}/${updatedTenant.profilePhoto}` : 
            prevState.profilePhotoPreview
        }));
        
        // Update isStudent state based on occupation
        if (updatedTenant.occupation?.toLowerCase() === 'student' || 
            (updatedTenant.educationalInfo && Object.keys(updatedTenant.educationalInfo).length > 0)) {
          setIsStudent(true);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Information</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Profile Picture</h2>
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={imagePreview || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
                {isEditing && (
                  <div className="mt-2">
                    <label 
                      htmlFor="profileImage" 
                      className="bg-orange-500 text-white px-3 py-1 rounded-md cursor-pointer text-sm hover:bg-orange-600 transition"
                    >
                      Select Image
                    </label>
                    <input 
                      type="file" 
                      id="profileImage" 
                      accept="image/*" 
                      onChange={handleProfileImageChange} 
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter your first name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter your last name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter your email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  name="address.street" 
                  value={formData.address.street} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  name="address.city" 
                  value={formData.address.city} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input 
                  type="text" 
                  name="address.state" 
                  value={formData.address.state} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input 
                  type="text" 
                  name="address.zipCode" 
                  value={formData.address.zipCode} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select 
                  name="address.country" 
                  value={formData.address.country} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
          </div>

          {/* Government ID Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Government ID</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                <select 
                  name="governmentId.idType" 
                  value={formData.governmentId.idType} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="Passport">Passport</option>
                  <option value="NationalID">National ID</option>
                  <option value="DriversLicense">Driver's License</option>
                  <option value="StudentIDCard">Student ID Card</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input 
                  type="text" 
                  name="governmentId.idNumber" 
                  value={formData.governmentId.idNumber} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Document</label>
              {isEditing ? (
                <div>
                  <input 
                    type="file" 
                    id="govIdFile" 
                    onChange={handleGovIdChange} 
                    className="hidden"
                  />
                  <label 
                    htmlFor="govIdFile" 
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-300 transition"
                  >
                    Choose File
                  </label>
                  <span className="ml-2">{formData.governmentId.idDocument ? formData.governmentId.idDocument.name : 'No file chosen'}</span>
                </div>
              ) : (
                <div className="p-2 border border-gray-300 rounded-md">
                  {formData.governmentId.idNumber || 'No ID document uploaded'}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Please note: ID should be in .jpg, .jpeg or .png format. File size should not be more than 2MB. ID cards should be related to access BREICS resources.</p>
            </div>
          </div>

          {/* Student Verification Section */}
          <div className="border border-green-200 rounded-lg p-4 mb-6 bg-green-50">
            <h2 className="text-lg font-semibold mb-2">Student Verification</h2>
            <p className="text-sm mb-4">This section is mandatory only for a student account.</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Are you a student?</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="isStudent" 
                    value="Yes" 
                    checked={isStudent} 
                    onChange={handleStudentChange} 
                    disabled={!isEditing} 
                    className="form-radio h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="isStudent" 
                    value="No" 
                    checked={!isStudent} 
                    onChange={handleStudentChange} 
                    disabled={!isEditing} 
                    className="form-radio h-4 w-4 text-orange-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {isStudent && (
                <p className="text-xs text-gray-500 mt-1">Please note: indicate if you are a student, so as to benefit from our student discount. Make sure to upload your student ID card.</p>
              )}
            </div>

            {isStudent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School name *</label>
                  <input 
                    type="text" 
                    name="educationalInfo.schoolName" 
                    value={formData.educationalInfo.schoolName} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Faculty *</label>
                  <input 
                    type="text" 
                    name="educationalInfo.faculty" 
                    value={formData.educationalInfo.faculty} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course of study *</label>
                  <input 
                    type="text" 
                    name="educationalInfo.courseOfStudy" 
                    value={formData.educationalInfo.courseOfStudy} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matric Number *</label>
                  <input 
                    type="text" 
                    name="educationalInfo.matriculationNumber" 
                    value={formData.educationalInfo.matriculationNumber} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Level</label>
                  <input 
                    type="text" 
                    name="educationalInfo.academicLevel" 
                    value={formData.educationalInfo.academicLevel} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                  <input 
                    type="number" 
                    name="educationalInfo.yearOfStudy" 
                    value={formData.educationalInfo.yearOfStudy} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation Date</label>
                  <input 
                    type="date" 
                    name="educationalInfo.expectedGraduationDate" 
                    value={formData.educationalInfo.expectedGraduationDate} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Affairs Verification Number</label>
                  <input 
                    type="text" 
                    name="tenantAffairsVerificationNumber" 
                    value={formData.tenantAffairsVerificationNumber} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clearance Documents</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="clearanceDocuments" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                          <span>Upload files</span>
                          <input 
                            id="clearanceDocuments" 
                            name="clearanceDocuments" 
                            type="file" 
                            className="sr-only" 
                            multiple
                            onChange={handleFileChange} 
                            disabled={!isEditing}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                  {formData.clearanceDocuments && formData.clearanceDocuments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected files:</p>
                      <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                        {Array.from(formData.clearanceDocuments).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Next of Kin Section */}
          <div className="mb-6 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Next of Kin Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  name="nextOfKin.firstName" 
                  value={formData.nextOfKin.firstName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="nextOfKin.lastName" 
                  value={formData.nextOfKin.lastName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  name="nextOfKin.phoneNumber" 
                  value={formData.nextOfKin.phoneNumber} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input 
                  type="text" 
                  name="nextOfKin.relationship" 
                  value={formData.nextOfKin.relationship} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  name="nextOfKin.address" 
                  value={formData.nextOfKin.address} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="mb-6 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Bank Details</h2>
            <p className="text-sm mb-4">This information is used for refunds and other financial transactions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                <input 
                  type="text" 
                  name="bankDetails.accountName" 
                  value={formData.bankDetails.accountName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input 
                  type="text" 
                  name="bankDetails.accountNumber" 
                  value={formData.bankDetails.accountNumber} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input 
                  type="text" 
                  name="bankDetails.bankName" 
                  value={formData.bankDetails.bankName} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div className="mb-6 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Profile Status</h2>
            <div className="p-3 rounded-md bg-gray-100">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${user?.profileStatus === 'Verified' ? 'bg-green-500' : user?.profileStatus === 'PendingAdminReview' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span>{user?.profileStatus || 'Not Verified'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {user?.profileStatus === 'Verified' ? 'Your profile has been verified by admin.' : 
                 user?.profileStatus === 'PendingAdminReview' ? 'Your profile is pending admin review.' : 
                 'Please complete your profile to proceed with verification.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            {isEditing ? (
              <button 
                type="submit" 
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Save changes
              </button>
            ) : (
              <button 
                type="button" 
                onClick={() => setIsEditing(true)} 
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantProfile;