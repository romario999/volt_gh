import CatalogListItem from '../CatalogListItem/CatalogListItem';
import AddToCartModal from '../ModalAddToCart/ModalAddToCart';
import './CatalogList.css';

export default function CatalogList({data, addToCart, isModalOpen, setIsModalOpen}) {
    return (
        <div className='catalog_list_wrapper'>
            {data.map(item => (
                <CatalogListItem key={item.id} data={item} addToCart={addToCart} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            ))}
            <AddToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} text={"Товар доданий в кошик!"} />
        </div>
    )
}