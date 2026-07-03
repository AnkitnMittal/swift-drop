import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/upload`, data);
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const fallbackMessage = error.message || 'An error occurred while uploading the file.';

    const errorMessage = serverMessage || fallbackMessage;
    console.error('Error uploading file to server:', errorMessage);

    error.message = errorMessage;
    throw error;
  }
};
