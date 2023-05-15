import React, { useContext, useState } from 'react'
import '../styles/Cart.css'
import FoodItem from '../component/FoodItem'
import { handleinput } from '../Funtions'
import { AiOutlineShoppingCart } from 'react-icons'
import { AiFillCloseCircle, AiFillCreditCard } from 'react-icons/ai'
import { BiStoreAlt } from 'react-icons/bi'
import { FaStoreAlt } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { productsData, allcartitem } from '../db.js'
import CheckoutPage from './CheckoutPage'
import { AuthContext } from '../context/authcontext'
import { deleteCart, getAllProduct, getCart, updateCart } from '../apicalls'

const Cart = () => {

  const [mainData, setMainData] = useState([])
  const { curentUser, refresh, setRefresh, OrderRefresh } = useContext(AuthContext)
  const [productsData2, setProductData2] = useState([])


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
    productsData2.forEach(item => {
      if (item.ID == ID) {
        // console.log('name',item)
        temp = item.Name
      }
    })
    return temp
  }
  const getPriceWithID = (ID) => {
    let temp
    productsData2.forEach(item => {
      if (item.ID == ID) {
        temp = item.price
      }
    })
    return temp
  }
  const getTotalPRice = () => {
    let final = 0
    mainData.forEach(item => {
      final += getPriceWithID(item.itemID) * item.amount
    })
    return final
  }

  // lấy từ db


  // const [dataMain,setDataMain]= useState([])
  // useState(()=>{
  //   // setMainData(allcartitem)
  //   if(curentUser){
  //     getCart(curentUser[0].id, [mainData,setMainData])
  //   }

  //   // console.log(allcartitem)
  // },[curentUser])
  useState(() => {
    // setMainData(allcartitem)
    if (curentUser) {
      // console.log('main data stored')
      getCart(curentUser[0].id, [mainData, setMainData])
      // getAllProduct([productsData2, setProductData2])

    }

    // console.log(allcartitem)
  }, [refresh])
  useState(() => {
    // setMainData(allcartitem)
    if (curentUser) {
      // console.log('main data stored')
      getCart(curentUser[0].id, [mainData, setMainData])
      getAllProduct([productsData2, setProductData2])

    }

    // console.log(allcartitem)
  }, [OrderRefresh])
  const [openCheckoutOption, setOpenCheckoutOption] = useState(false)



  // sử lý các chọn phương thức take out or delivery
  const [choseTakeoutDelivery, setChoseTakeoutDelivery] = useState([true, false, false])
  //end

  // sử lý cộng số lượng cho item
  const updateAmount = (method, ID) => {
    let tempArray = [...mainData]
    if (method == '-') {
      tempArray.forEach(item => {
        if (item.itemID == ID) {
          const temp = item.amount--
          updateCart(curentUser[0].id, ID, Number(temp) - 1)
        }
      })
      setMainData(tempArray)

    }
    if (method == '+') {
      tempArray.forEach(item => {
        if (item.itemID == ID) {
          // item.amount++
          const temp = item.amount++
          updateCart(curentUser[0].id, ID, Number(temp) + 1)
        }
      })
      setMainData(tempArray)
    }

  }
  // handle xóa item
  const handleDelete = (itemID) => {
    deleteCart(curentUser[0].id, itemID)
    getCart(curentUser[0].id, [mainData, setMainData])
    setRefresh(!refresh)
  }
  const reloadPage = () => {
    window.location.reload()
  }



  return (
    curentUser ?
      <div className='food-cart-container'>
        <div className="all-items-in-cart">
          {mainData?.map((item) => {
            return (
              <div className="food-cart-item-container" style={{ backgroundColor: 'white', margin: 20, borderRadius: 20 }}>
                <FoodItem id={item.itemID} key={item.itemID} imgurl={getimgurlwithID(item.itemID)} name={getNameWithID(item.itemID)} />
                <div className="amount-item-container">
                  <p>số lượng</p>
                  <p className='btn-plus' onClick={() => { updateAmount('+', item.itemID) }}>+</p>
                  <input type='number' value={item.amount} />
                  <p className='btn-minus' onClick={() => { updateAmount('-', item.itemID) }}>-</p>
                </div>
                <span>giá:{getPriceWithID(item.itemID)}</span>

                <button className='delete-btn' onClick={() => { alert('xử lý xóa item'); handleDelete(item.itemID); reloadPage() }}>xóa</button>
                {/* span để chưa số lượng sản phẩm */}
              </div>
            )
          })}
        </div>
        <div className="total-price-container">
          <p>tổng tiền: {getTotalPRice()} đ</p>
          <div className="container-checkout-payment-type">
            <button className='delete-btn' onClick={() => {
              if (getTotalPRice() == 0) {
                alert('chưa có món nào để thanh toán')
              } else {

                setOpenCheckoutOption(true); console.log(mainData)
              }
            }}>thanh toán</button>
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
            <CheckoutPage total={getTotalPRice()} data={mainData} closeTab={() => { setOpenCheckoutOption(false) }} />
          </div>
          : null}
        {/* end of phương thức thanh toán */}

      </div> : null
  )
}

export default Cart