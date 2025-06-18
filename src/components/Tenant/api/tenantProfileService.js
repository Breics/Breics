import { tenantProfileService } from './tenantApiService';

/**
 * Enhanced Tenant Profile Service
 * Handles Phase 2 of tenant registration (profile completion) and profile management
 * This service wraps the API service with additional business logic
 */
const enhancedTenantProfileService = {
  /**
   * Complete tenant profile (Phase 2 registration)
   * @param {Object} profileData - Complete profile data including:
   *   - DOB (Date of Birth)
   *   - Occupation
   *   - Government ID information
   *   - School information (School, Faculty, Course)
   *   - Academic details (Academic Level, Matriculation No, Student Affairs Verification No)
   *   - Next of Kin information
   * @returns {Promise} - API response
   */
  completeProfile: async (profileData) => {
    try {
      // Check if profileData is already FormData (from the component)
      if (profileData instanceof FormData) {
        // If it's already FormData, send it directly
        const response = await tenantProfileService.completeProfile(profileData);
        return response;
      } else {
        // First submit the basic profile data
        const response = await tenantProfileService.completeProfile(profileData);
        
        // If there are documents to upload and the profile was successfully created
        if (profileData.documents && response.data?.success) {
          const formData = new FormData();
          
          // Add each document to the form data
          Object.keys(profileData.documents).forEach(docType => {
            if (profileData.documents[docType]) {
              formData.append(docType, profileData.documents[docType]);
            }
          });
          
          // Upload the documents
          await tenantProfileService.uploadProfilePhoto(formData);
        }
        
        return response;
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      throw error;
    }
  },
  
  /**
   * Get tenant profile data
   * @returns {Promise} - API response with tenant profile data
   */
  getProfile: () => {
    return tenantProfileService.getProfile();
  },
  
  /**
   * Update tenant profile data
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - API response
   */
  updateProfile: (profileData) => {
    return tenantProfileService.updateProfile(profileData);
  },
  
  /**
   * Upload profile photo
   * @param {FormData} formData - Form data containing the photo file
   * @returns {Promise} - API response
   */
  uploadProfilePhoto: (formData) => {
    return tenantProfileService.uploadProfilePhoto(formData);
  },
  
  /**
   * Get tenant verification status
   * @returns {Promise} - API response with verification status
   */
  getVerificationStatus: () => {
    return tenantProfileService.getVerificationStatus();
  },
  
  /**
   * Update tenant preferences
   * @param {Object} preferencesData - Preferences data to update
   * @returns {Promise} - API response
   */
  updatePreferences: (preferencesData) => {
    return tenantProfileService.updatePreferences(preferencesData);
  }
};

export default enhancedTenantProfileService;
