import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Helper function to handle Firestore errors
const handleFirestoreError = (error, operation) => {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`Failed to ${operation}: ${error.message}`);
};

// Add a new job
export const addJob = async (jobData) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const docRef = await addDoc(jobsRef, {
      ...jobData,
      createdAt: serverTimestamp(),
      applications: [],
      savedBy: []
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, 'add job');
  }
};

// Get all jobs
export const getAllJobs = async () => {
  try {
    const jobsCollection = collection(db, 'jobs');
    const jobsSnapshot = await getDocs(jobsCollection);
    return jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Get a single job
export const getJob = async (jobId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    const jobDoc = await getDoc(jobRef);
    
    if (!jobDoc.exists()) {
      throw new Error('Job not found');
    }
    
    return {
      id: jobDoc.id,
      ...jobDoc.data()
    };
  } catch (error) {
    handleFirestoreError(error, 'get job details');
  }
};

// Apply for a job
export const applyForJob = async (jobId, userId, formData) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const jobRef = doc(db, 'jobs', jobId);
    
    // Add application document
    const applicationData = {
      jobId,
      userId,
      ...JSON.parse(formData.get('applicationData')),
      resumeUrl: formData.get('resume'),
      status: 'pending',
      appliedAt: serverTimestamp()
    };
    
    await addDoc(applicationsRef, applicationData);
    
    // Update job's applications array
    await updateDoc(jobRef, {
      applications: arrayUnion(userId)
    });
  } catch (error) {
    handleFirestoreError(error, 'submit application');
  }
};

// Save a job
export const saveJob = async (userId, jobId) => {
  try {
    const savedJobsCollection = collection(db, 'savedJobs');
    const newSavedJob = {
      userId,
      jobId,
      savedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(savedJobsCollection, newSavedJob);
    return {
      id: docRef.id,
      ...newSavedJob
    };
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

// Unsave a job
export const unsaveJob = async (jobId, userId) => {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      savedBy: arrayRemove(userId)
    });
  } catch (error) {
    handleFirestoreError(error, 'unsave job');
  }
};

// Get user's applications
export const getUserApplications = async (userId) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    handleFirestoreError(error, 'get user applications');
    return [];
  }
};

// Get user's saved jobs
export const getUserSavedJobs = async (userId) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('savedBy', 'array-contains', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    handleFirestoreError(error, 'get saved jobs');
    return [];
  }
};

// Get job details by ID
export const getJobDetails = async (jobId) => {
  try {
    const jobDoc = doc(db, 'jobs', jobId);
    const jobSnapshot = await getDoc(jobDoc);
    
    if (!jobSnapshot.exists()) {
      console.log('Job not found, creating sample job...');
      // Create sample job if it doesn't exist
      await createSampleJob();
      // Fetch the job again after creating it
      const newJobSnapshot = await getDoc(jobDoc);
      if (!newJobSnapshot.exists()) {
        throw new Error('Failed to create sample job');
      }
      return {
        id: newJobSnapshot.id,
        ...newJobSnapshot.data()
      };
    }

    return {
      id: jobSnapshot.id,
      ...jobSnapshot.data()
    };
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};

// Submit job application
export const submitApplication = async (jobId, application) => {
  try {
    const applicationsCollection = collection(db, 'applications');
    const newApplication = {
      jobId,
      ...application,
      status: 'Submitted',
      submittedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(applicationsCollection, newApplication);
    return {
      id: docRef.id,
      ...newApplication
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Create sample job data
export const createSampleJob = async () => {
  try {
    const jobsRef = collection(db, 'jobs');
    const sampleJob = {
      title: "Senior Frontend Developer",
      company: "TechFusion Inc.",
      logo: "https://readdy.ai/api/search-image?query=modern%20tech%20company%20logo",
      salary: "$120,000 - $150,000",
      location: "San Francisco, CA",
      deadline: "2024-12-31",
      postedDate: "2024-03-15",
      description: "<h2>About the Role</h2><p>We are looking for a Senior Frontend Developer to join our team...</p>",
      benefits: "<h2>Benefits</h2><ul><li>Competitive salary</li><li>Health insurance</li><li>Remote work options</li></ul>",
      applicationStatus: {
        stages: ["Applied", "Under Review", "Interview", "Offer"],
        currentStage: "Applied",
        lastUpdated: "2024-03-15T10:00:00Z",
        notes: "Application received and is being reviewed by our team."
      },
      createdAt: new Date().toISOString(),
      applications: [],
      savedBy: []
    };

    // Add the job with a specific ID
    const jobRef = doc(db, 'jobs', 'job-123');
    await setDoc(jobRef, sampleJob);
    
    console.log('Sample job created successfully');
    return {
      id: 'job-123',
      ...sampleJob
    };
  } catch (error) {
    console.error('Error creating sample job:', error);
    throw error;
  }
};

