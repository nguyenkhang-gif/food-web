import React, { useEffect, useState } from 'react'
import '../styles/Userprofile.css'
import { userInfo, alluserAdress } from '../db.js'
import { Link } from 'react-router-dom'
const Userprofile = () => {
  const [userDes, setUserDes] = useState()

  //ví dụ vè user ID
  const ID = 1
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


  useEffect(() => {
    setMenuNavBar([false, false, true])
    setUserDes(userInfo)
    getalluseradress()
    console.log(alluserAdress);
  }, [])
  return (
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
          <div className="menu-option-name" ><p>{userDes ? userDes[0].Name : null}</p> </div>
          <div className="menu-option" onClick={() => { setMenuNavBar([true, false, false]) }}><p>Info</p> </div>
          <div className="menu-option" onClick={() => { setMenuNavBar([false, true, false]) }}><p>Adress</p></div>
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
                <p> {userDes ? userDes[0].Name : null}</p>
                <p>{userDes ? userDes[0].email : null}</p>
                <p>{userDes ? userDes[0].PhoneNum : null}</p>
                <button>cập nhật</button>
              </div>
            </div>
          </div>
          : menuNavBar[1] ?
            <div className="container-info">
              <div className="my-profile-header">
                {/* header */}
                <p>Địa chỉ của tôi</p>
                {/* end of header */}
              </div>
              <div className="user-info">
                <div className="container-user-info">
                  {/* add address */}
                  <div className="container-add-adress">
                    <input type="text" />
                    <button onClick={() => { alert('handle the địa chỉ và load lại trang nếu cần ') }}>Thêm </button>
                  </div>
                  {/* end of add address */}
                  {/* container all adress */}
                  <div className="container-user-adress">
                    {userAdress ?
                      userAdress.map((item) => {
                        return (
                          <div className="item-user-adress">
                            <p>{item.des}</p>
                            <button onClick={() => { alert(`handle xóa địa chỉ có ID = ${item.ID}`) }}>Xóa</button>
                          </div>)
                      }) : null
                    }
                  </div>
                  {/* end of container all adress */}
                </div>
              </div>
            </div>
            : menuNavBar[2] ?
              <div className="container-info">
                <div className="my-profile-header">
                  {/* header */}
                  <p>Địa chỉ của tôi</p>
                  {/* end of header */}
                </div>
                <div className="user-info">
                  <div className="container-user-info">
                    {/* add header */}
                    <div className="container-order-top-bar">
                      <p>Tên món</p>
                      <p>Số lượng</p>
                      <p>Trong giai đoạn</p>
                      <p>hủy</p>
                    </div>
                    {/* end of add address */}
                    {/* container all orders */}
                    <div className="container-user-adress">
                      {userAdress ?
                        userAdress.map((item) => {
                          return (
                            <Link style={{textDecoration:'none',color:'black'}} to={`/fooditem/${item.ID}`}>
                              <div className="item-user-adress" style={{ cursor: 'pointer' }}>
                                <p>Tên món</p>
                                <p>1</p>
                                <p>chuẩn bị</p>
                                <p><button onClick={() => { alert(`handle xóa địa chỉ có ID = ${item.ID}`); }}>Hủy</button></p>
                              </div>
                            </Link>
                          )
                        }) : null
                      }
                    </div>
                    {/* end of container all orders */}
                  </div>
                </div>
              </div> : null}
      </div>

      {/* end of right nav */}





      {/* <div className="container-user-info">
          <p>{userDes ? userDes[0].Name : null}</p>
          <p>{userDes ? userDes[0].email : null}</p>
          <p>{userDes ? userDes[0].PhoneNum : null}</p>
        </div> */}
    </div>
  )
}

export default Userprofile