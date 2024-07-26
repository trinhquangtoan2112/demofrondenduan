import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'; // Use your logo or any brand image

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#F3EDED' }} className="text-gray-800 py-6">
            <div className="container mx-auto flex flex-col items-center">
                <div className="mb-4">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-12" />
                    </Link>
                </div>

                <div className="mb-4">
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-gray-800 hover:text-gray-600">Trang Chủ</Link></li>
                        <li><Link to="/about" className="text-gray-800 hover:text-gray-600">Giới Thiệu</Link></li>
                        <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Liên Hệ</Link></li>
                        <li><Link to="/privacy-policy" className="text-gray-800 hover:text-gray-600">Chính Sách Bảo Mật</Link></li>
                    </ul>
                </div>

                <div className="mb-4 flex space-x-4">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 text-lg">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 text-lg">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 text-lg">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>

                <div>
                    <p className="text-sm">© 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
