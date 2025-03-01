import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";
import { useState } from "react";

const StyledSearchBar = styled.form`
  width: var(--width);
  background-color: var(--background-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  position: relative;

  @media (max-width: 850px) {
    width: 90vw;
  }

  @media (max-width: 550px) {
    padding: 0.5rem 0.5rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
`;

const Input = styled.input`
  border: none;
  background-color: var(--background-light);
  width: 100%;
  font-size: 1rem;
  outline: none;
  border: none;
  flex: 1;
  padding-right: 1rem;
  color: var(--gray-dark);

  &::placeholder {
    color: var(--gray-medium);
  }

  @media (max-width: 550px) {
    padding-right: 0.5rem;

    &::placeholder {
      font-size: 0.75rem;
    }
  }
`;

const SearchIcon = styled.img`
  padding-inline: 0.5rem;

  @media (max-width: 550px) {
    padding-inline: 0.25rem;
  }
`;

const Error = styled.p`
  color: red;
  margin-right: 1.5rem;
  font-weight: bold;
  width: max-content;

  @media (max-width: 550px) {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SearchButton = styled.button`
  background-color: var(--primary-blue);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;

  @media (max-width: 550px) {
    padding: 0.45rem 0.95rem;
    font-size: 0.95rem;
  }
`;

function SearchBar() {
  const [username, setUsername] = useState("");
  const [emptyUsernameError, setEmptyUsernameError] = useState(false);

  const { handleSearch, error, setUserData } = useProject();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) {
      setEmptyUsernameError(true);
      setUserData(null);
      return;
    }
    setEmptyUsernameError(false);
    handleSearch(username);
    setUsername("");
  }

  return (
    <StyledSearchBar onSubmit={handleSubmit}>
      <Flex>
        <SearchIcon src="/images/icon-search.svg" alt="" />
        <Input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Flex>
      <Error>
        {error
          ? "No results"
          : emptyUsernameError
          ? "Username can't be empty"
          : ""}
      </Error>
      <SearchButton>Search</SearchButton>
    </StyledSearchBar>
  );
}

export default SearchBar;
