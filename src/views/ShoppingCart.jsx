import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import FirstStep from './shopping-cart/FirstStep';
import SecondStep from './shopping-cart/SecondStep';
import ThirdStep from './shopping-cart/ThirdStep';

// 步驟標題、名稱
const stepInfo = [
  {
    title: '購物車清單',
    step: {
      name: '購物車清單',
      enName: 'Cart List',
    },
  },
  {
    title: '付款資料',
    step: {
      name: '付款資料',
      enName: 'Checkout Info',
    },
  },
  {
    title: '訂單確認',
    step: {
      name: '訂單完成',
      enName: 'Completed',
    },
  },
];

// 之後由資料庫資料取得
import productImg07 from 'assets/images/products/img_product_07.png';
import productImg08 from 'assets/images/products/img_product_08.png';
import productImg09 from 'assets/images/products/img_product_09.png';
import productImg11 from 'assets/images/products/img_product_11.png';
import productImg13 from 'assets/images/products/img_product_13.png';
import productAddImg01 from 'assets/images/products/img_product_add_01.png';
import productAddImg02 from 'assets/images/products/img_product_add_02.png';
import productAddImg03 from 'assets/images/products/img_product_add_03.png';
import productAddImg04 from 'assets/images/products/img_product_add_04.png';
import productAddImg05 from 'assets/images/products/img_product_add_05.png';
// 優惠券資料
const couponMenu = [
  {
    type: 'amount',
    name: '入會首購金 250 元',
    discount: 250,
    minimumSpend: 250,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'aaaaaa',
    state: '',
  },
  {
    type: 'amount',
    name: '好友分享禮 150 元',
    discount: 150,
    minimumSpend: 150,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'A7X9Q2',
    state: '',
  },
  {
    type: 'amount',
    name: '官方好友禮 50 元',
    discount: 50,
    minimumSpend: 50,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'M3T8kz',
    state: '',
  },
  {
    type: 'amount',
    name: '滿 5000 折 500',
    discount: 500,
    minimumSpend: 5000,
    date: '2025.07.01 ~ 2025.12.31',
    code: 'bbbbbb',
    state: '',
  },
];
// 付款資料
const orderInfo = {
  cart: [
    {
      type: 'product',
      name: '荒原綠影',
      originalPrice: 2400,
      salePrice: 2400,
      count: 1,
      image: {
        src: productImg13,
        position: '',
      },
    },
    {
      type: 'product',
      name: '垂綠星河',
      originalPrice: 3600,
      salePrice: 3600,
      count: 1,
      image: {
        src: productImg11,
        position: '',
      },
    },
    {
      type: 'add-on',
      name: '噴霧器',
      originalPrice: 249,
      salePrice: 129,
      count: 1,
      image: {
        src: productAddImg01,
        position: 'product-add1-position',
      },
    },
  ],
  subtotal: 0,
  deliveryFee: 0,
  discount: 0,
  total: 0,
  delivery: {
    method: '黑貓宅配',
  },
  payment: {
    method: '信用卡一次付清',
    creditCardInfo: { number: ['1111', '2222', '3333', '4444'], exp: ['01', '28'], cvc: '123' },
  },
  purchaser: {
    name: '王小明',
    tel: '0912-345-678',
    email: 'plantique@test.com',
  },
  recipient: {
    name: '王小明',
    tel: '0912-345-678',
    email: 'plantique@test.com',
    address: '台北市信義區松仁路100號',
  },
  invoice: {
    method: '雲端載具',
    mobileBarcode: '/ABC1234',
    ubn: '12345678',
  },
  notes: '',
};

function ShoppingCart() {
  // 目前的 step 索引
  const [activeTab, setActiveTab] = useState(0);

  const handleTabSelect = k => setActiveTab(k);

  useEffect(() => {
    // 依目前步驟更新頁面標題
    document.title = `${stepInfo[activeTab].title} | Plantique Life 植感生活`;
  }, [activeTab]);

  return (
    <div className="container-fluid container-lg">
      <Tab.Container activeKey={stepInfo[activeTab].step.name}>
        <Nav variant="pills" className="cart-nav flex-nowrap py-8 py-lg-13 w-100">
          {stepInfo.map((info, index, array) => (
            <Nav.Item className="col-4" key={index}>
              <Nav.Link
                eventKey={info.step.name}
                className={clsx('w-100', 'd-flex', 'flex-column', 'align-items-center')}
              >
                <p className="cart-step d-flex justify-content-center align-items-center h6 fs-lg-4 text-neutral-700 border border-2 rounded-circle mx-auto">
                  {index + 1}
                </p>
                <h3 className="fs-sm fs-lg-8 text-primary mt-2">{info.step.enName}</h3>
                <h2 className="h6 fs-lg-3 text-neutral-700 text-nowrap mt-2">{info.step.name}</h2>
                {array.length - 1 !== index && <div className="cart-progress"></div>}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content className="py-12 py-lg-15">
          <Tab.Pane eventKey={stepInfo[0].step.name}>
            <FirstStep
              couponMenu={couponMenu}
              orderInfo={orderInfo}
              productImages={{
                productAddImg02,
                productAddImg03,
                productAddImg04,
                productAddImg05,
                productImg07,
                productImg08,
                productImg09,
                productImg13,
              }}
              handleTabSelect={handleTabSelect}
            />
          </Tab.Pane>
          <Tab.Pane eventKey={stepInfo[1].step.name}>
            <SecondStep orderInfo={orderInfo} handleTabSelect={handleTabSelect} />
          </Tab.Pane>
          <Tab.Pane eventKey={stepInfo[2].step.name}>
            <ThirdStep />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default ShoppingCart;
