

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-68px-68px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;