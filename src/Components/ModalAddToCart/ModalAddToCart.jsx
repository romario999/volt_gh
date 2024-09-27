import React, { useEffect } from 'react';
import './ModalAddToCart.css';
import doneIcon from '../../assets/icons/done.svg';

export default function AddToCartModal({ isOpen, onClose, text }) {

    useEffect(() => {
        if (isOpen) {
            const closeTimer = setTimeout(() => {
                onClose();
            }, 2000); 

            return () => {
                clearTimeout(closeTimer);
                onClose(); 
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null; 

    return (
        <div className={`modal-backdrop`}>
            <div className="modal-content">
                <p><img src={doneIcon} alt="done_icon" className='done_icon' />{text}</p>
            </div>
        </div>
    );
}
