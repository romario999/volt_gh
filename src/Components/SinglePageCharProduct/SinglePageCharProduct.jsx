import './SinglePageCharProduct.css';

export default function SinglePageCharProduct(props) {
    return (
        <>
            <ul className='chars_list'>
                <li><b>Battery capacity: </b> {props.data[0]}</li>
                <li><b>Power Adapter:</b> {props.data[1]}</li>
                <li><b>USB Output: </b>{props.data[2]}</li>
                <li><b>AC Continous Ouput: </b>{props.data[3]}</li>
                <li><b>AC Max Output: </b>{props.data[4]}</li>
                <li><b>Operation temperature: </b>{props.data[5]}</li>
                <li><b>AC Output: </b>{props.data[6]}</li>
                <li><b>Full Charging Time: </b>{props.data[7]}</li>
                <li><b>Product Dimension: </b>{props.data[8]}</li>
                <li><b>Weight: </b>{props.data[9]}</li>
                <li><b>Cycle life: </b>{props.data[10]}</li>
                <li><b>Features: </b>{props.data[11]}</li>
            </ul>
        </>
    )
}