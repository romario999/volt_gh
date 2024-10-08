import './SingleProductPage.css';
import img from '../../assets/img/goods/cell_power.jpg';
import cartImg from '../../assets/icons/cart1.svg';
import deliveryImg from '../../assets/icons/delivery.svg';
import payImg from '../../assets/icons/pay.svg';
import warrantyImg from '../../assets/icons/warranty.svg';
import { useState } from 'react';
import SinglePageAboutProduct from '../SinglePageAboutProduct/SinglePageAboutProduct';
import SinglePageCharProduct from '../SinglePageCharProduct/SinglePageCharProduct';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import AddToCartModal from '../ModalAddToCart/ModalAddToCart';
import { useEffect } from 'react';

export default function SingleProductPage({ data, addToCart, setIsModalOpen, isModalOpen }) {
    const { id } = useParams();
    const item = data.find(product => product.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('about');
    const [fade, setFade] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    if (!item) {
        return <div>Товар не знайдений</div>;
    }

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setFade(true);
            setTimeout(() => {
                setActiveTab(tab);
                setFade(false);
            }, 300);
        }
    };

    return (
        <div className="product_page_wrapper">
            <img src={item.imgSrc} alt={item.title} className='product_page_img' />
            <div className="product_page_info_wrapper">
                <div className="tabs_wrapper">
                    <div className={activeTab === 'about' ? 'active' : ''}
                    onClick={() => handleTabClick('about')}>Про товар</div>
                    <div className={activeTab === 'characteristics' ? 'active' : ''} 
                    onClick={() => handleTabClick('characteristics')}>Характеристики</div>
                </div>

                <div className={`tab-content ${fade ? 'fade' : ''}`}>
                    {activeTab === 'about' && <SinglePageAboutProduct data={[item.title, item.description, item.price]} />}
                    {activeTab === 'characteristics' && <SinglePageCharProduct data={[item.capacity, item.powerAdapter, item.usbOutput, item.acCondOutput, item.acMaxOutput, item.operTemp, item.acOutput, item.fullChargeTime, item.productDimension, item.weight, item.cycleLife, item.features]} />}
                </div>
                <div className="product_page_btns_wrapper">
                    <div className="quantity_control">
                    <button onClick={(e) => {e.stopPropagation(); decrementQuantity();}}>-</button>
                    <span>{quantity}</span>
                    <button onClick={(e) => {e.stopPropagation(); incrementQuantity();}}>+</button>
                </div>
                    <button className='add_to_cart_btn' onClick={() => addToCart([item, quantity])}><img src={cartImg} alt="cart-icon" />Додати у кошик</button>
                </div>
                <div className="product_page_deliv_info_wrapper">
                    <div className="product_page_info_item">
                        <div className="product_page_info_item_wrapper">
                            <div>
                                <img src={deliveryImg} alt="delivery img" className='svg_info_item'/>
                            </div>
                            <div className='product_page_info_item_descr'>
                                <h4>Доставка</h4>
                                <p>На наступний день при замовленні до 12:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="product_page_info_item">
                        <div className="product_page_info_item_wrapper">
                            <div>
                                <img src={payImg} alt="pay img" className='svg_info_item'/>
                            </div>
                            <div className='product_page_info_item_descr'>
                                <h4>Оплата онлайн</h4>
                                <p>Зручна оплата товару за реквізитами</p>
                            </div>
                        </div>
                    </div>

                    <div className="product_page_info_item">
                        <div className="product_page_info_item_wrapper">
                            <div>
                                <img src={warrantyImg} alt="warranty img" className='svg_info_item'/>
                            </div>
                            <div className='product_page_info_item_descr'>
                                <h4>Гарантія</h4>
                                <p>Надаємо річну гарантію на придбаний товар</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} text={"Товар доданий в кошик!"} />
        </div>
    );
}
