import React from 'react'; 
import styled from 'styled-components';

const Container = styled.button`
width: 80%;
margin: auto;
background-color: ${({theme}) => theme.component_text_primary}; 

color: white;
font-weight: bold;`;

const Button = (props) => {
    const {text, onClick} = props;

  return (
    <Container onClick={(e) => onClick(e.target.value)}>
       {text}
    </Container>
  )
}

export default Button