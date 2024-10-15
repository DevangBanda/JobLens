import React from 'react'; 
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import Sidebar from '../Components/Sidebar';

const BodyDiv = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
flex-direction: column;
gap: 20px;
background-color: black;
color: white;
height: 100vh;
`;

const Main = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center; 
background-color: "inherit";
color: ${({theme}) => theme.top_text_primary};
margin: 20px 20px;
gap:15px;
width: 90%;
`;


const NavBar = styled(Navbar)`
flex: 0.2;
`;


//Main Dash Bar
const Dash = styled.div`
flex: 0.75;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100%;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;

const Row = styled.div`
display: flex; 
flex-direction: row;
flex: 1;`;

const JobDescDiv = styled.div`
flex: 1;
margin: 5px;
border: 2px solid white;
border-radius: 15px;
`;

const QuestionsDiv = styled.div`
flex: 1;
margin: 5px;
border: 2px solid white;
border-radius: 15px;
`;


//FeedBack Bar
const FeedBar = styled.div`
flex: 0.25;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100%;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;




const Dashboard = () => {
  return (
    <>
      <BodyDiv>
        <NavBar></NavBar>
        
        <Main>
          <Sidebar/>

          <Dash>
            <Row>
              <JobDescDiv>
                    <h1>Upload Job Description here</h1>
              </JobDescDiv>
              
              <QuestionsDiv>
                <h1>Questions will populate here</h1>
              </QuestionsDiv>
            </Row>

            <Row>
              <JobDescDiv>
              <h1>Metrics? </h1>
              </JobDescDiv>
              
              <QuestionsDiv>
                  
              </QuestionsDiv>
            </Row>

          </Dash>
          
          <FeedBar>
          <h1>FeedBack?</h1>
          </FeedBar>

        </Main>

      </BodyDiv>
    </>

  )
}

export default Dashboard