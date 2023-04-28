import React, { useEffect, useState } from 'react'
import '../styles/CheckoutPage.css'
import { userInfo, alluserAdress } from '../db.js'
import { AiFillCreditCard, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCash } from 'react-icons/bs'
const CheckoutPage = ({ mainData, total, closeTab }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        setUser(userInfo)

    }, [])

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

    return (
        <div className='container-checkoutpage'>
            <div className="header">
                <p>{toPayMent ? 'Thanh toán' : 'Check out'}</p>
                <AiOutlineCloseCircle className='close-icon' onClick={() => { closeTab() }} />
            </div>

            {!toPayMent ? <div className="main">
                <p className='title'>Delivery</p>
                <div className="address-container">
                    <p className='title'>Address details</p>
                    <p className='change'>change</p>
                    {/* user name address phone Num */}
                    {user ? <div className="Name-address-phonnum">
                        <p className='Name'>{user[0].Name}</p>
                        <p className='Address'>{getAddressWithID(user[0].ID)}</p>
                        <p className='Phonenum'>{user[0].PhoneNum}</p>
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
                    <button onClick={() => { setToPayment(true) }}>Tiếp theo</button>
                </div>
            </div> :
                // payment section
                <div className="main">
                    <div className="address-container">
                        <p className='title'>Phương thức thanh toán</p>
                        {/* user name address phone Num */}
                        {user ? <div className="Name-address-phonnum">
                            <p className='Cart'>
                                <input type="checkbox" checked={creditCash[0]} onChange={()=>setCreditCash([true,false])} />
                                <p>Thẻ ngân hàng</p>
                                <AiFillCreditCard className='credit-card-icon' />
                            </p>
                            {/* <p className='Address'>{getAddressWithID(user[0].ID)}</p> */}
                            <p className='Cash'>
                                <input type="checkbox" checked={creditCash[1]} onChange={()=>setCreditCash([false,true])} />
                                <p> Tiền mặt </p>
                                <BsCash className='cash-icon' />
                            </p>
                        </div> : null}
                    </div>
                    <p className='title'>Delivery method</p>
                    <div className="Delivery-pickup-container">

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
                        <button onClick={() => { alert('handle sử lý đơn') }}>Xác nhận</button>
                        <p onClick={() => { setToPayment(false) }}>quay về</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default CheckoutPage
