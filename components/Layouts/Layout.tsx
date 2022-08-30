import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = (props : any) => {

    return (
        <>
            <div className="bg-gray-100 ">
                <Navbar />
                {props.children}
                <Footer />
            </div>
        </>
    )
}

export default Layout