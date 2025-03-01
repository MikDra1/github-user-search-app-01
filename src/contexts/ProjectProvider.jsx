import { useContext, useEffect, useState, createContext } from "react";
import useScreenSize from "../hooks/useScreenSize";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);
  const [isTablet, setIsTablet] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const screenSize = useScreenSize();

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 550);
      setIsTablet(screenSize.width <= 850);
    },
    [screenSize.width]
  );

  async function handleSearch(username) {
    try {
      setIsLoading(true)
      setUserData(null)
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (Number(data.status) === 404) {
        setError(true);
        return;
      }

      setError(false);  
      setUserData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        isMobile,
        isTablet,
        userData,
        handleSearch,
        error,
        isLoading,
        isDarkMode,
        setIsDarkMode,
        setUserData
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("ProjectContext was used outside the ProjectProvider");
  return context;
}

export { ProjectProvider, useProject };
