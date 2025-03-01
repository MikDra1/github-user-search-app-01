import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--width);
  margin-bottom: 1rem;

  & h1 {
    color: var(--gray-dark);
  }

  @media (max-width: 850px) {
    width: 90vw;
  }

  @media (max-width: 550px) {
    & h1 {
      font-size: 1.5rem;
    }
  }
`;

const ToggleButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--gray-medium);
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  cursor: pointer;

 

`;

function Header() {
  const { isDarkMode, setIsDarkMode } = useProject();

  function handleToggle() {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", !isDarkMode);
  }

  return (
    <StyledHeader>
      <h1>devfinder</h1>
      <ToggleButton onClick={handleToggle}>
        {isDarkMode ? "Light" : "Dark"}
        <img
          src={`./images/icon-${isDarkMode ? "sun" : "moon"}.svg`}
          alt={`${isDarkMode ? "sun" : "moon"} icon`}
        />
      </ToggleButton>
    </StyledHeader>
  );
}

export default Header;
