import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h2 className='text-danger  text-center pt-4'>Oops! this page does not exist in the site.</h2>
            <p className='text-center'><Link to="/">please go home</Link></p>
        </div>
    );
}

export default NotFound;
