import React, {useState} from 'react'; 
import styled from "styled-components";
import SidebarOptions from './SidebarOptions';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {logout} from "../Redux/Reducers/userSlice";

const Container = styled.div`
flex: 0.175;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
height: 100%;
`;

const ListContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
align-items: center;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
width: 80%;
`;

const LogOutContainer = styled.div`
padding-bottom: 50px;
text-align: center;
`;


const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const dispatch = useDispatch();
    
    const options = [
        {text: 'DashBoard', link: <DashboardIcon/>},
        {text: 'Interview', link: <GroupsIcon/>},
        {text: 'Settings', link: <SettingsIcon/>},
    ]

    const handleOptionsClick = (idx) =>{
        setActiveIndex(idx);
    }

    const handleLogOutClick = () => {
        dispatch(logout());
    }
  return (
    <Container>
        <ListContainer>
            {options.map((option, index) => (
                <SidebarOptions
                    key={index}
                    text={option.text}
                    link={option.link}
                    isactive={activeIndex === index}
                    onClick={() => handleOptionsClick(index)}
                />
            ))}
        </ListContainer>

        <LogOutContainer>
            <Button onClick={handleLogOutClick} style={{display: "flex", alignItems: "center", gap: "10px", borderRadius: "100px"}} text={<><LogoutIcon/> LogOut</>}></Button>
        </LogOutContainer>
    </Container>
  )
}

export default Sidebar