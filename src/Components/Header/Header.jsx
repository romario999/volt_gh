import './Header.css';
import logo from '../../assets/img/logo2.png';
import cartIcon from '../../assets/icons/cart1.svg';
import { HashLink as Link } from 'react-router-hash-link';
import { useState, useEffect, useRef } from 'react';

export default function Header({ cart }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='header'>
            <button className="menu_toggle" onClick={toggleMenu}>
                <span className={`hamburger_icon ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
            <div className="header_img">
                <Link smooth to="/#main-section"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="header_right">
                <nav className={`nav_list ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                    <button className="close_menu" onClick={toggleMenu}>×</button>
                    <ul>
                        <Link smooth to="/#main-section" onClick={closeMenu}>
                            <li>Головна</li>
                        </Link>

                        <Link smooth to="/#catalog-section" onClick={closeMenu}>
                            <li>Каталог</li>
                        </Link>

                        <Link smooth to="/#about-section" onClick={closeMenu}>
                            <li>Про нас</li>
                        </Link>
                    </ul>
                </nav>
                <Link smooth to="/cart" onClick={closeMenu}>
                        <div className="cart_icon">
                            <img src={cartIcon} alt="cart-icon" />
                            {Array.isArray(cart) && cart.length > 0 ? <span className='red_circle' /> : null}
                        </div>
                </Link>
            </div>
        </header>
    );
}
