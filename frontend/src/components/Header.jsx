
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom';
import './header.css'

function Header() {
    return (
        <AppBar style={{ background: 'rgb(58, 197, 65)' }}position="static">
            <Toolbar>
                <Typography variant="h6" component="span" sx={{flexGrow: 1}}>
                <ul className='navigation'>
                    <li><NavLink to="/">Головна</NavLink></li>
                    <li><NavLink to="/products">Список товарів</NavLink></li>
                </ul>
                </Typography>
                 
            </Toolbar>
        </AppBar>
    )
}

export default Header
