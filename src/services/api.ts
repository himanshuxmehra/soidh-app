import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://10.0.2.2:3333'; // API URL

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
      phoneNumber:phoneNumber
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
      const response: AxiosResponse<ApiResponse> = await api.post('/verify-otp', { phoneNumber,otp });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error in generateOtp call:', error);
      throw error;
    }
  };