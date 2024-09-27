import './Footer.css';
import logo from '../../assets/img/logo2.png';
import instaIcon from '../../assets/icons/instagram.svg';
import tiktokIcon from '../../assets/icons/tiktok.svg';

export default function Footer() {
    return (
        <footer className='footer'>
            <img src={logo} alt="logo" className='footer_logo' />
            <div className="footer_contact">
                <a href="tel:+380997622131">+38(099)-762-21-31</a>
                <a href="mailto:storepowerstation@gmail.com">storepowerstation@gmail.com</a>
            </div>
            <div className="footer_social">
                <a href="#"> <img src={instaIcon} alt="instagram_icon" /> </a>
                <a href="#"><img src={tiktokIcon} alt="tiktok_icon" /> </a>
            </div>
        </footer>
    )
}