import styled from "styled-components";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserDataDisplay from "./components/UserDataDisplay";
import { ProjectProvider, useProject } from "./contexts/ProjectProvider";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-soft);
`;

function App() {
  const { setIsDarkMode } = useProject();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, [setIsDarkMode]);

  return (
    <Container>
      <Header />
      <SearchBar />
      <UserDataDisplay />
    </Container>
  );
}

export default App;
