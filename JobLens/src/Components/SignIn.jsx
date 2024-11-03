import React, {useState} from 'react'; 
import styled from 'styled-components';
import UserInput from './UserInput';
import Button from './Button'
import {userSignIn} from "../../api/app";
import {useDispatch} from "react-redux";
import { loginSuccess } from '../Redux/Reducers/userSlice';

const Container = styled.div`
max-width: 500px;
display: flex;
flex-direction: column;
gap: 36px;
align-items: center;
width: 100%;`;

const Title = styled.h1`  
font-size: 30px;
font-weight: 800;
color: #0800f4;`;

const Span = styled.span`  
font-size: 16px;
font-weight: 400;
color: black;`;

const SignIn = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignIn = async() => {
        await userSignIn({email, password})
            .then((res) =>{
                console.log(res);
                dispatch(loginSuccess(res.data));
                alert("Login Success");
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

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
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
        />
        
        <UserInput 
            name="Password" 
            Placeholder="Enter your password"
            password
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={(e) => handleSignIn(e)} text="Sign In"></Button>
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