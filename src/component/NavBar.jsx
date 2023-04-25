import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import '../styles/NavBar.css'
const NavBar = () => {
  const [arraySelect, setArraySelect] = useState([true, false, false, false])
  const [user, setUser] = useState()

  const [allCartItem, setAllCartItem] = useState([])
  useEffect(() => {
    setAllCartItem([
      {
        ID: 1,
        itemName: "milk",
        price: 10000
      },
      {
        ID: 2,
        itemName: "milk",
        price: 10000
      },
      {
        ID: 3,
        itemName: "milk",
        price: 10000
      },
      {
        ID: 4,
        itemName: "milk",
        price: 10000
      },
    ])

    // sử lý context user
    setUser({
      Name: 'Khang',
      email: 'nguyennguyenkhang915@gmail.com',
      phoneNum: '0902222293'
    })
  }, [])


  // sử lý hover icon profile hiện thông tin cơ bản của user
  const [isHoverUserIcon, setIsHoverUserIcon] = useState(false)

  ///
  // end of sử lý hover icon profile hiện thông tin cơ bản của user
  return (
    <div className='navbar-main-container'>
      <div className="img-container">
        <img src={logo} alt="" className='img' />
      </div>
      {isHoverUserIcon ? <div className="container-profile">
        <p className='user-name'>{user?.Name}</p>
        <p className='user-email'>{user?.email}</p>
        <p className='user-phonenum'>{user?.phoneNum}</p>
      </div> : null}
      <div className="menu-container">
        <Link to={'/userprofile'}>
          <CgProfile className='icon-profile' onMouseEnter={() => { console.log('mouse in!!!!!!'); setIsHoverUserIcon(true) }} onMouseLeave={() => { console.log('mouse out'); setIsHoverUserIcon(false) }} />
        </Link>
        <Link to={'/'} >
          <p className={arraySelect[0] ? 'section-selected' : null} onClick={() => { setArraySelect([true, false, false, false]) }}>Home</p>
        </Link>
        <Link to={'/login'}>
          <p className={arraySelect[1] ? 'section-selected' : null} onClick={() => { setArraySelect([false, true, false, false]) }}>Login</p>
        </Link>
        <Link to={'/register'}>
          <p className={arraySelect[2] ? 'section-selected' : null} onClick={() => { setArraySelect([false, false, true, false]) }}>Register</p>
        </Link>
        <Link to={'/shopcart'}>
          <p className={arraySelect[3] ? 'section-selected' : null} onClick={() => { setArraySelect([false, false, false, true]) }}><AiOutlineShoppingCart className='shop-cart-icon' /><span className='cart-number'>{allCartItem && allCartItem.length}</span></p>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
