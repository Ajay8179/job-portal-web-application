import React, { useState, useEffect } from "react";
import SeedJobs from "./SeedJobs";
import { LoginPage, ProfilePage, JobAppPage } from "./Home";

// Import the page components from Home.jsx
// If you export them separately, you can do:
// import { LoginPage, ProfilePage, JobAppPage } from "./Home";

const App = () => {
  // Page state: "login" | "profile" | "jobapp"
  const [page, setPage] = useState("login");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleLogin = () => setPage("profile");
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setPage("login");
  };
  const goToJobApp = () => setPage("jobapp");
  const goToProfile = () => setPage("profile");

  // Auto-login if JWT exists
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && page === "login") {
      setPage("profile");
    }
  }, [page]);

  // The Home component should export LoginPage, ProfilePage, JobAppPage
  // If not, you can move those components to separate files for clarity

  // Example usage if exported:
  // <LoginPage ... />
  // <ProfilePage ... />
  // <JobAppPage ... />

  // For now, assume Home.jsx exports these components:
  

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
};

export default App;