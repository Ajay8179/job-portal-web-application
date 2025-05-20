import React from "react";
import { addJob } from "./api/jobs";

const jobs = [
  {
    title: "Backend Developer",
    company: "CloudWorks",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    salary: "$90k-$110k",
    location: "Remote",
    deadline: "2025-07-01T00:00:00Z",
    postedDate: "2025-05-20T00:00:00Z",
    description: "<p>Work on scalable backend systems.</p>",
    benefits: "<ul><li>Remote</li><li>Stock options</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "UI/UX Designer",
    company: "PixelPerfect",
    logo: "https://randomuser.me/api/portraits/women/44.jpg",
    salary: "$70k-$90k",
    location: "New York, NY",
    deadline: "2025-06-15T00:00:00Z",
    postedDate: "2025-05-18T00:00:00Z",
    description: "<p>Design beautiful user interfaces for web and mobile.</p>",
    benefits: "<ul><li>Health insurance</li><li>Flexible hours</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Full Stack Engineer",
    company: "DevSolutions",
    logo: "https://randomuser.me/api/portraits/men/45.jpg",
    salary: "$100k-$130k",
    location: "San Francisco, CA",
    deadline: "2025-07-10T00:00:00Z",
    postedDate: "2025-05-21T00:00:00Z",
    description: "<p>Work on both frontend and backend technologies.</p>",
    benefits: "<ul><li>401k</li><li>Remote work</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Data Scientist",
    company: "InsightAI",
    logo: "https://randomuser.me/api/portraits/women/65.jpg",
    salary: "$120k-$150k",
    location: "Boston, MA",
    deadline: "2025-07-20T00:00:00Z",
    postedDate: "2025-05-22T00:00:00Z",
    description: "<p>Analyze data and build predictive models.</p>",
    benefits: "<ul><li>Health insurance</li><li>Gym membership</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "DevOps Engineer",
    company: "OpsGen",
    logo: "https://randomuser.me/api/portraits/men/67.jpg",
    salary: "$110k-$140k",
    location: "Remote",
    deadline: "2025-06-30T00:00:00Z",
    postedDate: "2025-05-23T00:00:00Z",
    description: "<p>Automate infrastructure and deployments.</p>",
    benefits: "<ul><li>Remote</li><li>Flexible PTO</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "QA Tester",
    company: "QualityFirst",
    logo: "https://randomuser.me/api/portraits/women/70.jpg",
    salary: "$60k-$80k",
    location: "Austin, TX",
    deadline: "2025-07-05T00:00:00Z",
    postedDate: "2025-05-24T00:00:00Z",
    description: "<p>Test web and mobile applications for bugs.</p>",
    benefits: "<ul><li>Health insurance</li><li>Annual bonus</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Product Manager",
    company: "Prodify",
    logo: "https://randomuser.me/api/portraits/men/71.jpg",
    salary: "$130k-$160k",
    location: "Seattle, WA",
    deadline: "2025-07-15T00:00:00Z",
    postedDate: "2025-05-25T00:00:00Z",
    description: "<p>Lead product development teams.</p>",
    benefits: "<ul><li>Stock options</li><li>Flexible schedule</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Mobile App Developer",
    company: "Appify",
    logo: "https://randomuser.me/api/portraits/women/72.jpg",
    salary: "$95k-$120k",
    location: "Chicago, IL",
    deadline: "2025-07-18T00:00:00Z",
    postedDate: "2025-05-26T00:00:00Z",
    description: "<p>Build cross-platform mobile apps.</p>",
    benefits: "<ul><li>Remote</li><li>Health insurance</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Frontend Engineer",
    company: "WebWorks",
    logo: "https://randomuser.me/api/portraits/men/73.jpg",
    salary: "$85k-$105k",
    location: "Denver, CO",
    deadline: "2025-07-22T00:00:00Z",
    postedDate: "2025-05-27T00:00:00Z",
    description: "<p>Develop modern web interfaces using React.</p>",
    benefits: "<ul><li>Flexible hours</li><li>Remote</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  },
  {
    title: "Machine Learning Engineer",
    company: "MLHub",
    logo: "https://randomuser.me/api/portraits/women/74.jpg",
    salary: "$125k-$155k",
    location: "Remote",
    deadline: "2025-07-25T00:00:00Z",
    postedDate: "2025-05-28T00:00:00Z",
    description: "<p>Build and deploy ML models at scale.</p>",
    benefits: "<ul><li>Remote</li><li>Conference budget</li></ul>",
    applicationStatus: {
      stages: ["Submitted", "Under Review", "Interview", "Offer"],
      currentStage: "Submitted",
      lastUpdated: new Date().toISOString(),
      notes: "Application received."
    }
  }
];

const SeedJobs = () => {
  const handleSeed = async () => {
    for (const job of jobs) {
      await addJob(job);
    }
    alert("Jobs added!");
  };

  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={handleSeed}
        style={{
          padding: "12px 24px",
          background: "#06b6d4",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 18,
          cursor: "pointer"
        }}
      >
        Add Sample Jobs to Firestore
      </button>
    </div>
  );
};

export default SeedJobs;