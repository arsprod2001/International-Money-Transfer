import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://10.1.1.1:5000/api/v1',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export const authService = {
  signUp: (prenom,nom,email,phone,birthday,password) => api.post('/auth/signup', { prenom,nom,email,phone,birthday,password }),
  signIn: (email, password) => api.post('/auth/signin', { email, password }),
  getProfile: () => api.get('/auth/profile'),
  sendOTPToPhone: (phone) => api.post('/auth/send-otp', { phone }),
  verifyOTP: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }),
  Payment : (amount, timeout) => api.post('/payment/create-intent',  {amount, timeout}), 
  getTransaction: () => api.get('/transaction/historique'),
};