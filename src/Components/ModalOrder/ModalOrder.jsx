import React, { useState, useEffect } from 'react';
import './ModalOrder.css';
import closeSvg from '../../assets/icons/close.svg';
import novaPoshtaSvg from '../../assets/img/nova_poshta.png';
import AddToCartModal from '../ModalAddToCart/ModalAddToCart';
import axios from 'axios';
import InputMask from 'react-input-mask';

const API_KEY = '89af230f91307419559e290af626f152';

const ModalOrder = ({ isModalOpen, setIsModalOpen, onSubmit, cartList, setCartList }) => {
  const [isFinishedModal, setIsFinishedModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    region: '',
    city: '',
    department: '',
    cart: [],
    allPrice: 0
  });

  useEffect(() => {
    const updatedCart = cartList.map(([product, quantity]) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
    }));
    let totalOrderPrice = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setFormData(prev => ({ ...prev, cart: updatedCart, allPrice: totalOrderPrice }));
  }, [cartList]);

  const [inputValues, setInputValues] = useState({
    region: '',
    city: '',
    department: ''
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    region: false,
    city: false,
    department: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [regions, setRegions] = useState([]);
  const [regionRef, setRegionRef] = useState('');
  const [cities, setCities] = useState([]);
  const [cityRef, setCityRef] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [showRegionList, setShowRegionList] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const [showWarehouseList, setShowWarehouseList] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: API_KEY,
        modelName: 'Address',
        calledMethod: 'getAreas',
      });
      setRegions(response.data.data);
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (regionRef) {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {
            AreaRef: regionRef,
          },
        });
        setCities(response.data.data);
      }
    };

    fetchCities();
  }, [regionRef]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      if (cityRef) {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: API_KEY,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: cityRef,
          },
        });
        setWarehouses(response.data.data);
      }
    };

    fetchWarehouses();
  }, [cityRef]);

  useEffect(() => {
    const isValid = Object.values(formData).every(value => 
      String(value).trim().length > 0
    );
    setIsFormValid(isValid);
  }, [formData]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'region' || name === 'city' || name === 'department') {
      setInputValues({ ...inputValues, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: value.trim().length === 0 });

    if (name === 'region') {
      setShowRegionList(value.trim().length > 0);
    } else if (name === 'city') {
      setShowCityList(value.trim().length > 0);
    } else if (name === 'department') {
      setShowWarehouseList(value.trim().length > 0);
    }
  };

  const handleBlur = (e) => {
    const { value } = e.target;
    if(e.target.name === 'email') {
      validateEmail(value);
    }

    if(e.target.name === 'phone') {
      validatePhone(value);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (emailPattern.test(email)) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
      setIsFormValid(false);
    }
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
    if (phonePattern.test(phone)) {
      setErrors({ ...errors, phone: false });
    } else {
      setErrors({ ...errors, phone: true });
      setIsFormValid(false);
    }
  };

  const handleRegionChange = (e) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, region: value, city: '', department: '' });
    setFormData({...formData, region: '', city: '', department: ''});
    if (value.trim().length === 0) {
      setShowRegionList(false);
      setRegionRef('');
    } else {
      const filteredRegions = regions.filter((region) =>
        normalizeText(region.Description).includes(normalizeText(value))
      );
      setShowRegionList(filteredRegions.length > 0);
      if (filteredRegions.length > 0) {
        setRegionRef(filteredRegions[0].Ref);
      }
    }
  };

  const selectRegion = (region) => {
    setInputValues({ ...inputValues, region: region.Description, city: '', department: '' });
    setFormData({ ...formData, region: region.Description, city: '', department: '' });
    setRegionRef(region.Ref);
    setShowRegionList(false);
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    const normalizedInput = normalizeText(value);
  
    setInputValues({ ...inputValues, city: value, department: '' });
    setFormData({...formData, city: '', department: ''});
  
    if (normalizedInput.trim().length === 0) {
      setShowCityList(false);
      setCityRef('');
    } else {
      const filteredCities = cities.filter((city) =>
        normalizeText(city.Description).includes(normalizedInput)
      );
      setShowCityList(filteredCities.length > 0);
      if (filteredCities.length > 0) {
        setCityRef(filteredCities[0].Ref);
      }
    }
  };
  

  const selectCity = (city) => {
    setInputValues({ ...inputValues, city: city.Description, department: '' });
    setFormData({ ...formData, city: city.Description, department: '' });
    setCityRef(city.Ref);
    setShowCityList(false);
  };

  const handleWarehouseChange = (e) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, department: value });
    setFormData({ ...formData, department: '' });
    if (value.trim().length === 0) {
      setShowWarehouseList(false);
    } else {
      const filteredWarehouses = warehouses.filter((warehouse) =>
        warehouse.Description.toLowerCase().includes(value.toLowerCase())
      );
      setShowWarehouseList(filteredWarehouses.length > 0);
    }
  };

  const selectWarehouse = (warehouse) => {
    setInputValues({ ...inputValues, department: warehouse.Description });
    setFormData({ ...formData, department: warehouse.Description });
    setShowWarehouseList(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    setIsFinishedModal(true); // Відкриваємо модалку
  
    const formDataToSend = new FormData(event.target);
    
    formDataToSend.append(`Ім'я та прізвище`, `${formData.firstName} ${formData.lastName}`);
    formDataToSend.append(`Номер телефону`, formData.phone);
    formDataToSend.append(`Email`, formData.email);
    // Додаємо дані з cart
    formData.cart.forEach((item, index) => {
        formDataToSend.append(`ID ${index + 1} товару`, item.id);
        formDataToSend.append(`Назва ${index + 1} товару`, item.title);
        formDataToSend.append(`Ціна (за 1шт.) ${index + 1} товару`, item.price);
        formDataToSend.append(`Кількість ${index + 1} товару`, item.quantity);
        formDataToSend.append(`-------------------------`, ``);
    });
  
    formDataToSend.append("access_key", "47f921fc-1a84-4459-bff7-8abc54e0b5a1");
  
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formDataToSend
        });
  
        const data = await response.json();
        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
            setCartList([]);
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        setResult("Error submitting form");
    }
  };
  



  const onClose = () => {
    setIsModalOpen(false);
  };

  const normalizeText = (text) => {
    return text.split('(')[0].trim().toLowerCase();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-order-content">
        <button type="button" className="close-btn" onClick={onClose}>
          <img src={closeSvg} alt="close_icon" />
        </button>
        <h2 className='order_modal_title'>Оформлення замовлення</h2>
        <form onSubmit={handleSubmit} className='form_wrapper'>
          <div className="form-group">
            <label>Ім'я:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              style={{
                border: errors.firstName ? '1px solid red' : null
              }}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Прізвище:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                border: errors.lastName ? '1px solid red' : null
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Номер телефону:</label>
            <InputMask
        mask="+380 (99) 999-99-99"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="tel"
            name="phone"
            style={{
              border: errors.phone ? '1px solid red' : null
            }}
            required
          />
        )}
      </InputMask>
            {errors.phone && <span style={{ color: 'red', display: 'block', maxWidth: '100%' }}>Невірний формат номеру</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                border: errors.email ? '1px solid red' : null
              }}
              onBlur={handleBlur}
              required
            />
            {errors.email && <span style={{ color: 'red', display: 'block' }}>Невірний формат емейлу</span>}
          </div>
          </form>
          <div className='order_modal_title'>
            <img src={novaPoshtaSvg} alt="nova_poshta_icon" className='nova_post_icon' />
          </div>
          <form onSubmit={handleSubmit} className='form_wrapper'>
          <div className="form-group">
            <label>Область:</label>
            <input
              type="text"
              name="region"
              value={inputValues.region}
              onChange={handleRegionChange}
              style={{
                border: errors.region ? '1px solid red' : null
              }}
              required
            />
            {showRegionList && (
              <ul className="dropdown">
                {regions.filter(region => normalizeText(region.Description).includes(normalizeText(inputValues.region))).map(region => (
                  <li key={region.Ref} onClick={() => selectRegion(region)}>
                    {region.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Місто:</label>
            <input
              type="text"
              name="city"
              value={inputValues.city}
              onChange={handleCityChange}
              style={{
                border: errors.city ? '1px solid red' : null
              }}
              required
            />
            {showCityList && (
              <ul className="dropdown">
                {cities.filter(city => normalizeText(city.Description).includes(normalizeText(inputValues.city))).map(city => (
                  <li key={city.Ref} onClick={() => selectCity(city)}>
                    {city.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Відділення/поштомат:</label>
            <input
              type="text"
              name="department"
              value={inputValues.department}
              onChange={handleWarehouseChange}
              style={{
                border: errors.department ? '1px solid red' : null
              }}
              required
            />
            {showWarehouseList && (
              <ul className="dropdown">
                {warehouses.filter(warehouse => warehouse.Description.toLowerCase().includes(inputValues.department.toLowerCase())).map(warehouse => (
                  <li key={warehouse.Ref} onClick={() => selectWarehouse(warehouse)}>
                    {warehouse.Description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formData.cart.map((item, index) => (
            <div key={index} style={{display: 'none'}}>
              <label>
                ID:
                </label>
                <input type="text"  value={item.id} readOnly />
              <br />
              <label>
                Назва товару:
                </label>
                <input type="text"  value={item.title} readOnly />
              
              <br />
              <label>
                Ціна:
                <input type="text"  value={`${item.price}₴`} readOnly />
              </label>
              <br />
              <label>
                Кількість:
                <input type="text"  value={`${item.quantity} шт.`} readOnly />
              </label>
              <br />
              <br />
            </div>
          ))}
          <label style={{display: 'none'}}>
                Загальна ціна замовлення:
                <input type="text" name="Загальна ціна замовлення" value={`${formData.allPrice}₴`} readOnly />
              </label>
          <br />
          <div className="wrapper_btn">
          <button
          type="submit"
          disabled={!isFormValid}
          onClick={() => {
            setIsFinishedModal(true);
          }}
          style={{
            cursor: !isFormValid ? 'not-allowed' : 'pointer'
          }}
          className="submit-btn"
          >
            Підтвердити замовлення
        </button>
        </div>
        <AddToCartModal isOpen={isFinishedModal} onClose={() => {setIsFinishedModal(false); setIsModalOpen(false)}} text={"Дякуємо за замовлення!"} />
        </form>
      </div>
    </div>
  );
};

export default ModalOrder;
