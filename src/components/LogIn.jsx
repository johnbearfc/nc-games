import React, { useContext } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { UserContext } from '../contexts/User';
import { getUser } from '../utils/api';

const Wrapper = styled.section`
    margin: 60px auto;
    width: 80%;

    label {
        display: block;
    }
`

const LogIn = ({ err, setErr }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(null);

        getUser(usernameInput).then((userFromApi) => {
            setUser(userFromApi);
        })
        .catch((err) => {
            if (err.response.status === 404) setErr('User not found');
            else setErr('Something went wrong :(');
        })

        setUsernameInput('');
    }

    return (
        <Wrapper>
            <h2>Log In</h2>
            <p>(test user: tickle122)</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    required 
                    type='text' 
                    id='username' 
                    value={usernameInput} 
                    onChange={(e) => {
                            setUsernameInput(e.target.value);
                            setErr(null);
                        }
                    }/>
                <button type='submit'>Log In</button>
                {err && <p>{err}</p>}
                {user && <Redirect to='/'/>}
            </form>
        </Wrapper>
    )
}

export default LogIn
