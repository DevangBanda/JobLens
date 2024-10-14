import React, {useState} from 'react';
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import styled from 'styled-components';

const InputDiv = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
`;

const UserInput = (props) => {
    const {name, Placeholder, value, handleChange, password} = props;
    const [showPassword, setShowPassword] = useState(false);
  return (
    <InputDiv>
        <label style={{color:"black"}}>{name}</label>
        <div style={{width: "80%", display: "flex", flexDirection: "row", alignItems: "center"}}>
        <input value={value} onChange={(e) => handleChange(e)} placeholder={Placeholder} 
                id={name} 
                type={password && !showPassword ? "password" : "text"} 
                style={{backgroundColor: "#d8d8d8", 
                        borderRadius: "6px", 
                        height: "30px",
                        width: "90%", 
                        color: "black",
                }}>
        </input>
        {password && (
              <>
                {showPassword ? (
                  <>
                    <Visibility sx={{color:"black", cursor: "pointer"}} onClick={() => setShowPassword(false)} />
                  </>
                ) : (
                  <>
                    <VisibilityOff sx={{color:"black" , cursor: "pointer" }} onClick={() => setShowPassword(true)} />
                  </>
                )}
              </>
            )}
            </div>
    </InputDiv>

  )
}

export default UserInput