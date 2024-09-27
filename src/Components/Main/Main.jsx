import './Main.css';
import RightArrow from '../../assets/icons/right_arrow.svg';
import { HashLink as Link } from 'react-router-hash-link';

export default function Main() {
    return (
        <main className='background' id="main-section">
            <div className="main_block">
                <div className="main_title"><h1>111Продукція високої якості від постачальника </h1></div>  
                <div className="main_subtitle">Компанія виробник займається виготовленням зарядних станцій понад 10 років, і вже давно відома на американському ринку. Настав час популяризувати і у нашому просторі. Ми гарантуємо високу якість, та приємну ціну на наші товари. Перед відправленням спеціаліст перевірить товар, за для безпеки користувача. На нашому сайті ви зможете знайти багато варіантів зарядних станцій, починаючи від невеликих на 500w і закінчуючи потужними на 3000w.
                Наявність можна дізнатися на сторінці товару. За відсутності товару, ми пропонуємо передзамовлення з економією до 16%</div>
                <Link smooth to="/#catalog-section" className='main_btn'>До каталогу товарів <img src={RightArrow} alt="right-arrow-icon" /> </Link>
            </div>
        </main>
    )
}