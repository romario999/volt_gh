import CatalogList from '../CatalogList/CatalogList';
import './Catalog.css';

export default function Catalog({data, addToCart, isModalOpen, setIsModalOpen}) {
    return (
        <>
        <div className="catalog_title_wrapper">
            <h2 className='catalog_title' id="catalog-section">Товари</h2>
            <p className='catalog_subtitle'>Наш асортимент включає моделі, що задовольнять будь-які ваші потреби, незалежно від того, чи це зарядка смартфону, ноутбуку, або навіть живлення невеликих побутових приладів під час відпочинку на природі.</p>
        </div>
        <section className='catalog'>
            <CatalogList data={data} addToCart={addToCart} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            
        </section>
        </>
    )
}