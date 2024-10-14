import React, {useState} from 'react'; 
import styled from 'styled-components';
import Auth from "../Utils/Auth.png";
import UserInput from '../Components/UserInput';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

const AuthContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center; 
justify-content: center;
margin: 0px;
background-color: white;
overflow: hidden;`;

const LeftDiv = styled.div`
flex: 1;
position: relative;
margin: none;
@media(max-width: 600px){
visi}
`;

const Image = styled.img`
height: 100%;
width: 100%;
object-fit: cover;`;


const RightDiv = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 40px;
gap: 16px;
align-items: center;
justify-content: center;
`;


const ButtonDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 20px;
`;

const Text = styled.div`
font-size: 16px;
color: ${({theme}) => theme.component_text_secondary};
text-align: center;
margin-top: 16px;
@media (max-width: 400px) {
font-size: 14px;
  }
`;

const TextButton = styled.span`
color: ${({theme}) => theme.component_text_primary};
cursor: pointer;
transition: all 0.3s ease;
font-weight: 600;
`;


const Authentication = () => {

    const [login, setLogin] = useState(false);

  return (
    <AuthContainer>
       <LeftDiv>
            <Image src={Auth}></Image>   
       </LeftDiv>

       <RightDiv>
            {!login ? (
            <>
                <SignIn/>
                <Text>
                    Don't Have An Account?{" "}
                    <TextButton onClick={() => setLogin(true)}>Sign Up</TextButton>
                </Text>
            </>
            ) : (
                <>
                    <SignUp/>
                    <Text>
                        Already Have An Account?{" "}
                        <TextButton onClick={() => setLogin(false)}>Sign In</TextButton>
                    </Text>
                </>
                )
        }
       </RightDiv>

    </AuthContainer>
  )
}

export default Authentication