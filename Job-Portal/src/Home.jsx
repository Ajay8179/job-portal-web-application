import React, { useState, useRef, useEffect } from "react";
import * as jobsApi from "./api/jobs"; // <-- create this file for API calls
import { saveJob } from './api/jobs'; // adjust the path if needed
import { initializeSampleData } from './initData';
import SeedJobs from "./SeedJobs"; // <-- Add this line
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Img1 from './assets/1.jpg';
import Img2 from './assets/2.jpg';
import Img3 from './assets/3.jpg';
import Img4 from './assets/4.jpg';
import Img5 from './assets/5.jpg';
import Img6 from './assets/6.jpg';
import Img7 from './assets/7.jpg';
import Img8 from './assets/8.jpg';
import Img9 from './assets/9.jpg';
import Img10 from './assets/10.jpg';
import Img11 from './assets/11.jpg';
import Img12 from './assets/12.jpg';
import Img13 from './assets/13.jpg';
import Img14 from './assets/14.jpg';
import Img15 from './assets/15.jpg';

// --- LOGIN PAGE ---


const LoginPage = ({ isDarkMode, toggleTheme, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("jwt", "dummy-jwt-token"); // Set JWT before login
      onLogin();
    }, 1500);
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // You can use result.user for user info
      // Optionally, get a real JWT: await result.user.getIdToken()
      localStorage.setItem("jwt", "google-jwt-token"); // Replace with real token if needed
      onLogin();
    } catch (error) {
      setErrorMessage("Google sign-in failed: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${isDarkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={Img1}
              alt="JobFusion Logo"
              className="h-10"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-cyan-400" : "bg-gray-200 text-gray-700"}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className={`rounded-xl p-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Welcome Back
              </h1>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Sign in to access your account</p>
            </div>
            {errorMessage && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                <p className="text-sm">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {errorMessage}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className={`flex items-center rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} focus-within:ring-2 focus-within:ring-cyan-400`}>
                  <span className="pl-3 text-gray-400">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-3 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <a href="#" className={`text-sm ${isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}>
                    Forgot Password?
                  </a>
                </div>
                <div className={`flex items-center rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} focus-within:ring-2 focus-within:ring-cyan-400`}>
                  <span className="pl-3 text-gray-400">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-3 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-400"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                  isLoading
                    ? "bg-cyan-600 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-cyan-500 hover:bg-cyan-600"
                } transition-colors duration-200 flex justify-center items-center`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${isDarkMode ? "bg-gray-800" : "bg-white"} ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className={`py-2 px-4 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap flex justify-center items-center ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <i className="fab fa-google text-red-500 text-lg"></i>
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap flex justify-center items-center ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <i className="fab fa-facebook text-blue-600 text-lg"></i>
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap flex justify-center items-center ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <i className="fab fa-linkedin text-blue-700 text-lg"></i>
                </button>
              </div>
            </div>
            <p className="mt-8 text-center text-sm">
              Don't have an account?{" "}
              <a href="#" className={`font-medium ${isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}>
                Sign up now
              </a>
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              By signing in, you agree to our{" "}
              <a href="#" className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className={`py-6 ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"} border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 JobFusion. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:underline">
                About
              </a>
              <a href="#" className="text-sm hover:underline">
                Contact
              </a>
              <a href="#" className="text-sm hover:underline">
                Privacy
              </a>
              <a href="#" className="text-sm hover:underline">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- PROFILE PAGE ---
const ProfilePage = ({
  isDarkMode,
  toggleTheme,
  onLogout,
  goToJobApp,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const profileData = {
    name: "Ajay",
    title: "Senior Frontend Developer",
    photo: Img2,
    contact: {
      email: "kuraparthiajay@gmail.com",
      phone: "+91 8179709428",
      location: "India, Bangalore",
      linkedin: "https://www.linkedin.com/in/ajay-kuraparthi-423a56288/",
      github: "github.com/ajay8179",
    },
    availability: "Open to opportunities",
    summary:
      "Results-driven Frontend Developer with 3+ years of experience building responsive, user-friendly web applications. Specialized in React, TypeScript, and modern frontend frameworks. Passionate about creating intuitive user experiences and optimizing application performance.",
    experience: [
      {
        company: "TechFusion Inc.",
        logo: Img3,
        position: "Senior Frontend Developer",
        period: "2022 - Present",
        description:
          "Lead frontend development for enterprise SaaS platform. Implemented performance optimizations resulting in 40% faster load times. Mentored junior developers and established coding standards.",
      },
      {
        company: "InnovateTech",
        logo: Img4,
        position: "Frontend Developer",
        period: "2019 - 2022",
        description:
          "Developed and maintained multiple React applications. Collaborated with UX designers to implement responsive interfaces. Reduced bundle size by 35% through code optimization.",
      },
      {
        company: "WebSolutions Co.",
        logo: Img5,
        position: "Junior Developer",
        period: "2017 - 2019",
        description:
          "Built and maintained client websites using JavaScript and CSS frameworks. Implemented responsive designs and ensured cross-browser compatibility.",
      },
    ],
    education: [
      {
        institution: "SV University ",
        degree: "Bachelor of Science in Computer Science",
        period: "2024 - 2027",
        logo: Img7,
      },
      {
        institution: "Government polytechnic Kuppam",
        degree: "Diploma in Computer Science",
        period: "2020",
        logo: Img7,
      },
    ],
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Redux", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "GraphQL", level: 80 },
      { name: "Webpack", level: 70 },
      { name: "Jest/Testing", level: 85 },
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023",
        logo: Img8,
      },
      {
        name: "Professional Scrum Master I",
        issuer: "Scrum.org",
        date: "2022",
        logo: Img9,
      },
    ],
    applications: [
      {
        company: "TechFusion Inc.",
        position: "Senior Frontend Developer",
        date: "May 15, 2025",
        status: "Submitted",
        logo: Img10,
      },
      {
        company: "InnovateTech",
        position: "Lead Frontend Developer",
        date: "May 10, 2025",
        status: "Interview Scheduled",
        logo: Img11,
      },
      {
        company: "WebSolutions Co.",
        position: "Frontend Architect",
        date: "May 5, 2025",
        status: "Rejected",
        logo: Img12,
      },
    ],
    profileCompletion: 85,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !(event.target).closest("#profileButton")
      ) {
        const dropdown = document.getElementById("profileDropdown");
        if (dropdown) {
          dropdown.classList.add("hidden");
          setIsProfileDropdownOpen(false);
        }
      }
    };

    const handleProfileClick = () => {
      const dropdown = document.getElementById("profileDropdown");
      if (dropdown) {
        dropdown.classList.toggle("hidden");
        setIsProfileDropdownOpen((prev) => !prev);
      }
    };

    const profileButton = document.getElementById("profileButton");
    if (profileButton) {
      profileButton.addEventListener("click", handleProfileClick);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (profileButton) {
        profileButton.removeEventListener("click", handleProfileClick);
      }
    };
  }, [isProfileDropdownOpen]);

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const togglePhotoModal = () => setIsPhotoModalOpen(!isPhotoModalOpen);
  const togglePrivacyModal = () => setIsPrivacyModalOpen(!isPrivacyModalOpen);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src= {Img13}
              alt="JobFusion Logo"
              className="h-10"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-cyan-400" : "bg-gray-200 text-gray-700"}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <i className="fas fa-bell"></i>
            </button>
            <div className="relative">
              <div className="relative">
                <button
                  id="profileButton"
                  className={`flex items-center space-x-2 p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  <i className="fas fa-user-circle text-xl"></i>
                  <span className="hidden md:inline">Profile</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div
                  id="profileDropdown"
                  ref={profileDropdownRef}
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } hidden`}
                >
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <i className="fas fa-user-circle w-5"></i>
                    <span>View Profile</span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <i className="fas fa-cog w-5"></i>
                    <span>Account Settings</span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <i className="fas fa-clipboard-list w-5"></i>
                    <span>My Applications</span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <i className="fas fa-bookmark w-5"></i>
                    <span>Saved Jobs</span>
                  </a>
                  <div className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} my-1`}></div>
                  <a
                    href="#"
                    onClick={onLogout}
                    className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-100 text-red-600"}`}
                  >
                    <i className="fas fa-sign-out-alt w-5"></i>
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>
            <button
              className="ml-4 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium"
              onClick={goToJobApp}
            >
              Go to Job Application
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Information */}
        <div className="lg:w-8/12">
          {/* Profile Header Card */}
          <div className={`rounded-xl p-6 mb-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg relative`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500">
                    <img
                      src={profileData.photo}
                      alt={profileData.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <button
                    onClick={togglePhotoModal}
                    className="absolute bottom-2 right-2 bg-cyan-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-camera"></i>
                  </button>
                </div>
                <div className={`mt-3 px-3 py-1 rounded-full text-sm ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                  <i className="fas fa-circle text-xs mr-1 text-green-500"></i>
                  {profileData.availability}
                </div>
              </div>
              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                      {profileData.name}
                    </h1>
                    <p className="text-xl mt-1 mb-2 text-cyan-500">
                      {profileData.title}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleEditModal}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                      <i className="fas fa-edit"></i>
                      <span>Edit Profile</span>
                    </button>
                    <button
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-cyan-600 hover:bg-cyan-700" : "bg-cyan-500 hover:bg-cyan-600"} text-white`}
                    >
                      <i className="fas fa-download"></i>
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-cyan-500 w-5"></i>
                    <span className="ml-2">{profileData.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-cyan-500 w-5"></i>
                    <span className="ml-2">{profileData.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-cyan-500 w-5"></i>
                    <span className="ml-2">{profileData.contact.location}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fab fa-linkedin text-cyan-500 w-5"></i>
                    <span className="ml-2">{profileData.contact.linkedin}</span>
                  </div>
                </div>
                {/* Professional Summary */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Professional Summary
                  </h3>
                  <p className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                    {profileData.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className={`flex overflow-x-auto mb-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"} border-b`}>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "overview"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "experience"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "education"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "skills"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Skills & Certifications
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "applications"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap cursor-pointer !rounded-button ${
                activeTab === "settings"
                  ? isDarkMode
                    ? "border-b-2 border-cyan-400 text-cyan-400"
                    : "border-b-2 border-cyan-500 text-cyan-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </div>
          {/* Tab Content */}
          <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
                {/* Skills Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Top Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.skills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                          <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className="text-cyan-500 hover:text-cyan-600 text-sm font-medium mt-2 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View all skills <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
                {/* Recent Experience */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Recent Experience</h3>
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                    <div className="flex items-start gap-4">
                      <img
                        src={profileData.experience[0].logo}
                        alt={profileData.experience[0].company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{profileData.experience[0].position}</h4>
                        <p className="text-sm">
                          {profileData.experience[0].company} • {profileData.experience[0].period}
                        </p>
                        <p className="mt-2 text-sm">{profileData.experience[0].description}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className="text-cyan-500 hover:text-cyan-600 text-sm font-medium mt-4 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View all experience <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
                {/* Recent Applications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                    <div className="flex items-start gap-4">
                      <img
                        src={profileData.applications[0].logo}
                        alt={profileData.applications[0].company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{profileData.applications[0].position}</h4>
                        <p className="text-sm">
                          {profileData.applications[0].company} • Applied on {profileData.applications[0].date}
                        </p>
                        <div
                          className={`inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs ${
                            profileData.applications[0].status === "Submitted"
                              ? isDarkMode
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-blue-100 text-blue-700"
                              : profileData.applications[0].status === "Interview Scheduled"
                                ? isDarkMode
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-green-100 text-green-700"
                                : isDarkMode
                                  ? "bg-red-900/30 text-red-400"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {profileData.applications[0].status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="text-cyan-500 hover:text-cyan-600 text-sm font-medium mt-4 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View all applications <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            )}
            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
                <div className="space-y-6">
                  {profileData.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}
                    >
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{exp.position}</h3>
                        <p className="text-sm">{exp.company} • {exp.period}</p>
                        <p className="mt-2 text-sm">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Education Tab */}
            {activeTab === "education" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="space-y-6">
                  {profileData.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}
                    >
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="mt-2 text-sm">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Skills & Certifications Tab */}
            {activeTab === "skills" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skills & Certifications</h2>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                          <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}
                      >
                        <img
                          src={cert.logo}
                          alt={cert.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm">{cert.issuer}</p>
                          <p className="text-xs text-gray-400">{cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
                <div className="space-y-6">
                  {profileData.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}
                    >
                      <img
                        src={app.logo}
                        alt={app.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{app.position}</h3>
                        <p className="text-sm">
                          {app.company} • Applied on {app.date}
                        </p>
                      </div>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          app.status === "Submitted"
                            ? isDarkMode
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-blue-100 text-blue-700"
                            : app.status === "Interview Scheduled"
                              ? isDarkMode
                                ? "bg-green-900/30 text-green-400"
                                : "bg-green-100 text-green-700"
                              : isDarkMode
                                ? "bg-red-900/30 text-red-400"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                {/* Social Connections */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Social Connections</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fab fa-linkedin text-blue-700 text-xl mr-3"></i>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Connected as {profileData.contact.linkedin}
                          </p>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 rounded-full text-sm cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-white hover:bg-gray-50"}`}
                      >
                        Disconnect
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <i className="fab fa-google text-red-500 text-xl mr-3"></i>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Not connected
                          </p>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 rounded-full text-sm cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-cyan-600 hover:bg-cyan-700" : "bg-cyan-500 hover:bg-cyan-600"} text-white`}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
                {/* Danger Zone */}
                <div className={`p-5 rounded-lg ${isDarkMode ? "bg-red-900/20" : "bg-red-50"} border ${isDarkMode ? "border-red-800" : "border-red-200"}`}>
                  <h3 className="text-lg font-semibold mb-2 text-red-500">
                    Danger Zone
                  </h3>
                  <p className="mb-4 text-sm">
                    Once you delete your account, there is no going back.
                    Please be certain.
                  </p>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer !rounded-button whitespace-nowrap">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Right Column - Sidebar */}
        <div className="lg:w-4/12">
          <div className="space-y-6">
            {/* Profile Completion Card */}
            <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{profileData.profileCompletion}% Complete</span>
                  <span className="text-sm font-medium">{profileData.profileCompletion}/100</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <div
                    className={`h-2 rounded-full ${
                      profileData.profileCompletion < 50
                        ? "bg-red-500"
                        : profileData.profileCompletion < 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${profileData.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700 text-green-400" : "bg-gray-100 text-green-500"}`}>
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span className="text-sm">Basic Information</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700 text-green-400" : "bg-gray-100 text-green-500"}`}>
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span className="text-sm">Work Experience</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700 text-green-400" : "bg-gray-100 text-green-500"}`}>
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span className="text-sm">Education</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700 text-green-400" : "bg-gray-100 text-green-500"}`}>
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <span className="text-sm">Skills</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <i className="fas fa-times text-xs text-red-500"></i>
                  </div>
                  <span className="text-sm">Portfolio/Projects</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <i className="fas fa-times text-xs text-red-500"></i>
                  </div>
                  <span className="text-sm">References</span>
                </div>
              </div>
              <button
                className={`w-full mt-4 py-2 px-4 rounded-lg text-white font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                  isDarkMode
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                Complete Your Profile
              </button>
            </div>
            {/* Profile Visibility Card */}
            <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Public Profile</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <p className="text-sm">
                  Your profile is currently visible to all employers and recruiters.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Show email address</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Show phone number</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Show social links</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
              <button
                onClick={togglePrivacyModal}
                className="w-full mt-4 py-2 px-4 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
              >
                Advanced Privacy Settings
              </button>
            </div>
            {/* Download Resume Card */}
            <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Resume</h3>
              <div className={`p-4 rounded-lg flex items-center ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className="mr-3 text-cyan-500">
                  <i className="fas fa-file-pdf text-2xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Alex_Johnson_Resume.pdf</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Updated 2 weeks ago
                  </p>
                </div>
                <button className="text-cyan-500 hover:text-cyan-600 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-download"></i>
                </button>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 py-2 px-4 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10">
                  <i className="fas fa-upload mr-1"></i> Upload New
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-lg text-white font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                    isDarkMode
                      ? "bg-cyan-600 hover:bg-cyan-700"
                      : "bg-cyan-500 hover:bg-cyan-600"
                  }`}
                >
                  <i className="fas fa-file-alt mr-1"></i> Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`w-full max-w-lg rounded-xl shadow-lg p-8 relative ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <button className="absolute top-4 right-4 text-xl" onClick={toggleEditModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  defaultValue={profileData.name}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  defaultValue={profileData.title}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  defaultValue={profileData.contact.email}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  defaultValue={profileData.contact.location}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Professional Summary</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  defaultValue={profileData.summary}
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className={`px-5 py-2 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                    isDarkMode
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
                  onClick={toggleEditModal}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`w-full max-w-md rounded-xl shadow-lg p-8 relative ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <button className="absolute top-4 right-4 text-xl" onClick={togglePhotoModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6">Update Profile Photo</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-cyan-500">
                <img
                  src={profileData.photo}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <input type="file" className="mb-4" />
              <button
                className={`px-5 py-2 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                  isDarkMode
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
                onClick={togglePhotoModal}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Privacy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`w-full max-w-lg rounded-xl shadow-lg p-8 relative ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <button className="absolute top-4 right-4 text-xl" onClick={togglePrivacyModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6">Advanced Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Show profile to recruiters</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>Show work history</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>Show education</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>Show certifications</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>Show social links</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>Allow direct messages</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className={`px-5 py-2 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                  isDarkMode
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
                onClick={togglePrivacyModal}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className={`py-6 mt-8 ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"} border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 JobFusion. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:underline">About</a>
              <a href="#" className="text-sm hover:underline">Contact</a>
              <a href="#" className="text-sm hover:underline">Privacy</a>
              <a href="#" className="text-sm hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- JOB APPLICATION PAGE ---

const JobAppPage = ({ isDarkMode, toggleTheme, onLogout, goToProfile }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobData, setJobData] = useState(null);

  // Application form state
  const [activeTab, setActiveTab] = useState("description");
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const dragAreaRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setApiError("");
      try {
        const jobsList = await jobsApi.getAllJobs();
        setJobs(jobsList);
      } catch (err) {
        setApiError("Failed to load jobs.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Fetch job details when a job is selected
  useEffect(() => {
    if (!selectedJobId) {
      setJobData(null);
      return;
    }
    const fetchJobDetails = async () => {
      setIsLoading(true);
      setApiError("");
      try {
        const data = await jobsApi.getJobDetails(selectedJobId);
        setJobData(data);
      } catch (err) {
        setApiError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobDetails();
  }, [selectedJobId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove(
        "border-blue-400",
        "bg-blue-50",
        "dark:bg-blue-900/20"
      );
      dragAreaRef.current.classList.add(
        "border-gray-300",
        "dark:border-gray-700"
      );
    }
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove(
        "border-gray-300",
        "dark:border-gray-700"
      );
      dragAreaRef.current.classList.add(
        "border-blue-400",
        "bg-blue-50",
        "dark:bg-blue-900/20"
      );
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove(
        "border-blue-400",
        "bg-blue-50",
        "dark:bg-blue-900/20"
      );
      dragAreaRef.current.classList.add(
        "border-gray-300",
        "dark:border-gray-700"
      );
    }
  };

  // Handle file selection
  const handleFileSelection = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      setFormErrors({
        ...formErrors,
        resume: "Invalid file type. Please upload PDF or Word document.",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors({ ...formErrors, resume: "File size exceeds 5MB limit." });
      return;
    }
    setResumeFile(file);
    setFormErrors({ ...formErrors, resume: "" });
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");
    try {
      const token = localStorage.getItem("jwt");
      const application = {
        jobId: jobData.id,
        ...formData,
        resume: resumeFile ? resumeFile.name : ""
      };
      await jobsApi.submitApplication(jobData.id, application, token);
      setIsConfirmationModalOpen(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setUploadProgress(0);
    } catch (err) {
      setApiError("Failed to submit application. Please try again.");
    }
    setIsSubmitting(false);
  };

  // Toggle job save status
  const toggleSaveJob = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setApiError("You must be logged in to save jobs.");
      return;
    }
    try {
      const userId = "user-1";
      const jobId = jobData.id;
      await saveJob(userId, jobId, token);
      setIsJobSaved(true);
    } catch (err) {
      setApiError("Failed to save job. Please try again.");
    }
  };

  // Toggle share modal
  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  // Close confirmation modal
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  // Get file icon based on extension
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (extension === "pdf") {
      return "fa-file-pdf";
    } else if (["doc", "docx"].includes(extension || "")) {
      return "fa-file-word";
    }
    return "fa-file-alt";
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Step 1: Show all jobs
  if (!selectedJobId) {
    if (isLoading) return <div className="p-8 text-center">Loading...</div>;
    if (apiError) return <div className="p-8 text-center text-red-500">{apiError}</div>;
    if (!jobs.length) return <div className="p-8 text-center">No jobs available.</div>;

    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
        <header className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={Img14}
                alt="JobFusion Logo"
                className="h-10"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-cyan-400" : "bg-gray-200 text-gray-700"}`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
              </button>
              <button
                className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                <i className="fas fa-bell"></i>
              </button>
              <button
                className="ml-4 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium"
                onClick={goToProfile}
              >
                Back to Profile
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`rounded-xl p-6 shadow-lg cursor-pointer transition hover:shadow-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                onClick={() => setSelectedJobId(job.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-sm">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <i className="fas fa-money-bill-wave mr-2 text-cyan-400"></i>
                    {job.salary}
                  </div>
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <i className="fas fa-map-marker-alt mr-2 text-cyan-400"></i>
                    {job.location}
                  </div>
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <i className="fas fa-calendar-alt mr-2 text-cyan-400"></i>
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>
                <div className="prose max-w-none dark:prose-invert mb-4" dangerouslySetInnerHTML={{ __html: job.description }} />
                <div className="flex items-center justify-between mb-4">
                  <button
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm cursor-pointer !rounded-button whitespace-nowrap bg-cyan-500 text-white hover:bg-cyan-600"
                    onClick={e => { e.stopPropagation(); setSelectedJobId(job.id); }}
                  >
                    <i className="fas fa-paper-plane"></i>
                    <span>Apply</span>
                  </button>
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={e => { e.stopPropagation(); setIsJobSaved(true); }}
                  >
                    <i className="far fa-bookmark mr-2"></i> Save Job
                  </button>
                  <button
                    className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={e => { e.stopPropagation(); setIsShareModalOpen(true); }}
                  >
                    <i className="fas fa-share mr-2"></i> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Step 2: Show selected job details and application form
  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (apiError) return <div className="p-8 text-center text-red-500">{apiError}</div>;
  if (!jobData) return <div className="p-8 text-center">No job data available.</div>;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <header className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={Img15}
              alt="JobFusion Logo"
              className="h-10"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-cyan-400" : "bg-gray-200 text-gray-700"}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              <i className="fas fa-bell"></i>
            </button>
            <button
              className="ml-4 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium"
              onClick={goToProfile}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Job Details */}
        <div className="lg:w-7/12">
          <button
            className="mb-6 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium"
            onClick={() => setSelectedJobId(null)}
          >
            ← Back to Jobs
          </button>
          <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center gap-4 mb-4">
              <img src={jobData.logo} alt={jobData.company} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h2 className="text-3xl font-bold">{jobData.title}</h2>
                <p className="text-lg">{jobData.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <i className="fas fa-money-bill-wave mr-2 text-cyan-400"></i>
                {jobData.salary}
              </div>
              <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <i className="fas fa-map-marker-alt mr-2 text-cyan-400"></i>
                {jobData.location}
              </div>
              <div className={`flex items-center px-3 py-1.5 rounded-full text-sm ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <i className="fas fa-calendar-alt mr-2 text-cyan-400"></i>
                Deadline: {new Date(jobData.deadline).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleSaveJob}
              >
                <i className={`${isJobSaved ? "fas" : "far"} fa-bookmark mr-2`}></i> {isJobSaved ? "Saved" : "Save Job"}
              </button>
              <button
                className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleShareModal}
              >
                <i className="fas fa-share mr-2"></i> Share
              </button>
            </div>
            <div className="text-right text-xs mb-2 text-gray-400">
              Posted: {new Date(jobData.postedDate).toLocaleDateString()}
            </div>
            {/* Tabs */}
            <div className="flex gap-8 border-b mb-4">
              <button
                className={`pb-2 font-medium ${activeTab === "description" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("description")}
              >Description</button>
              <button
                className={`pb-2 font-medium ${activeTab === "benefits" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("benefits")}
              >Benefits</button>
              <button
                className={`pb-2 font-medium ${activeTab === "status" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("status")}
              >Application Status</button>
            </div>
            {/* Tab Content */}
            <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"} mb-2`}>
              {activeTab === "description" && (
                <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
              )}
              {activeTab === "benefits" && (
                <div dangerouslySetInnerHTML={{ __html: jobData.benefits }} />
              )}
              {activeTab === "status" && jobData.applicationStatus && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Application Status</h3>
                  <div className="relative">
                    <div className="flex justify-between mb-2">
                      {jobData.applicationStatus.stages.map((stage, index) => (
                        <div key={stage} className="flex flex-col items-center w-1/4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                              jobData.applicationStatus.stages.indexOf(jobData.applicationStatus.currentStage) >= index
                                ? "bg-cyan-500 text-white"
                                : isDarkMode
                                  ? "bg-gray-700 text-gray-400"
                                  : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {index === 0 && <i className="fas fa-paper-plane text-xs"></i>}
                            {index === 1 && <i className="fas fa-search text-xs"></i>}
                            {index === 2 && <i className="fas fa-users text-xs"></i>}
                            {index === 3 && <i className="fas fa-check text-xs"></i>}
                          </div>
                          <span
                            className={`text-xs font-medium capitalize ${
                              jobData.applicationStatus.stages.indexOf(jobData.applicationStatus.currentStage) >= index
                                ? "text-cyan-400"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-500"
                            }`}
                          >
                            {stage}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={`absolute top-4 left-0 h-0.5 w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                    <div
                      className="absolute top-4 left-0 h-0.5 bg-cyan-500"
                      style={{
                        width: `${(jobData.applicationStatus.stages.indexOf(jobData.applicationStatus.currentStage) / (jobData.applicationStatus.stages.length - 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <p className="text-sm">
                      <span className="font-medium">Last Updated:</span>{" "}
                      {new Date(jobData.applicationStatus.lastUpdated).toLocaleString()}
                    </p>
                    <p className="mt-2">{jobData.applicationStatus.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right: Application Form */}
        <div className="lg:w-5/12">
          <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:ring-2 focus:ring-cyan-400 outline-none`}
                  placeholder="Enter your full name"
                  required
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:ring-2 focus:ring-cyan-400 outline-none`}
                  placeholder="Enter your email address"
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:ring-2 focus:ring-cyan-400 outline-none`}
                  placeholder="Enter your phone number"
                  required
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 rounded-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:ring-2 focus:ring-cyan-400 outline-none`}
                  placeholder="Tell us why you're a good fit for this position"
                />
                {formErrors.coverLetter && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.coverLetter}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Resume/CV</label>
                <div
                  ref={dragAreaRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                    isDarkMode
                      ? "border-gray-700 hover:border-cyan-400 hover:bg-gray-700/50"
                      : "border-gray-300 hover:border-cyan-400 hover:bg-gray-100"
                  }`}
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInputChange}
                  />
                  {resumeFile ? (
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <i
                          className={`fas ${getFileIcon(resumeFile.name)} text-2xl ${isDarkMode ? "text-cyan-400" : "text-cyan-500"}`}
                        ></i>
                      </div>
                      <p className="text-sm font-medium">{resumeFile.name}</p>
                      <p className="text-xs mt-1">{formatFileSize(resumeFile.size)}</p>
                      {uploadProgress < 100 ? (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 dark:bg-gray-700">
                          <div
                            className="bg-cyan-500 h-1.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      ) : (
                        <p className="text-xs mt-2 text-green-500">
                          <i className="fas fa-check-circle mr-1"></i> Upload complete
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <i
                          className={`fas fa-cloud-upload-alt text-2xl ${isDarkMode ? "text-cyan-400" : "text-cyan-500"}`}
                        ></i>
                      </div>
                      <p className="text-sm font-medium">Drag and drop your resume here</p>
                      <p className="text-xs mt-1">or click to browse files</p>
                      <p className="text-xs mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
                {formErrors.resume && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.resume}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium cursor-pointer !rounded-button whitespace-nowrap ${
                  isSubmitting
                    ? "bg-cyan-600 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/30"
                } transition-all duration-300`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Share This Job</h3>
              <button
                onClick={toggleShareModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2">Job URL:</p>
              <div className="flex">
                <input
                  type="text"
                  value={`https://jobfusion.com/jobs/${jobData.id}`}
                  readOnly
                  className={`flex-1 px-3 py-2 rounded-l-lg border-none text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
                />
                <button className="bg-cyan-500 text-white px-3 rounded-r-lg cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            </div>
            <div className="flex justify-center space-x-4 py-4">
              <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-blue-600/30 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fab fa-linkedin-in text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-green-500/30 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fab fa-whatsapp text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-blue-400 text-white flex items-center justify-center shadow-lg hover:shadow-blue-400/30 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fab fa-twitter text-xl"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:shadow-red-500/30 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-envelope text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-xl`}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-2xl text-green-500"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
              <p className="mb-6">
                Your application has been successfully submitted.
              </p>
              <div className={`p-4 rounded-lg mb-6 text-left ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <h4 className="font-medium mb-2">Next Steps:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                    <span>Our team will review your application within 5-7 business days.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                    <span>You'll receive an email notification when your application status changes.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                    <span>You can check your application status anytime in the "Application Status" tab.</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={closeConfirmationModal}
                className="w-full py-3 px-4 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/30 cursor-pointer !rounded-button whitespace-nowrap"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

  

// --- MAIN APP ROOT ---
const App = () => {
  // Initialize page state to 'login'
  const [page, setPage] = useState("login");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleLogin = () => setPage("profile");
  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Clear JWT on logout
    setPage("login");
  };
  const goToJobApp = () => setPage("jobapp");
  const goToProfile = () => setPage("profile");

  // Check for JWT on initial load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && page === "login") {
      setPage("profile");
    }
  }, []);

  return (
    <>
      {page === "login" && (
        <LoginPage
          isDarkMode={isDarkMode}
          toggleTheme={handleToggleTheme}
          onLogin={handleLogin}
        />
      )}
      {page === "profile" && (
        <ProfilePage
          isDarkMode={isDarkMode}
          toggleTheme={handleToggleTheme}
          onLogout={handleLogout}
          goToJobApp={goToJobApp}
        />
      )}
     {page === "jobapp" && (
  <>
    <SeedJobs />
    <JobAppPage
      isDarkMode={isDarkMode}
      toggleTheme={handleToggleTheme}
      onLogout={handleLogout}
      goToProfile={goToProfile}
    />
  </>
)}
</>
  );
}
export { LoginPage, ProfilePage, JobAppPage };
