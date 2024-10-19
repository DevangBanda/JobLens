import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'; 
import Dashboard from './Pages/Dashboard';
import "./App.css";
import Authentication from './Pages/Authentication';
import { ThemeProvider } from 'styled-components';
import {darkTheme} from './Utils/themes';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function App() {
    // const [currentUser, setCurrentuser] = useState(false);
    const {currentUser} = useSelector((state) => state.user);

    const MainDiv = styled.div`
        height: 100vh;
        width: 100vw;
        background-color: "#989898";
        `;

    return(
        <ThemeProvider theme={darkTheme}>
            <MainDiv>
                {currentUser ? 
                <Dashboard></Dashboard>:
                <Authentication></Authentication>
    }           
            </MainDiv>
        </ThemeProvider>
    )
 }

export default App
