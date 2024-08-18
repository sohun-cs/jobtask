

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className='lg:container mx-auto'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-68px-68px)] bg-indigo-50'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;