import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/Menu';

const Welcome = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const loggedInUser = useSelector(state => state.Auth.loggedInUser)
    useEffect(() => {
        console.log("LoggedIn User", loggedInUser)
       if(loggedInUser){
           setUser(loggedInUser)
       }else {
            navigate('/login');
       }
    }, []);
    return (
        <div>
            {user && user.name && user.email && <h4 className='pt-4 text-center'>Welcome {user.name}</h4>}
            <Menu/> 
        </div>
    );
}

export default Welcome;
