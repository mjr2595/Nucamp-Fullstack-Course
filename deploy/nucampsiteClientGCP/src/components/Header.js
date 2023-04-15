import { useState, useEffect } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import NucampLogo from '../app/assets/img/logo.png';
import UserLoginForm from '../features/user/UserLoginForm';
import UserSignupForm from '../features/user/UserSignupForm';
import UserAvatar from '../features/user/UserAvatar';
import {
    isAuthenticated,
    userLogout,
    validateLogin
} from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const auth = useSelector(isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateLogin());
    }, [dispatch]);

    const userOptions = auth ? (
        <>
            <span className='navbar-text ml-auto'>
                <Button
                    outline
                    onClick={() => dispatch(userLogout())}
                    style={{
                        color: 'white',
                        border: '1px solid white',
                        margin: '5px'
                    }}
                >
                    <i className='fa fa-sign-out fa-lg' /> Logout
                </Button>
            </span>
            <UserAvatar />
        </>
    ) : (
        <>
            <UserLoginForm />
            <UserSignupForm />
        </>
    );

    return (
        <Navbar dark color='primary' sticky='top' expand='md'>
            <NavbarBrand className='ms-5' href='/'>
                <img src={NucampLogo} alt='nucamp logo' className='float-start' />
                <h1 className='mt-1'>NuCamp</h1>
            </NavbarBrand>

            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
            <Collapse isOpen={menuOpen} navbar>
                <Nav className='ms-auto' navbar>
                    <NavItem>
                        <NavLink className='nav-link' to='/'>
                            <i className='fa fa-home fa-lg' /> Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' to='/directory'>
                            <i className='fa fa-list fa-lg' /> Directory
                        </NavLink>
                    </NavItem>
                    {auth && (
                        <NavItem>
                            <NavLink className='nav-link' to='/favorites'>
                                <i className='fa fa-heart fa-lg' /> Favorites
                            </NavLink>
                        </NavItem>
                    )}
                    <NavItem>
                        <NavLink className='nav-link' to='/about'>
                            <i className='fa fa-info fa-lg' /> About
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' to='/contact'>
                            <i className='fa fa-address-card fa-lg' /> Contact
                        </NavLink>
                    </NavItem>
                </Nav>
                {userOptions}
            </Collapse>
        </Navbar>
    );
};

export default Header;
