import React, { isValidElement } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
display: flex;
gap: 12px;
align-items: center;
border: 1px solid inherit;
padding: 5px;
color: ${({theme}) => theme.list_color_primary}; 
border-radius: 10px;
font-size: 1.25rem;
color: "#656565";
cursor: pointer;
width: 90%;
&:hover {
    background-color: ${({theme}) => theme.component_text_primary}; 
    color: white;
  }

${({ isactive, theme }) =>
  
  isactive ? `background-color: #352bc5; color: white;` : ``

  // isactive && `
  //   background-color: #352bc5; 
  //   color: white;`
  }
`;

const SidebarOptions = (props) => {
    const {text, link, isactive, onClick} = props;
    
  return (
    <ListItem isactive={isactive || undefined} onClick={onClick}>
       {link} {text}
    </ListItem>
  )
}

export default SidebarOptions