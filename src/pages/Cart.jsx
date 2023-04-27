import React, { useState } from 'react'
import '../styles/Cart.css'
import FoodItem from '../component/FoodItem'
import { handleinput } from '../Funtions'
import { AiOutlineShoppingCart } from 'react-icons'
import { AiFillCloseCircle, AiFillCreditCard } from 'react-icons/ai'
import { BiStoreAlt } from 'react-icons/bi'
import { FaStoreAlt } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import {productsData,allcartitem} from '../db.js'
import CheckoutPage from './CheckoutPage'

const Cart = () => {

  const [mainData,setMainData]= useState([])

  // sử lý lấy thông tin từ cart để render
    const getimgurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }
    const getNameWithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.Name
            }
        })
        return temp
    }
    const getPriceWithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.Price
            }
        })
        return temp
    }
    const getTotalPRice = ()=>{
        let final=0
        mainData.forEach(item=>{
            final+=getPriceWithID(item.itemID)*item.amount
        })
        return final
    }
  
  // lấy từ db
 

  const [dataMain,setDataMain]= useState([])
  useState(()=>{
    setMainData(allcartitem)
    console.log(allcartitem)
  },[])
  const [openCheckoutOption, setOpenCheckoutOption] = useState(false)



  // sử lý các chọn phương thức take out or delivery
  const [choseTakeoutDelivery, setChoseTakeoutDelivery] = useState([true, false,false])
  //end

  // sử lý cộng số lượng cho item
  const handleeditamount = (methos, ID) => {
    // console.log(dataMain)
    if (methos == '+') {
      mainData.forEach((item,index)=>{
        if(item.itemID==ID){
          let tempArray=[...mainData]
          if(tempArray[index].amount<10){
            tempArray[index].amount+=1
            setMainData(tempArray)
          }else {
            alert('chỉ được đặt 1 món tối đa 10 món nếu nhiều hơn xin hãy gọi cho hot line bên dưới ')
          }
        }
      })
    }
    if (methos == '-') {
      mainData.forEach((item,index)=>{
        if(item.itemID==ID){
          let tempArray=[...mainData]
          if(tempArray[index].amount>0){
            tempArray[index].amount-=1
            setMainData(tempArray)
          }
        }
      })
    }
  }




return (
  <div className='food-cart-container'>
    <div className="all-items-in-cart">
      {mainData?.map((item) => {
        return (
          <div className="food-cart-item-container">
            <FoodItem id={item.itemID} key={item.itemID}  imgurl={getimgurlwithID(item.itemID)} name={getNameWithID(item.itemID)} />
            <div className="amount-item-container">
              <p>số lượng</p>
              <p className='btn-plus' onClick={() => { handleeditamount('+',item.itemID) }}>+</p>
              <input type='number'  value={item.amount}/>
              <p className='btn-minus' onClick={() => { handleeditamount('-',item.itemID) }}>-</p>
            </div>
            <span>giá:{getPriceWithID(item.itemID)}</span>
          
            <button className='delete-btn' onClick={() => { alert('xử lý xóa item') }}>xóa</button>
            {/* span để chưa số lượng sản phẩm */}
          </div>
        )
      })}
    </div>
    <div className="total-price-container">
      <p>tổng tiền: {getTotalPRice()} đ</p>
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
       <CheckoutPage total={getTotalPRice()} closeTab={()=>{setOpenCheckoutOption(false)}}/>
      </div>
      : null}
    {/* end of phương thức thanh toán */}

  </div>
)
}

export default Cart