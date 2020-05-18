import React from 'react';
import './header.styles.scss';
import {Link } from 'react-router-dom';

import { ReactComponent as Logo} from '../../assets/house.svg';

const Header = () => (
    <div className = 'header'>
        <Link className = 'logo-container' to="/">
            <Logo className = 'logo'/>
        </Link>
        <div className= 'options'>
            <Link className ='option' to='/profile'>PROFILE</Link>
            <Link className ='option' to='/signin_signout'>SIGNIN/SIGNOUT</Link>
        </div>
    </div>
);


export default Header;