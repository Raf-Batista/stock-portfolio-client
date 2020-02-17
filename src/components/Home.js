import React from 'react';
import Navbar from './Navbar';

export const Home = () => {
    return (
        <div>
            <h1 className="text-center">Stock-Portfolio</h1>
            <Navbar localStorage={localStorage}/>
        </div>
    )
}