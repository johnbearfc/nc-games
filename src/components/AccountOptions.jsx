import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
    .side-nav {
        background-color: lightgrey;
        width: 50%;
        height: 100vh;
        position: fixed;
        top: 42px;
        right: -100%;
        transition: 0.7s;
        border-left: 2px solid;

        @media only screen and (min-width: 600px) {
            width: 20%;
        }
        
        @media only screen and (max-width: 600px) {
            width: 50%;
        }
    }

    .side-nav.active {
        right: 0;
        transition: 0.5s;
    }

    .category-list {
        text-transform: capitalize;
        padding: 0;
        margin: 0;
    }

    .nav-option {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 16px;
        list-style: none;
        border-bottom: 1px solid;
      }
`

const AccountOptions = ({ isOpen, toggleIsOpen }) => {
    return (
        <Wrapper>
            <nav className={isOpen.accountToggle ? 'side-nav active' : 'side-nav'}>
                <ul className='category-list'>
                    <li className='nav-option'>
                        <Link to='/login' onClick={() => toggleIsOpen('accountToggle')}>
                            Log In / Create Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default AccountOptions
