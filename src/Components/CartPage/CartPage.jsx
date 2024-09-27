import Header from '../Header/Header';
import './CartPage.css';
import deleteSvg from '../../assets/icons/delete.svg';
import orderSvg from '../../assets/icons/order.svg';
import ModalOrder from '../ModalOrder/ModalOrder';


export default function CartPage({ cartList, setCartList, removeFromCart, decrementQuantity, incrementQuantity, isModalOpen, setIsModalOpen }) {
    const totalPrice = cartList.reduce((acc, [product, quantity]) => {
        return acc + product.price * quantity;
    }, 0);
    
    return (
        <>
            <Header />
            <div className="cart_container">
                <h3>Кошик</h3>
                {cartList.length < 1 ? <p className='empty_cart'>Кошик порожній</p> : null}
                {cartList.map((item, i) => (
                    <div className="cart_list" key={item[0].id}>
                        <div className="cart_list_item">
                            <div className="cart_list_item_wrapper">
                                <img src={item[0].imgSrc} alt={item[0].title} className='cart_item_img'/>
                                <div className="cart_list_item_info">
                                    <div className="cart_list_item_title">
                                        <h4>{item[0].title}</h4>    
                                        <p>{item[0].capacity}</p>
                                    </div>
                                    <div className="product_page_btns_wrapper">
                                        <div className="quantity_control">
                                            <button onClick={(e) => {e.stopPropagation(); decrementQuantity(i);}}>-</button>
                                            <span>{item[1]}</span>
                                            <button onClick={(e) => {e.stopPropagation(); incrementQuantity(i);}}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart_item_price">{item[0].price * item[1]}₴</div>
                                    <img 
                                        src={deleteSvg} 
                                        alt="delete_icon" 
                                        className='delete_icon' 
                                        onClick={() => removeFromCart(item[0].id)}
                                    />
                                </div>
                            </div>  
                        </div>
                    </div> 
                ))}
               {cartList.length >= 1 ? <div className="total_price_block"><b>Загальна вартість:</b>  {totalPrice}₴</div> : null}
               {cartList.length >= 1 ? <button className='order_btn' onClick={() => setIsModalOpen(true)}><img src={orderSvg} alt="order_icon" />Замовити</button> : null}
            </div>
            <ModalOrder isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} cartList={cartList} setCartList={setCartList} />
        </>
    );
}