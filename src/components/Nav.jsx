import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    font-size: 1rem;

    padding: 20px;
    

    span {
        padding: 3px;
    }

    #BQ-logo {
        margin-right: 35%;
    }
`;

const Wrapper = styled.section`
    border-bottom: 2px solid;  
`

const Nav = () => {
    return (
        <Wrapper>
            <StyledNav>
                <Link id='BQ-logo' to='/'>
                    <span>BQ</span>
                </Link>
                <Link to='/reviews'>
                    <span>Reviews</span>
                </Link>
                <Link to='/reviews'>
                    <span>New</span>
                </Link>
                <Link to='/users/username'>
                    <span>Account</span>
                </Link>
            </StyledNav>
        </Wrapper>
    );
}

export default Nav
