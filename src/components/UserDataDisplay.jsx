import { format } from "date-fns";
import { useProject } from "../contexts/ProjectProvider";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const StyledUserDataDisplay = styled.div`
  width: var(--width);
  background-color: var(--background-light);
  border-radius: 0.5rem;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  margin-top: 2rem;

  @media (max-width: 850px) {
    width: 90vw;
    flex-direction: column;
    
  }

  @media (max-width: 550px) {
    padding: 1rem;
  }
`;

const StyledUserDataDisplayLoading = styled(StyledUserDataDisplay)`
  justify-content: center;
  align-items: center;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;

  @media (max-width: 550px) {
    width: 4rem;
    height: 4rem;
  }
`;

const Username = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  color: var(--gray-dark);

  @media (max-width: 850px) {
    margin-bottom: 0rem;
  }

  @media (max-width: 550px) {
    font-size: 1.3rem;
  }
`;

const Login = styled.p`
  color: var(--primary-blue);

  @media (max-width: 850px) {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 550px) {
    font-size: 0.85rem;
  }
`;

const JoinDate = styled.p`
  color: var(--gray-medium);

  @media (max-width: 550px) {
    font-size: 0.75rem;
  }
`;

const UserBio = styled.p`
  color: var(--gray-medium);
  margin-top: 2rem;

  @media (max-width: 550px) {
    font-size: 0.85rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 850px) {
    justify-content: start;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  margin-top: 2rem;
  margin-bottom: 1rem;
  gap: 1rem;
  background-color: var(--background-soft);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`;

const GridTitle = styled.p`
  font-size: 0.85rem;
  color: var(--gray-light);

  @media (max-width: 550px) {
    font-size: 0.75rem;
  }
`;

const GridNumber = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-dark);

  @media (max-width: 550px) {
    font-size: 1.25rem;
  }
`;

const Data = styled.div`
  flex: 1;
`;

const ImageIcon = styled.img`
  width: 1.5rem;
`;

const ImageDataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  margin-top: 2rem;

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & p {
    color: ${({ isAvailable }) =>
      isAvailable ? "var(--gray-medium)" : "var(--text-not-available)"};
  }

  & a {
    color: ${({ isAvailable }) =>
      isAvailable ? "var(--gray-medium)" : "var(--text-not-available)"};
    text-decoration: ${({ isAvailable }) =>
      isAvailable ? "underline" : "none"};
  }

  & img {
    filter: ${({ isAvailable }) =>
      isAvailable
        ? ""
        : "brightness(0) saturate(100%) invert(81%) sepia(30%) saturate(305%) hue-rotate(185deg) brightness(85%) contrast(85%)"};
  }
`;

const InfoText = styled.p``;

const InfoTextLink = styled.a`
  color: var(--primary-blue);
  text-decoration: none;
`;

const TabletDataNextToImage = styled.div`
    @media (max-width: 850px) {
        margin-left: 1rem;
    }
`

function UserDataDisplay() {
  const { userData, isLoading, isTablet } = useProject();

  if (isLoading)
    return <StyledUserDataDisplayLoading><ClipLoader color="#0079ff" size={40} /></StyledUserDataDisplayLoading>;

  if (!userData) return null;

  return (
    <StyledUserDataDisplay>
     { isTablet ? '' : <AvatarImage src={userData.avatar_url} alt="" />}
      <Data>
        <Flex>
        { !isTablet ? '' : <AvatarImage src={userData.avatar_url} alt="" />}
          <TabletDataNextToImage>
            <Username>{userData.name ? userData.name : "Not found"}</Username>
            <Login>@{userData.login}</Login>
            {!isTablet ? '' : <JoinDate>
            Joined {format(new Date(userData.created_at), "dd MMM yyyy")}
          </JoinDate>}
          </TabletDataNextToImage>
          {isTablet ? '' : <JoinDate>
            Joined {format(new Date(userData.created_at), "dd MMM yyyy")}
          </JoinDate>}
        </Flex>

        <UserBio>
          {userData.bio
            ? userData.bio
            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec odio, Quisque volutpat mattis eros."}
        </UserBio>
        <Grid>
          <div>
            <GridTitle>Repos</GridTitle>
            <GridNumber>{userData.public_repos}</GridNumber>
          </div>

          <div>
            <GridTitle>Followers</GridTitle>
            <GridNumber>{userData.followers}</GridNumber>
          </div>

          <div>
            <GridTitle>Following</GridTitle>
            <GridNumber>{userData.following}</GridNumber>
          </div>
        </Grid>

        <ImageDataGrid>
          <InfoContainer isAvailable={userData.location ? true : false}>
            <ImageIcon src="/images/icon-location.svg" alt="" />
            <InfoText>
              {userData.location ? userData.location : "Not Available"}
            </InfoText>
          </InfoContainer>

          <InfoContainer isAvailable={userData.twitter_username ? true : false}>
            <ImageIcon src="/images/icon-twitter.svg" alt="" />
            <InfoText>
              {userData.twitter_username
                ? userData.twitter_username
                : "Not Available"}
            </InfoText>
          </InfoContainer>

          <InfoContainer isAvailable={userData.blog ? true : false}>
            <ImageIcon src="/images/icon-website.svg" alt="" />
            <InfoTextLink
              target="_blank"
              href={userData.blog ? userData.blog : ""}
            >
              {userData.blog ? userData.blog : "Not Available"}
            </InfoTextLink>
          </InfoContainer>

          <InfoContainer isAvailable={userData.company ? true : false}>
            <ImageIcon src="/images/icon-company.svg" alt="" />
            <InfoText>
              {userData.company ? userData.company : "Not Available"}
            </InfoText>
          </InfoContainer>
        </ImageDataGrid>
      </Data>
    </StyledUserDataDisplay>
  );
}

export default UserDataDisplay;
