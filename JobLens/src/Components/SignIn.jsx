import React from 'react'; 
import styled from 'styled-components';
import UserInput from './UserInput';
import Button from './Button'


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

const SignIn = () => {
  return (
    <Container>
        <div style={{display:"flex", alignItems:"center", width: "100%", flexDirection:"column", gap: "15px"}}>
            <Title>Welcome to JobLens</Title>
            <Span>Please Login with your credentials</Span>
        <div style={{
          display: "flex",
          width: "100%", 
          gap: "20px",
          flexDirection: "column",
        }}>

        <UserInput 
            name="Email Address" 
            Placeholder="Enter Your Email Address"
        />
        
        <UserInput 
            name="Password" 
            Placeholder="Enter your password"
        />

        <Button text="Sign In"></Button>

        
        </div>
        
        </div>


    </Container>


    // <div>SignIn</div>

    // <UserDiv>
    // <h1>Welcome to JobLens</h1>
    // <p>Please Login with your</p>
    // <UserInput name="email" labelText="Enter Email"></UserInput>
    // <UserInput name="password" labelText="Enter Password"></UserInput>
    // <button></button>
    // <a style={{color:"black"}}>Need Help?</a>
    // <ButtonDiv>
    //     <button>Sign</button> 
    //     <button>Sign Up</button>
    // </ButtonDiv>
// </UserDiv>
  )
}

export default SignIn