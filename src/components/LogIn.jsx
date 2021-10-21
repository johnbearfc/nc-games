import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(null);
        
        getUser(usernameInput).then((userFromApi) => {
            console.log(userFromApi);
        })
        .catch((err) => {
            if (err.response.status === 404) setErr('User not found');
            else setErr('Something went wrong :(');
        })
    }

    return (
        <Wrapper>
            <h2>Welcome</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    required 
                    type='text' 
                    id='username' 
                    value={usernameInput} 
                    onChange={(e) => setUsernameInput(e.target.value)}/>
                <button type='submit'>Log In</button>
                {err && <p>{err}</p>}
            </form>
        </Wrapper>
    )
}

export default LogIn
