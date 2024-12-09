import React from 'react';

//Footer with "Social Media Handles"
const Footer = () => {
    return (
        <footer className="bg-success text-white text-center py-3">
            <p className="mb-1">&copy; 2024 The Blog. All Rights Reserved.</p>
            <p>
                <a href="https://www.facebook.com/nora.keavney" className="text-white mx-2">
                    <i className="bi bi-facebook"></i> Facebook
                </a>
                <a href="https://x.com/nora_keavney" className="text-white mx-2">
                    <i className="bi bi-twitter-x"></i> X
                </a>
                <a href="https://instagram.com/nora_keavney" className="text-white mx-2">
                    <i className="bi bi-instagram"></i> Instagram
                </a>
                <a href="https://github.com/norakeavney" className="text-white mx-2">
                    <i className="bi bi-github"></i> Github
                </a>

            </p>
        </footer>
    );
};

export default Footer;
