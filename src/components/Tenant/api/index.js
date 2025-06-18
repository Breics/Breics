// Export all tenant API endpoints and services from a single file
import { 
  API_BASE_URL, 
  TENANT_ENDPOINTS, 
  getEndpointWithParams, 
  buildApiUrl 
} from './tenantEndpoints';

import {
  tenantApiClient,
  tenantAuthService,
  tenantProfileService,
  tenantApplicationService,
  tenantPropertyService,
  tenantPaymentService,
  tenantSupportService,
  tenantGoogleAuthService
} from './tenantApiService';

// Import enhanced profile service
import enhancedTenantProfileService from './tenantProfileService';

// Export everything
export {
  // Endpoints and URL builders
  API_BASE_URL,
  TENANT_ENDPOINTS,
  getEndpointWithParams,
  buildApiUrl,
  
  // API client
  tenantApiClient,
  
  // Services
  tenantAuthService,
  tenantProfileService,
  enhancedTenantProfileService,
  tenantApplicationService,
  tenantPropertyService,
  tenantPaymentService,
  tenantSupportService,
  tenantGoogleAuthService
};
