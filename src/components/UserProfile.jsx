import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components';
import { getUser } from '../utils/api';

const Wrapper = styled.section`
    margin: 60px auto;
    width: 80%;

    label {
        display: block;
    }
`;

export const UserProfile = () => {
    const { username } = useParams();
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUser(username).then((userFromApi) => {
            setSelectedUser(userFromApi);
        })
    })
    return (
        <Wrapper>
            <h1>{selectedUser.username}</h1>
            <img src={selectedUser.avatar_url} alt={selectedUser.username}/>
        </Wrapper>
    )
}
