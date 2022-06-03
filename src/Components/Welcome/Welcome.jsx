import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
       const user = localStorage.getItem('loggedInUser');
       if(user){
           const parsedUser = JSON.parse(user)
           setUser(parsedUser)
       }else {
            navigate('/login');
       }
    }, []);
    return (
        <div>
            {user && user.name && user.email && <h4 className='pt-4 text-center'>Welcome {user.name}</h4>}
            
        </div>
    );
}

export default Welcome;
