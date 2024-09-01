import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with backend URL

export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
