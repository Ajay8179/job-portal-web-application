import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const uploadResume = async (file, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await axios.post(`${API_URL}/upload/resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      },
    });


    // Return both the full URL and filename
    return {
      url: response.data.url,
      filename: response.data.filename
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Failed to upload resume');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the upload request.');
    }
  }
};

export const deleteResume = async (filename) => {
  try {
    const response = await axios.delete(`${API_URL}/upload/resume/${filename}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to delete resume');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up the delete request.');
    }
  }
};

export const getResumeUrl = (filename) => {
  return `${API_URL}/upload/resume/${filename}`;
}; 