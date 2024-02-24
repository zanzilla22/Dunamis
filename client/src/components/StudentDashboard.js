import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: 'Segoe UI', sans-serif;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #39499b;
  color: white;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;
const Logo = styled.img`
  height: 50px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileIcon = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
const Container = styled.div`
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 50px; /* Updated padding for extra scrolling space */
  width: 100%;
  max-width: 1200px;
  margin-top: 600px;
  font-family: 'Segoe UI', sans-serif;
`;

const Banner = styled.div`
  border-radius: 26px;
  border: 1px solid #ececec;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px;
  width: 100%;

`;

const BannerImage = styled.img`
  width: 100%;
  max-width: 700px;
  border-radius: 20px;
`;

const BannerContent = styled.div`
  text-align: center;
`;

const BannerTitle = styled.h1`
  margin-top: 20px;
  color: #000;
  font-size: 40px;
  font-weight: 500;
`;

const BannerDescription = styled.p`
  color: #666;
  margin-top: 12px;
  font-size: 24px;
`;

const SearchForm = styled.form`
  margin-top: 39px;
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #39499b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width:6vw;

  &:hover {
    background-color: #2e3187;
  }
`;

const JobCardContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const JobCard = styled.div`
  border-radius: 13px;
  border: 1px solid #ececec;
  background-color: #fff;
  display: flex;
  gap: 15px;
  padding: 20px;
  flex-direction: row;
`;

const JobImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const JobTitle = styled.h3`
  color: #39499b;
  font-size: 24px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompanyName = styled.span`
  font-size: 18px;
`;

const CompanyLogo = styled.img`
  width: 100px;
  height: auto;
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const LocationIcon = styled.img`
  width: 20px;
  height: auto;
`;

const ApplyButton = styled.button`
  margin-top: auto;
  align-self: center;
  background-color: #39499b;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #2e3187;
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 30px;
  color: #666;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const jobList = [
  // Repeat for as many job listings as necessary
  // Example structure for each job in the list
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
  {
    id: 1,
    title: "Programming Mentor Lead",
    companyName: "CodeNinjas Oakville",
    companyLogo: "https://mma.prnewswire.com/media/1451756/Code_Ninjas_Logo.jpg?p=facebook",
    location: "Oakville",
    jobImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F545679879%2F1631322598033%2F1%2Foriginal.20230629-184753?w=474&auto=format%2Ccompress&q=75&sharp=10&rect=76%2C0%2C474%2C474&s=a1659f76d8e9cb81989ca4470fff853b"
  },
];

const StudentDashboard = () => (
  <AppContainer>
    <Header>
      <Logo src="/dunamis-logo.png" alt="Company Logo"/>
      <Nav>
        <NavLink>Extracurriculars</NavLink>
        <NavLink>Co-ops</NavLink>
        <NavLink>Outgoing</NavLink>
      </Nav>
      <ProfileIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/da818f2017bcad429bcf7b850e1e317bdb2a0e87ef21cf6798b66d321b01dfa4?apiKey=4a96eb6e110e4af99e404c504d7d55e7&" alt="Profile"/>
    </Header>
    <Container>
      <Banner>
        <BannerImage src="/dunamis-logo.png" alt="Banner" />
        <BannerContent>
          <BannerTitle>Accessible and Equitable Opportunities for You :)</BannerTitle>
          <BannerDescription>CNLC '24 - ZB, TP, SH'</BannerDescription>
        </BannerContent>
      </Banner>
      <SearchForm>
        <SearchInput type="text" placeholder="Search" />
        <SearchButton>Show results</SearchButton>
      </SearchForm>
      <JobCardContainer>
        {jobList.map((job, index) => (
          <JobCard key={index}>
            <JobImage src={job.jobImage} alt={`${job.title} image`} />
            <JobInfo>
              <JobTitle>{job.title}</JobTitle>
              <CompanyInfo>
                <CompanyName>{job.companyName}</CompanyName>
                <CompanyLogo src={job.companyLogo} alt={`${job.companyName} logo`} />
              </CompanyInfo>
              <JobLocation>
                <LocationIcon src="https://static-00.iconduck.com/assets.00/location-position-icon-1640x2048-6jqx3f7e.png" alt="Location icon" />
                <span>{job.location}</span>
              </JobLocation>
              <ApplyButton>Quick Apply</ApplyButton>
            </JobInfo>
          </JobCard>
        ))}
      </JobCardContainer>
      <LoadMoreButton>Load more...</LoadMoreButton>
    </Container>
  </AppContainer>
);

export default StudentDashboard;
