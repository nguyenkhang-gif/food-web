import React, { useEffect, useState } from 'react'
import '../styles/CheckoutPage.css'
import { userInfo, alluserAdress } from '../db.js'
import { AiFillCreditCard, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCash } from 'react-icons/bs'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { createOrder, deleteCart } from '../apicalls'
const CheckoutPage = ({ mainData, total, closeTab, data }) => {

    const { curentUser, refresh, setRefresh, OrderRefresh } = useContext(AuthContext)
    const [user, setUser] = useState()
    useEffect(() => {
        setUser(userInfo)

    }, [])
    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    // sử lý tới công đoạn tiếp theo trong check out ví dụ tới paymend or sth
    const [toPayMent, setToPayment] = useState(false)

    // sử lý thay đổi option ở phương thức nhận hàng (món ăn)
    const [pickUpDoorDeliver, setPickUpDoorDeliver] = useState([true, false])
    // sử lý thay đổi option ở phương thức thanh toán(món ăn)
    const [creditCash, setCreditCash] = useState([true, false])
    // sử lý lấy địa chỉ đầu tiên
    const getAddressWithID = (ID) => {
        let temp
        alluserAdress.forEach(item => {
            if (item.ID == ID) {
                temp = item.des
            }
        })

        return temp
    }



    const clearCart=()=>{
        data.forEach(item=>{
            deleteCart(curentUser[0].id,item.itemID)
        })
    }

    const reloadPage=()=>{
        window.location.reload()
    }
    

    return (
        <div className='container-checkoutpage'>
            <div className="header">
                <p> Check out</p>
                <AiOutlineCloseCircle className='close-icon' onClick={() => { closeTab() }} />
            </div>

            <div className="main">
                <p className='title'>Delivery</p>
                <div className="address-container">
                    <p className='title'>Address details</p>
                    <p className='change'>change</p>
                    {/* user name address phone Num */}
                    {user ? <div className="Name-address-phonnum">
                        <p className='Name'>{curentUser?.[0].Name}</p>
                        <p className='Address' style={{ height: 'fit-content' }}>{curentUser?.[0].addressDes}</p>
                        <p className='Phonenum'>{curentUser?.[0].phonDes}</p>
                    </div> : null}
                </div>
                <p className='title'>Delivery method</p>
                <div className="Delivery-pickup-container">
                    {/* <p className='title'>Address details</p> */}
                    {/* <p className='change'>change</p> */}
                    {/* user name address phone Num */}
                    {user ? <div className="Delivery-pickup">
                        <p className='delivery'>
                            <input type="checkbox" checked={pickUpDoorDeliver[0]} onChange={() => { setPickUpDoorDeliver([true, false]) }} />
                            Giao hàng
                        </p>
                        <p className='pick-up'>
                            <input type="checkbox" checked={pickUpDoorDeliver[1]} onChange={() => { setPickUpDoorDeliver([false, true]) }} />
                            Nhận tại quán
                        </p>
                    </div> : null}
                </div>
                {/* total container */}
                {total ?
                    <div className="total">
                        <p>Total: </p>
                        <p>{total}đ</p>
                    </div>
                    : null}
                <div className="button-next-container">
                    <button onClick={() => {
                        console.log(`create order :${JSON.stringify(data)} and total: ${total}`);
                        createOrder(curentUser[0].id, curentUser[0].addressDes, curentUser[0].phonDes, 'on Going', '', JSON.stringify(data), total);
                        clearCart()
                        setRefresh(!refresh)
                        alert('đặt thành công bạn có thể vào phần orders để check tiến độ')
                        reloadPage()
                        // navigation.navigate('homescreen')
                    }}>Xác nhận</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
