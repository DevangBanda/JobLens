import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'; 
import Dashboard from './Pages/Dashboard';
import "./App.css";
import Authentication from './Pages/Authentication';
import { ThemeProvider } from 'styled-components';
import {darkTheme} from './Utils/themes';

function App() {

    const [currentUser, setCurrentuser] = useState(false);
    
    return(
        <ThemeProvider theme={darkTheme}>
            <div className = "main_div">
                {currentUser ? 
                <Dashboard></Dashboard>:
                <Authentication></Authentication>
    }           
            </div>
        </ThemeProvider>
    )
 }

export default App
