import axios, { AxiosResponse, AxiosError } from 'axios';

export const BASE_URL = 'http://10.0.2.2:3333'; // API URL

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  // Add additional properties based on your API response structure
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Adjust the timeout as needed
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
  (config) => {
    // Add any headers, authentication tokens, etc.
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error: AxiosError) => {
    // Handle errors
    console.error('Response error:', error);

    // Example: Log specific error messages
    if (error.response?.status === 401) {
      console.warn('Unauthorized access');
    }

    // Pass the error along
    return Promise.reject(error);
  }
);

export const checkPhoneNumber = async (
  phoneNumber: string
): Promise<ApiResponse> => {
  try {
    const body = {
      phoneNumber: phoneNumber
    }
    const response: AxiosResponse<ApiResponse> = await api.post('/check', body);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};

export const generateOtp = async (
  phoneNumber: string
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.post('/generate-otp', { phoneNumber });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error in generateOtp call:', error);
    throw error;
  }
};

export const verifyOtp = async (
  phoneNumber: string, otp: any
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.post('/verify-otp', { phoneNumber, otp });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error in verifyOtp call:', error);
    throw error;
  }
};

export const getFolders = async (
  accountId: string, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/get-folders', { accountId }, { headers });
    console.log("sfesdfsdfseiuheq38952y4938y239423========", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in getFolders call:', error);
    throw error;
  }
};

export const createFolder = async (
  accountId: string, jwtToken: string, folderName: string, privacy: boolean
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/create-folder', { accountId, folderName, privacy }, { headers });
    console.log("createFolder Response=", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in uploadMedia call:', error);
    throw error;
  }
};

export const uploadMedia = async (
  data: FormData, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
    };
    console.log("reponse-data: ", data)

    const response: AxiosResponse<ApiResponse> = await api.post('/upload-media', data, { headers });
    console.log("reponse-data: ", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in uploadMedia call:', error);
    throw error;
  }
};

export const getMedia = async (
  accountId: string, folderId: string, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/get-media', { accountId, folderId }, { headers });
    console.log("getMedia reponse=", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in getMedia call:', error);
    throw error;
  }
};

export const getFolderDetails = async (
 folderId: string, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/get-folder-details', { folderId }, { headers });
    console.log("getFolderDetails reponse=", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in getFolderDetails call:', error);
    throw error;
  }
};

export const shareFolder = async (
  phoneNumber: number, folderId: string, canEdit: boolean, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/share-folder', { phoneNumber, folderId, canEdit }, { headers });
    console.log("shareFolder reponse=", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in shareFolder call:', error);
    throw error;
  }
};

export const getSharedFolders = async (
  phone_number: number, jwtToken: string
): Promise<ApiResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    };
    const response: AxiosResponse<ApiResponse> = await api.post('/get-shared-folders', { phone_number }, { headers });
    console.log("getSharedFolders reponse=", response.data)
    return response.data;
  } catch (error) {
    console.error('Error in getSharedFolders call:', error);
    throw error;
  }
};