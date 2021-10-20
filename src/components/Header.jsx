import React from 'react';
import styled from 'styled-components';
import * as gi from 'react-icons/gi';

const Wrapper = styled.section`
    font-size: 2rem;
    line-height: 0;

    width: 50%;
    margin: auto;
    padding-top: 96px;
    padding-bottom: 96px;
    text-align: center;

    #board {
        padding-right: 30px
    }
    
    #quest {
        padding-left: 30px
    }
    
    
`;

const Header = () => {
    return (
        <Wrapper>
            <h1 id='board'>Board</h1>
            <h1 id='quest'>Quest</h1>
            <button><gi.GiPerspectiveDiceSixFacesSix/></button>
        </Wrapper>
    );
}

export default Header;
