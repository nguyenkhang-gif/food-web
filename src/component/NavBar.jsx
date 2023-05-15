import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import '../styles/NavBar.css'
import { AuthContext } from '../context/authcontext'
import { getCart } from '../apicalls'
const NavBar = () => {
  const [arraySelect, setArraySelect] = useState([true, false, false, false])
  const [user, setUser] = useState()
  const { curentUser, logout,refresh,OrderRefresh } = useContext(AuthContext)
  // useEffect(()=>{
  //     console.log(curentUser?'there is user':'there are no user')
  // },[])


  const navigate = useNavigate()
  // const [allCartItem, setAllCartItem] = useState([])
  useEffect(() => {
    // setAllCartItem([
    //   {
    //     ID: 1,
    //     itemName: "milk",
    //     price: 10000
    //   },
    //   {
    //     ID: 2,
    //     itemName: "milk",
    //     price: 10000
    //   },
    //   {
    //     ID: 3,
    //     itemName: "milk",
    //     price: 10000
    //   },
    //   {
    //     ID: 4,
    //     itemName: "milk",
    //     price: 10000
    //   },
    // ])

    // sử lý context user

    // setUser({
    //   Name: 'Khang',
    //   email: 'nguyennguyenkhang915@gmail.com',
    //   phoneNum: '0902222293'
    // })
  }, [])

  // handle lấy tất cả cart 
  const [allCart,setAllCart]= useState([])
  useEffect(()=>{
      if(curentUser){getCart(curentUser[0].id,[allCart,setAllCart]);console.log('cart refesr')}
  },[curentUser,refresh])


  useEffect(()=>{
    if(allCart.length){
      console.log('all cart',allCart)
    }else {
      console.log('there are no cart')
    }
  },[allCart])
  // sử lý hover icon profile hiện thông tin cơ bản của user
  const [isHoverUserIcon, setIsHoverUserIcon] = useState(false)

  ///
  // end of sử lý hover icon profile hiện thông tin cơ bản của user
  return (
    <div className='navbar-main-container'>
      <div className="img-container">
        <Link to={'/'}>
          <img src={logo} alt="" className='img' />
        </Link>
      </div >
      {isHoverUserIcon && curentUser ? <div className="container-profile" >
        <p className='user-name'>{curentUser && curentUser[0].Name}</p>
        <p className='user-email'>{curentUser && curentUser[0].Email}</p>
        <p className='user-phonenum'>{curentUser && curentUser[0].phonDes}</p>
      </div> : null}
      <div className="menu-container">

        <CgProfile onClick={() => {
          if (!curentUser) {
            navigate('/login')
          } else {
            navigate('/userprofile')
          }
        }} className='icon-profile' onMouseEnter={() => { setIsHoverUserIcon(true) }} onMouseLeave={() => { setIsHoverUserIcon(false) }} />

        <Link to={'/'} >
          <p className={arraySelect[0] ? 'section-selected' : null} onClick={() => { setArraySelect([true, false, false, false]) }}>Home</p>
        </Link>
        {curentUser ?
          <Link >
            <p onClick={() => { alert('handle logout'); logout() }}>Logout</p>
          </Link>
          : <>
            <Link to={'/login'}>
              <p className={arraySelect[1] ? 'section-selected' : null} onClick={() => { setArraySelect([false, true, false, false]) }}>Login</p>
            </Link>
            <Link to={'/register'}>
              <p className={arraySelect[2] ? 'section-selected' : null} onClick={() => { setArraySelect([false, false, true, false]) }}>Register</p>
            </Link>
          </>
        }
        <Link to={'/shopcart'}>
          <p className={arraySelect[3] ? 'section-selected' : null} onClick={() => { setArraySelect([false, false, false, true]) }}><AiOutlineShoppingCart className='shop-cart-icon' /><span className='cart-number'>{allCart.length}</span></p>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
