import React, { useState } from 'react'
import '../styles/Cart.css'
import FoodItem from '../component/FoodItem'
import { handleinput } from '../Funtions'
import { AiOutlineShoppingCart } from 'react-icons'
import { AiFillCloseCircle, AiFillCreditCard } from 'react-icons/ai'
import { BiStoreAlt } from 'react-icons/bi'
import { FaStoreAlt } from 'react-icons/fa'

const Cart = () => {

  const data = [
    {
      ID: 1,//user ID
      itemID: 1,//Item ID sản phẩm
      amount: 2,//Item số lượng

    }
  ]
  // lấy từ db
  let Data = [
    {
      id: 1,
      name: 'food_name 1',
      amount: 1,
      price: '9000',
      imgurl: '../assets/food_img/hambuger.png'
    },
    {
      id: 2,
      price: '9000',
      amount: 1,
      name: 'food_name 2',
      imgurl: '../assets/food_img/hambuger.png'
    },
    {
      id: 3,
      name: 'food_name 1',
      amount: 1,
      price: '9000',
      imgurl: '../assets/food_img/hambuger.png'
    },
    {
      id: 4,
      name: 'food_name 1',
      amount: 1,
      price: '9000',
      imgurl: '../assets/food_img/hambuger.png'
    },
    {
      id: 5,
      name: 'food_name 1',
      amount: 1,
      price: '9000',
      imgurl: '../assets/food_img/hambuger.png'
    },
  ]

  const [dataMain,setDataMain]= useState([])
  useState(()=>{
    setDataMain(Data)
  },[])
  const [openCheckoutOption, setOpenCheckoutOption] = useState(false)



  // sử lý các chọn phương thức take out or delivery
  const [choseTakeoutDelivery, setChoseTakeoutDelivery] = useState([true, false])
  //end

  // sử lý cộng số lượng cho item
  const handleeditamount = (methos, ID) => {
    console.log(dataMain)
    if (methos == '+') {
      dataMain.forEach((item,index)=>{
        if(item.id==ID){
          let tempArray=[...dataMain]
          tempArray[index].amount+=1
          setDataMain(tempArray)
        }
      })
    }
    if (methos == '-') {
      dataMain.forEach((item,index)=>{
        if(item.id==ID){
          let tempArray=[...dataMain]
          tempArray[index].amount-=1
          setDataMain(tempArray)
        }
      })
    }
  }




return (
  <div className='food-cart-container'>
    <div className="all-items-in-cart">
      {dataMain?.map((item) => {
        return (
          <div className="food-cart-item-container">
            <FoodItem id={item.id} key={item.id} price={item.price} imgurl={item.imgurl} name={item.name} />
            <div className="amount-item-container">
              <p>số lượng</p>
              <p className='btn-plus' onClick={() => { handleeditamount('+',item.id) }}>+</p>
              <input type='number' onChange={(e) => {}} value={item.amount}/>
              <p className='btn-minus' onClick={() => { handleeditamount('-',item.id) }}>-</p>
            </div>
            <span>giá:{Number(item.price)}</span>
            <input type="checkbox" />
            <button className='delete-btn' onClick={() => { alert('xử lý xóa item') }}>xóa</button>
            {/* span để chưa số lượng sản phẩm */}
          </div>
        )
      })}
    </div>
    <div className="total-price-container">
      <p>tổng tiền:</p>
      <div className="container-checkout-payment-type">
        <button className='delete-btn' onClick={() => { alert('xử lý thanh toán item'); setOpenCheckoutOption(true) }}>thanh toán</button>
      </div>
    </div>
    {/* làm background mờ */}
    {openCheckoutOption ?
      <div className="out-size-container">
      </div>
      : null}
    {/* div  phương thức thanh toán  */}
    {openCheckoutOption ?
      <div className="container-1">
        <p className='title'>Chọn phương thức thanh toán</p>
        <AiFillCloseCircle className='icon-close' onClick={() => { alert('xử lý out'); setOpenCheckoutOption(false) }} />
        <div className="con-at-store">
          <input type="checkbox" name='at-store' key={1} onChange={() => { setChoseTakeoutDelivery([true, false]) }} checked={choseTakeoutDelivery[0]} />
          <p>thanh toán thẻ </p>
          <AiFillCreditCard className='icon' />
        </div>
        <div className="con-at-deliver">
          <input type="checkbox" key={2} onChange={() => { setChoseTakeoutDelivery([false, true]) }} checked={choseTakeoutDelivery[1]} />
          <p>thanh toán tại cửa hàng</p>
          <FaStoreAlt className='icon' />
        </div>
      </div>
      : null}
    {/* end of phương thức thanh toán */}

  </div>
)
}

export default Cart