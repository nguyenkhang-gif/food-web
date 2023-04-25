import React, { useEffect, useState } from 'react'
import '../styles/Userprofile.css'
import { userInfo } from '../db.js'
const Userprofile = () => {
  const [userDes, setUserDes] = useState()


  // xử lý nhấn các option trong menu 
  const [menuNavBar, setMenuNavBar] = useState([])





  useEffect(() => {
    setMenuNavBar([true, false, false])
    setUserDes(userInfo)
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
          <div className="menu-option" onClick={()=>{setMenuNavBar([true,false,false])}}><p>Info</p> </div>
          <div className="menu-option" onClick={()=>{setMenuNavBar([false,true,false])}}><p>Adress</p></div>
          <div className="menu-option" onClick={()=>{setMenuNavBar([false,false,true])}}><p>Orders</p></div>
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
                  <button>cập nhật</button>
                </div>
                {/* end of add address */}
              </div>
            </div>
          </div>
          : null}
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