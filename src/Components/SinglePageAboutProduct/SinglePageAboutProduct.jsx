import './SinglePageAboutProduct.css';
import cartImg from '../../assets/icons/cart1.svg'
import { useState } from 'react';

export default function SinglePageAboutProduct(props) {
   
    return (
        <div className='product_page_inform_about'>
            <h3 className='product_page_title'>{props.data[0]}</h3>
            <p className='product_page_descr'>{props.data[1]}</p>
            <div className="product_page_price">{props.data[2]}₴</div>


        </div>
    )
}