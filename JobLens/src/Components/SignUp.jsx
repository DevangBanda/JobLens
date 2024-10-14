import React from 'react'; 
import UserInput from './UserInput';
import Button from './Button';
import styled from 'styled-components';

const Container = styled.div`
max-width: 500px;
display: flex;
flex-direction: column;
gap: 36px;
align-items: center;
width: 100%;
`
;
const Title = styled.h1`  
font-size: 30px;
font-weight: 800;
color: #0800f4;
`;

const Span = styled.span`  
font-size: 16px;
font-weight: 400;
color: black;
`;

const SignUp = () => {
  return (
    <Container>
    <div style={{display:"flex", width: "100%", alignItems:"center", flexDirection:"column", gap: "15px"}}>
        <Title>Welcome to JobLens</Title>
        <Span>Please Login with your credentials</Span>
    <div style={{
      display: "flex",
      width: "100%",
      gap: "20px",
      flexDirection: "column",
    }}>

    <UserInput 
        name="Full Name" 
        Placeholder="Enter your Full Name"
    />

    <UserInput 
        name="Email Address" 
        Placeholder="Enter Your Email Address"
    />
    
    <UserInput 
        name="Password" 
        Placeholder="Enter your password"
    />

    <Button text="Sign Up"></Button>

    
    </div>
    
    </div>


</Container>

  )
}

export default SignUp