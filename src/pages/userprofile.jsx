import React, { useContext, useEffect, useState } from 'react'
import '../styles/Userprofile.css'
import { userInfo, alluserAdress } from '../db.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import { getOrder, updateUserInfo } from '../apicalls'
import OrderDetail from '../component/orderDetails'
const Userprofile = () => {
  const [userDes, setUserDes] = useState()
  const { curentUser, refresh, setCurentUser, OrderRefresh } = useContext(AuthContext)
  //ví dụ vè user ID
  const ID = curentUser
  // xử lý nhấn các option trong menu 
  const [menuNavBar, setMenuNavBar] = useState([])
  // sử lý render all địa chỉ của người dùng hiện tại 
  const [userAdress, setUserAdress] = useState([])

  const getalluseradress = () => {
    let temparray = []
    alluserAdress.forEach(item => {
      if (item.ID == ID) {
        temparray.push(item)
      }
    })
    setUserAdress(temparray)
  }



  // user
  const [Name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phonenumber, setPhonenum] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    setMenuNavBar([false, false, true])
    // setUserDes(userInfo)
    // getalluseradress()
    // console.log(alluserAdress);
  }, [])

  useEffect(() => {
    if (curentUser) {

      setName(curentUser[0].Name)
      setUserName(curentUser[0].Username)
      setEmail(curentUser[0].Email)
      setPassword(curentUser[0].Password)
      setPhonenum(curentUser[0].phonDes)
      setAddress(curentUser[0].addressDes)
    }
    // setIsLoadData(false)
    // setPhonenumberArray([])
  }, [curentUser, refresh])


  // orders details 
  const [orderID, setOrderID] = useState()

  // user orders


  const [mainData, setMainData] = useState([])

  useEffect(() => {
    if (curentUser) {
      getOrder(curentUser[0].id, [mainData, setMainData])
    }
    console.log(mainData)
  }, [
    curentUser,
    refresh,
    // OrderRefresh
  ])
  return (
    curentUser ?
      <div className='container-userprofile'>


        {/* left nav  */}
        <div className="container-profile-left-nav">
          <div className="profile-img">
            <img
              src={require('../assets/profile.jpg')}
              alt=''
            />
          </div>
          {/* user menu option  */}
          <div className="container-user-menu-option">
            <div className="menu-option-name" ><p>{curentUser[0].Name}</p> </div>
            <div className="menu-option" onClick={() => { setMenuNavBar([true, false, false]) }}><p>Info</p> </div>
            {/* <div className="menu-option" onClick={() => { setMenuNavBar([false, true, false]) }}><p>Adress</p></div> */}
            <div className="menu-option" onClick={() => { setMenuNavBar([false, false, true]) }}><p>Orders</p></div>
          </div>

          {/* end of  user menu  */}
        </div>
        {/* end of left nav  */}

        {/* right nav */}
        <div className="container-profile-right-nav">
          {menuNavBar[0] ?
            <div className="container-info">
              <div className="my-profile-header">
                {/* header */}
                <p>Hồ sơ của tôi</p>
                {/* end of header */}
              </div>
              <div className="user-info">
                <div className="container-user-info">
                  <p>Tên:
                    <input style={{ height: 30, marginLeft: 20 }} type="text" value={Name ? Name : null} onChange={(e) => { setName(e.target.value) }} />
                  </p>
                  <p>Email:
                    <input style={{ height: 30, marginLeft: 20 }} type="text" value={email ? email : null} onChange={(e) => { setEmail(e.target.value) }} />
                  </p>
                  <p>Mật khẩu:
                    <input style={{ height: 30, marginLeft: 20 }} type="password" value={password ? password : null} onChange={(e) => { setName(e.target.value) }} />
                  </p>
                  <p>Số điện thoại:
                    <input style={{ height: 30, marginLeft: 20 }} type="text" value={phonenumber ? phonenumber : null} onChange={(e) => { setPhonenum(e.target.value) }} />
                  </p>

                  <p>Địa chỉ:
                    <input style={{ height: 30, marginLeft: 20, width: '100%', maxWidth: 500 }} type="text" value={address ? address : null} onChange={(e) => { setAddress(e.target.value) }} />
                  </p>
                  <button
                    onClick={() => {
                      updateUserInfo({ Name, userName, userName, email, password, phonenumber, address, id: curentUser[0].id });
                      setCurentUser([{ Email: email, Name: Name, Password: password, Username: userName, phonDes: phonenumber, addressDes: address, id: curentUser[0].id, }])
                    }}
                  >cập nhật</button>
                </div>
              </div>
            </div>
            : menuNavBar[2] ?
              <div className="container-info">
                <div className="my-profile-header">
                  {/* header */}
                  <p>Đơn hàng</p>
                  {/* end of header */}
                </div>
                <div className="user-info">
                  <div className="container-user-info">
                    {/* add header */}
                    <div style={{ display: 'flex', marginTop: 20 }}>
                      <p >Mã đơn</p>
                      <p>tổng tiền</p>
                      <p>Trong giai đoạn</p>
                      {/* <p>hủy</p> */}
                    </div>
                    {/* end of add address */}
                    {/* container all orders */}
                    <div className="container-user-adress">
                      {mainData ?
                        mainData.map((item) => {
                          return (
                            <Link style={{ textDecoration: 'none', color: 'black' }}
                              // to={`/fooditem/${item.ID}`}
                              onClick={() => { setMenuNavBar([false, true, false]); setOrderID(item) }}
                            >
                              <div className="item-user-adress" style={{ cursor: 'pointer' }}>
                                <p>{item.ID}</p>
                                <p style={{ fontSize: 16, fontWeight: '500', color: '#FA4A0C' }}>{item.Total}đ</p>
                                <p style={{}}>{item.status}</p>
                                {/* <p><button onClick={() => { alert(`handle xóa địa chỉ có ID = ${item.ID}`); }}>Hủy</button></p> */}
                              </div>
                            </Link>
                          )
                        }) :null
                      }
                    </div>
                    {/* end of container all orders */}
                  </div>
                </div>
              </div> : menuNavBar[1]?<OrderDetail data={orderID}/>:null}
        </div>

        {/* end of right nav */}





        {/* <div className="container-user-info">
          <p>{userDes ? userDes[0].Name : null}</p>
          <p>{userDes ? userDes[0].email : null}</p>
          <p>{userDes ? userDes[0].PhoneNum : null}</p>
        </div> */}
      </div> : null
  )
}

export default Userprofile