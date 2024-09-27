import Catalog from "./Components/Catalog/Catalog";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import solar_700 from './assets/img/goods/solar_700.jpg';
import upp_2000_3000 from './assets/img/goods/upp_2000_3000.jpg';
import upp_1200 from './assets/img/goods/upp_1200.jpg';
import solar_500 from './assets/img/goods/solar_500.jpg';
import solar_1000 from './assets/img/goods/solar_1000.jpg';
import cell_power from './assets/img/goods/cell_power.jpg';
import SingleProductPage from "./Components/SingleProductPage/SingleProductPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
import CartPage from "./Components/CartPage/CartPage";
import { useState } from "react";


function App() {
  const data = [
    {id: 64576547, title: 'Solar charging 700w', description: 'Зарядна станція на 700W забезпечує потужне живлення для ноутбуків, холодильників, телевізорів та інших електроприладів. Оснащена універсальними розетками, кількома USB-портами та інвертором. Відрізняється високою ефективністю та надійним захистом від перепадів напруги. Ідеальна для використання вдома, на дачі чи в подорожах.', price: 19999, capacity: '700w', powerAdapter: 'DC 19V/5A Max.', usbOutput: '3×USB:USB 5V/2.4A 1×USB QC3.0:5V/2.4A,9V/2A,12V/1.5A (18W) Type-c 1 5V/3A,9V/3A,12V/3A,15V/3A,20V/3A (PD60W) Type-c 2 5V/2.4A,9V/3A,12V/2.25A (PD27W)', acCondOutput: '700W', acMaxOutput: '1100W', operTemp: '-10 to +40', acOutput: '220V230V/240V 50Hz or 100V/110V/120V 60Hz', fullChargeTime: '3h', productDimension: '30X22X25 cm', weight: '8.000 kg', cycleLife: '1000>', features: 'Wireless Charging, Type C, Flashlight, jump starter, RV Port, Cigar Lighter,Solar Panel connection', imgSrc: solar_700},
    {id: 35732089, title: 'UPP 2000W', description: 'Зарядна станція на 2000W забезпечує потужне та стабільне живлення для великих електроприладів, таких як електричні плити, кондиціонери, або потужні інструменти. Має універсальні розетки, кілька USB-портів і потужний інвертор. Ідеально підходить для тривалих відключень електроенергії, в умовах відсутності стаціонарного живлення або для професійного використання.', price: 29999, capacity: '2000W', powerAdapter: '-', usbOutput: '-', acCondOutput: '2200W', acMaxOutput: '4500W', operTemp: '-10℃+60℃', acOutput: '100V~120V or 220V~240V 50/60Hz	', fullChargeTime: '8h', productDimension: '46.6x30x31', weight: '22kg', cycleLife: '	2000>', features: '-', imgSrc: upp_2000_3000},
    {id: 87904723, title: '1200W portable power station', description: 'Зарядна станція на 1200W забезпечує ефективне живлення для потужних побутових приладів, таких як пральні машини, мікрохвильові печі та електричні інструменти. Оснащена універсальними розетками, USB-портами та інвертором. Ідеально підходить для використання вдома, на дачі або під час відключень електроенергії.', price: 23999, capacity: '1200W', powerAdapter: '-', usbOutput: '2×USB:USB 5V/2.4A 2×USB QC3.0:5V/2.4A,9V/2A,12V/1.5A (18W)', acCondOutput: '1200W', acMaxOutput: '2000W', operTemp: '-10 to +40	', acOutput: '220V230V/240V 50Hz or 100V/110V/120V 60Hz	', fullChargeTime: '3.5h', productDimension: '38x25x26', weight: '14.000 kg', cycleLife: '3000>', features: 'Type C, Flashlight, RV Port, Solar Panel connection', imgSrc: upp_1200},
    {id: 430302002, title: '500W Portable Power Supply', description: 'Зарядна станція на 500W забезпечує потужність для живлення ноутбуків, смартфонів, освітлювальних приладів і побутових пристроїв. Має універсальні розетки, порти USB та інвертор для адаптерів. Компактна та зручна, вона підходить для використання вдома або під час подорожей.', price: 14999, capacity: '500W', powerAdapter: '-', usbOutput: '	3×USB:USB 5V/2.4A 1×USB QC3.0:5V/2.4A,9V/2A,12V/1.5A (18W) Type-c 1 5V/3A,9V/3A,12V/3A,15V/3A,20V/3A (PD60W) Type-c 2 5V/2.4A,9V/3A,12V/2.25A (PD27W)', acCondOutput: '500W', acMaxOutput: '750W', operTemp: '-10 to +40', acOutput: '220V230V/240V 50Hz or 100V/110V/120V 60Hz', fullChargeTime: '2h', productDimension: '22X12X20 cm', weight: '6.000 kg', cycleLife: '1000>', features: 'Wireless Charging, Type C, Flashlight, Solar Panel connection', imgSrc: solar_500},
    {id: 184555445, title: 'Solar Power Station 1000W', description: 'Зарядна станція на 1000W забезпечує потужне живлення для великих пристроїв, таких як електричні інструменти, малі побутові прилади і електроніка. Має універсальні розетки, кілька USB-портів та інвертор, що забезпечує стабільне і надійне електроживлення. Відмінно підходить для використання вдома, на будівельному майданчику або в подорожах', price: 21999, capacity: '1000W', powerAdapter: '-', usbOutput: '3×USB:USB 5V/2.4A 1×USB QC3.0:5V/2.4A,9V/2A,12V/1.5A (18W)', acCondOutput: '1100W', acMaxOutput: '2200W', operTemp: '-10 to +60', acOutput: '220V230V/240V 50Hz or 100V/110V/120V 60Hz', fullChargeTime: '3.5h', productDimension: '32x23x26', weight: '14.000 kg', cycleLife: '3000>', features: 'Wireless Charging, Flashlight, type-c, Solar Panel connection', imgSrc: solar_1000},
    {id: 89338484, title: '1600W Prismatic Cell', description: 'Зарядна станція на 1600W пропонує потужне живлення для великих електроприладів, таких як мікрохвильові печі, кондиціонери і електричні інструменти. Оснащена кількома універсальними розетками, USB-портами і потужним інвертором. Забезпечує стабільне і безпечне електроживлення для домашніх або професійних потреб. Ідеальна для тривалих відключень електроенергії або в умовах відсутності стаціонарного живлення.', price: 28999, capacity: '1600W', powerAdapter: '-', usbOutput: '3×USB:USB 5V/2.4A Type-c 1 5V/3A,9V/3A,12V/3A,15V/3A,20V/3A', acCondOutput: '	1600W', acMaxOutput: '4000W', operTemp: '	-10℃+60℃', acOutput: '100V~120V or 220V~240V 50/60Hz', fullChargeTime: '4h', productDimension: '32x23x26', weight: '14KG', cycleLife: '3000>', features: 'Remote Control, Type C, Flashlight, jump starter, RV Port, Cigar Lighter, Air Compressor, Quick Charge Support, Solar Panel Charge, LED Display', imgSrc: cell_power},
    {id: 6754680965, title: 'UPP 3000W', description: 'Зарядна станція на 3000W забезпечує потужне і надійне живлення для великих пристроїв, таких як побутові електроприлади, електричні інструменти, і навіть невеликі побутові системи. Має розетки різного типу, кілька USB-портів та потужний інвертор. Ідеальна для використання в умовах відсутності стаціонарного електроживлення або для забезпечення електропостачання у віддалених місцях.', price: 29999, capacity: '3000W', powerAdapter: '-', usbOutput: '-', acCondOutput: '-', acMaxOutput: '-', operTemp: '-10℃+60℃', acOutput: '100V~120V or 220V~240V 50/60Hz', fullChargeTime: '12h', productDimension: '46.4x29.7x360', weight: '32kg', cycleLife: '2000>', features: '-', imgSrc: upp_2000_3000}
  ];

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (newItem) => {
    setCart(prevList => {
        const existingItem = prevList.find(item => item[0].id === newItem[0].id);
        if (existingItem) {
            return prevList.map(item => 
                item[0].id === newItem[0].id 
                    ? [item[0], item[1] + newItem[1]]
                    : item
            );
        } else {
            return [...prevList, newItem];
        }
    });
    setIsModalOpen(true);
};

const removeFromCart = (id) => {
    setCart(prevList => prevList.filter(item => item[0].id !== id));
};

const incrementQuantity = (index) => {
  setCart(prevList =>
    prevList.map((item, i) => i === index ? [item[0], item[1] + 1] : item)
  );
};

const decrementQuantity = (index) => {
  setCart(prevList =>
    prevList.map((item, i) => 
      i === index && item[1] > 1 ? [item[0], item[1] - 1] : item
    )
  );
};

  return (
    <Router>
      <div className="App">
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={
            <>
              <Main />
              <Catalog data={data} addToCart={addToCart} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
              <About />
              <Footer />
            </>
          } />

          <Route path="/goods/:id" element={<SingleProductPage data={data} addToCart={addToCart} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
          />} />

          <Route path="/cart" element={<CartPage cartList={cart} setCartList={setCart} removeFromCart={removeFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
