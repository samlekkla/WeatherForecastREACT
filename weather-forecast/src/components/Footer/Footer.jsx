import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            &copy; {new Date().getFullYear()} Weather Forecast. All rights reserved.
        </footer>
    );
};

export default Footer;