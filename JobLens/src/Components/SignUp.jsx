import React, {useState} from 'react'; 
import UserInput from './UserInput';
import Button from './Button';
import styled from 'styled-components';
import {userSignUp} from "../../api/app";
import {userSignIn} from "../../api/app";
import {useDispatch} from "react-redux";
import { loginSuccess } from '../Redux/Reducers/userSlice';

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

    const dispatch = useDispatch();

    const handleSignUp = async() => {
        await userSignUp({name, email, password})
            .then((res) =>{
                dispatch(loginSuccess(res.data));
                alert("Account Created Success");
            })
            .catch((error) =>{
                alert(err.response.data.message);
            })
    }


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     
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
            value={name}
            handleChange={(e) => setName(e.target.value)}
        />

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

        <Button text="Sign Up"
                onClick={handleSignUp}></Button>

        
        </div>
        
        </div>


    </Container>

  )
}

export default SignUp