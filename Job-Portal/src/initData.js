import { createSampleJob } from './api/jobs';

export const initializeSampleData = async () => {
  try {
    console.log('Initializing sample data...');
    await createSampleJob();
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
    throw error;
  }
}; 