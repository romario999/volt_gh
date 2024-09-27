import './CatalogListItem.css';
import { Link } from 'react-router-dom';

export default function CatalogListItem({data, addToCart}) {
    return (
        <div className="catalog_item_card">
            <Link to={`/goods/${data.id}`}>
                <img src={data.imgSrc} alt="goods" className='goods_img' />
                <div className="card_title_wrapper">
                    <h3 className='card_subtitle'>{data.title}</h3>
                    <p className='card_price'>{data.price + ' ₴'}</p>
                </div>
                <p className='card_capacity'>{data.capacity}</p>
            </Link>
            <button className='card-btn' onClick={() => addToCart([data, 1])}>Додати у кошик</button>
        </div>
    )
}