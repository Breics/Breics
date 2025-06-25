import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaCalendarAlt, FaBriefcase, FaIdCard, FaSchool, FaGraduationCap, FaFileAlt, FaUserFriends } from 'react-icons/fa';
import { completeProfile, reset } from '../redux/slices/tenantProfileSlice';
import { loginTenant } from '../redux/slices/tenantAuthSlice';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, token } = useSelector((state) => state.tenantAuth);
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tenantProfile);
  
  // Check if user is logged in, email is verified, and profile status
  useEffect(() => {
    console.log('CompleteProfile - Current user state:', user);
    
    if (!user) {
      console.log('No user found, redirecting to login');
      navigate('/tenant/login');
    } else if (!user.isEmailVerified) {
      console.log('Email not verified, redirecting to verification page');
      navigate('/verify-email');
    } else if (user.profileStatus && 
              ['PendingAdminReview', 'Verified', 'Rejected', 'ProfileUpdateRequired'].includes(user.profileStatus)) {
      // If profile is already completed (any status beyond EmailVerified), redirect to dashboard
      console.log(`Profile already in status ${user.profileStatus}, redirecting to dashboard`);
      navigate('/tenant/dashboard');
    } else if (user.profileStatus === 'EmailVerified') {
      console.log('Email verified, ready for profile completion');
    } else {
      console.log(`Unknown profile status: ${user.profileStatus}, proceeding with profile completion`);
    }
  }, [user, navigate]);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!token) {
      // Try to get token from localStorage
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!storedToken || !storedUser) {
        // If no token or user in localStorage, redirect to login
        alert('You must be logged in to complete your profile.');
        navigate('/tenant/login');
      }
    }
  }, [token, navigate]);

  // Redirect on successful profile completion
  useEffect(() => {
    if (isSuccess) {
      // Update user in localStorage with new profile status
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        user.profileStatus = 'PendingAdminReview';
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      // Show success message and redirect to dashboard
      alert('Profile completed successfully! Your profile is now pending verification by an administrator.');
      
      // Add a small delay before redirecting to ensure the alert is seen
      setTimeout(() => {
        navigate('/tenant/dashboard');
      }, 1000);
    }
  }, [isSuccess, navigate]);
  
  // Form state with multiple steps
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    dateOfBirth: '',
    occupation: '',
    
    // Government ID
    idType: 'National ID',
    idNumber: '',
    
    // School Information
    school: '',
    faculty: '',
    course: '',
    academicLevel: '',
    matriculationNumber: '',
    studentAffairsVerificationNumber: '',
    
    // Next of Kin
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
    nextOfKinAddress: '',
    
    // Documents
    documents: {
      governmentId: null,
      schoolId: null,
      clearanceDocument: null
    }
  });
  
  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        [name]: files[0]
      }
    }));
  };
  
  // Move to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  // Move to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!token) {
      alert('You need to be logged in to complete your profile.');
      navigate('/tenant/login');
      return;
    }
    
    try {
      // Create FormData object for file uploads
      const profileFormData = new FormData();
      
      // Add basic fields (excluding special handling fields)
      const specialFields = ['documents', 'idType', 'idNumber', 'school', 'faculty', 'course', 'academicLevel', 
                           'matriculationNumber', 'nextOfKinName', 'nextOfKinRelationship', 'nextOfKinPhone', 'nextOfKinAddress'];
      
      Object.keys(formData).forEach(key => {
        if (!specialFields.includes(key) && key !== 'documents') {
          profileFormData.append(key, formData[key]);
          console.log(`Adding form field: ${key} = ${formData[key]}`);
        }
      });
      
      // Add government ID fields properly nested
      profileFormData.append('governmentId[idType]', formData.idType || '');
      profileFormData.append('governmentId[idNumber]', formData.idNumber || '');
      console.log(`Adding government ID type: ${formData.idType}`);
      console.log(`Adding government ID number: ${formData.idNumber}`);
      
      // Add nested objects for educational info
      profileFormData.append('educationalInfo[schoolName]', formData.school || '');
      profileFormData.append('educationalInfo[faculty]', formData.faculty || '');
      profileFormData.append('educationalInfo[courseOfStudy]', formData.course || '');
      profileFormData.append('educationalInfo[academicLevel]', formData.academicLevel || '');
      profileFormData.append('educationalInfo[matriculationNumber]', formData.matriculationNumber || '');
      
      // Add nested objects for next of kin
      profileFormData.append('nextOfKin[firstName]', formData.nextOfKinName || '');
      profileFormData.append('nextOfKin[relationship]', formData.nextOfKinRelationship || '');
      profileFormData.append('nextOfKin[phoneNumber]', formData.nextOfKinPhone || '');
      profileFormData.append('nextOfKin[address]', formData.nextOfKinAddress || '');
      
      // Add document files
      if (formData.documents) {
        // Handle document uploads with proper field mapping
        if (formData.documents.governmentId) {
          profileFormData.append('governmentId[idDocument]', formData.documents.governmentId);
          console.log(`Appending government ID document: ${formData.documents.governmentId.name}`);
        }
        
        if (formData.documents.schoolId) {
          profileFormData.append('schoolId', formData.documents.schoolId);
          console.log(`Appending school ID document: ${formData.documents.schoolId.name}`);
        }
        
        if (formData.documents.clearanceDocument) {
          // For clearance documents, we need to append to an array
          profileFormData.append('clearanceDocuments', formData.documents.clearanceDocument);
          console.log(`Appending clearance document: ${formData.documents.clearanceDocument.name}`);
        }
      }
      
      // Set profileStatus explicitly
      profileFormData.append('profileStatus', 'PendingAdminReview');
      profileFormData.append('tenantAffairsVerificationNumber', formData.studentAffairsVerificationNumber || '');
      
      console.log('Submitting profile completion form with fields:', 
        Array.from(profileFormData.entries()).map(([key]) => key));
      
      dispatch(completeProfile(profileFormData));
    } catch (error) {
      console.error('Error preparing form data:', error);
      alert('There was an error preparing your profile data. Please try again.');
    }
  };
  
  // Form validation for each step
  const validateStep = () => {
    switch (currentStep) {
      case 1: // Personal Information
        return formData.dateOfBirth && formData.occupation;
      case 2: // Government ID
        return formData.idType && formData.idNumber;
      case 3: // School Information
        return formData.school && formData.faculty && formData.course && 
               formData.academicLevel && formData.matriculationNumber;
      case 4: // Next of Kin
        return formData.nextOfKinName && formData.nextOfKinRelationship && 
               formData.nextOfKinPhone;
      case 5: // Documents
        return formData.documents.governmentId && formData.documents.schoolId;
      default:
        return false;
    }
  };
  
  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaUser className="mr-2 text-orange-500" /> Personal Information
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Your occupation"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaIdCard className="mr-2 text-orange-500" /> Government ID
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              >
                <option value="">Select ID Type</option>
                <option value="NationalID">National ID</option>
                <option value="Passport">Passport</option>
                <option value="DriversLicense">Driver's License</option>
                <option value="StudentIDCard">Student ID Card</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Your ID number"
                required
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaSchool className="mr-2 text-orange-500" /> School Information
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Your school name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Your faculty"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Your course of study"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Academic Level</label>
              <select
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              >
                <option value="">Select level</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Matriculation Number</label>
              <input
                type="text"
                name="matriculationNumber"
                value={formData.matriculationNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Your matriculation number"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Affairs Verification Number</label>
              <input
                type="text"
                name="studentAffairsVerificationNumber"
                value={formData.studentAffairsVerificationNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Verification number (if applicable)"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaUserFriends className="mr-2 text-orange-500" /> Next of Kin
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="nextOfKinName"
                value={formData.nextOfKinName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Next of kin full name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
              <select
                name="nextOfKinRelationship"
                value={formData.nextOfKinRelationship}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              >
                <option value="">Select relationship</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="nextOfKinPhone"
                value={formData.nextOfKinPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Next of kin phone number"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="nextOfKinAddress"
                value={formData.nextOfKinAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Next of kin address"
                rows="3"
              ></textarea>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaFileAlt className="mr-2 text-orange-500" /> Document Upload
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please upload clear, legible scans or photos of the following documents:
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Government ID</label>
              <input
                type="file"
                name="governmentId"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                accept="image/*,.pdf"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Upload a scan of the ID you provided details for</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID Card</label>
              <input
                type="file"
                name="schoolId"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                accept="image/*,.pdf"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Upload a scan of your student ID card</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clearance Document</label>
              <input
                type="file"
                name="clearanceDocument"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                accept="image/*,.pdf"
              />
              <p className="text-xs text-gray-500 mt-1">Upload any clearance documents if available</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Progress bar
  const progress = (currentStep / 5) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-xl font-bold text-center text-gray-900 mb-6">Complete Your Profile</h1>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-between mb-8">
            <span className="text-xs font-medium text-gray-500">Step {currentStep} of 5</span>
            <span className="text-xs font-medium text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          
          {/* Error message */}
          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep()}
                    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      validateStep()
                        ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
                        : 'bg-orange-300 text-white cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !validateStep()}
                    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      validateStep() && !isLoading
                        ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
                        : 'bg-orange-300 text-white cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit'}
                  </button>
                )}
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Your information will be reviewed by an administrator before your account is fully activated.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
