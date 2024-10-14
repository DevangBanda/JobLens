import React from 'react'; 
import Navbar from '../Components/Navbar';
import styled from 'styled-components';


const BodyDiv = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
flex-direction: column;
gap: 20px;
background-color: black;
color: white;
`;

const Main = styled.div`
display: flex;
align-items: center;
justify-content: center; 
background-color: "inherit";
color: ${({theme}) => theme.top_text_primary};
margin: 20px 20px;
gap:15px;
width: 80vw;
width: 90%;
`;


const SideBar = styled.div`
flex: 0.175;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100vh;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;


const Dash = styled.div`
flex: 0.75;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100vh;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;

const FeedBar = styled.div`
flex: 0.25;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100vh;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;





const Dashboard = () => {
  return (
    <>
      <BodyDiv>
          <h1>JobLens Dashboard</h1>
          <Navbar></Navbar>
      

        <Main>
          <SideBar>

          </SideBar>

          <Dash>

          </Dash>
          
          <FeedBar>
          
          </FeedBar>

        </Main>

      </BodyDiv>
    </>

  )
}

export default Dashboard