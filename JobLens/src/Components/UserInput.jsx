import React from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const UserInput = (props) => {
    const {name, Placeholder} = props;

  return (
    <InputDiv>
        <label style={{color:"black"}} for={name}>{name}</label>
        <input placeholder={Placeholder} id={name} type="text" style={{backgroundColor: "white", 
                                            borderRadius: "6px", 
                                            height: "30px",
                                            width: "90%"
                                            }}></input>
    </InputDiv>

  )
}

export default UserInput