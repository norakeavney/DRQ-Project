import React from 'react';

//Footer with "Social Media Handles"
const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <p className="mb-1">&copy; 2024 The Blog. All Rights Reserved.</p>
            <p>
                <a href="#" className="text-white mx-2">
                    <i className="bi bi-facebook"></i> Facebook
                </a>
                <a href="#" className="text-white mx-2">
                    <i className="bi bi-twitter"></i> Twitter
                </a>
                <a href="#" className="text-white mx-2">
                    <i className="bi bi-instagram"></i> Instagram
                </a>
            </p>
        </footer>
    );
};

export default Footer;
