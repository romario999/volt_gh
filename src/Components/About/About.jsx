import './About.css';
import powerIcon from '../../assets/icons/power.svg';
import aboutImg from '../../assets/img/about.webp';

export default function About() {
    return (
        <section className='about_section' id="about-section">
            <h3>Про нас</h3>
            <div className="about_wrapper">
                <div className="about_descr"><h4>Наша мета – забезпечити вас необхідною енергією у будь-який час та в будь-якому місці. Ми ретельно обираємо кожен продукт, щоб гарантувати його надійність, ефективність та довговічність. Наша команда прагне створити максимально зручний та приємний шопінг для кожного клієнта, пропонуючи лише ті товари, які відповідають найвищим стандартам.</h4>
                <ul className='about_list'>
                    <li><img src={powerIcon} alt="power_icon" />Компактний дизайн для легкого транспортування</li>
                    <li><img src={powerIcon} alt="power_icon" />Можливість швидкої зарядки</li>
                    <li><img src={powerIcon} alt="power_icon" />Тривалий час автономної роботи</li>
                </ul>
                </div>
               <img src={aboutImg} alt="about_img" className="about_img" />
            </div>
        </section>
    )
}