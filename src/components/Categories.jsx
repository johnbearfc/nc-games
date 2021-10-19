import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from '../utils/api';

const Wrapper = styled.section`
    .side-nav {
        background-color: lightgrey;
        width: 50%;
        height: 100vh;
        position: fixed;
        top: 42px;
        left: -100%;
        transition: 0.7s;
        border-right: 2px solid;

        @media only screen and (min-width: 600px) {
            width: 20%;
        }
        
        @media only screen and (max-width: 600px) {
            width: 50%;
        }
    }

    .side-nav.active {
        left: 0;
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

const Categories = ({ isOpen, toggleIsOpen }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((categoriesFromApi) => {
            setCategories(categoriesFromApi);
        })
    }, []);

    return (
        <Wrapper>
            <nav className={isOpen? 'side-nav active' : 'side-nav'}>
                <ul className='category-list'>
                    <li className='nav-option'>
                        <Link to={'/reviews/'} onClick={toggleIsOpen}>
                            All
                        </Link>
                    </li>
                    {categories.map(category => {
                        return (
                            <li className='nav-option' key={category.slug}>
                                <Link to={`/reviews/${category.slug}`} onClick={toggleIsOpen}>
                                    {category.slug}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </Wrapper>
    );
}

export default Categories;
