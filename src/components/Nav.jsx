import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdMenuBook } from 'react-icons/md';
import { useState } from 'react';
import Categories from './Categories';

const StyledNav = styled.nav`
    font-size: 1rem;
    width: 100%;


    @media only screen and (min-width: 600px) {
        display: inline-grid;
        grid-template-columns: 75% auto auto;
    }
    
    @media only screen and (max-width: 600px) {
        display: inline-grid;
        grid-template-columns: 55% auto auto;
    }

`;

const NavWrapper = styled.section`
    display: inline-grid;
    grid-template-columns: 12% auto;
    background-color: lightgrey;
    padding: 10px;
    width: 100%;
    position: fixed;
    top: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    border-bottom: 2px solid;  
`

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <NavWrapper>
                <span>
                    <MdMenuBook onClick={toggleIsOpen}/>
                </span>
                <StyledNav>
                    <Link id='BQ-logo' to='/' onClick={() => setIsOpen(false)}>
                        BQ
                    </Link>
                    <Link to='/' onClick={() => setIsOpen(false)}>
                        New
                    </Link>
                    <Link to='/' onClick={() => setIsOpen(false)}>
                        Account
                    </Link>
                </StyledNav>
            </NavWrapper>
            <Categories isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>
        </>
    );
}

export default Nav;
