import React, { useContext, useEffect, useState } from 'react'
import { AiFillCreditCard, AiOutlineCloseCircle, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import '../styles/FooditemPage.css'
import { allComment, productsData } from '../db.js'
import { createCart, getAllProduct, getCart, updateCart } from '../apicalls'
import { AuthContext } from '../context/authcontext'


const DATA = [
    {
        id: 1,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 2,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 3,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    },
    {
        id: 4,
        deliveryInfo: "Delivered between Monday aug and thusday  20 from 8am to 21:00pm",
        returnPo: "Delivered between are double check before deliver"
    }
]



const FooditemPage = () => {
    const pathID = window.location.pathname
    const [foodInfo, setFoodInfo] = useState()
    const [foodNamePrice, setFoodNamePrice] = useState()
    const [allComments, setAllComment] = useState([])
    const [mainData, setMainData] = useState([])




    // user
    const {curentUser,setRefresh,refresh} = useContext(AuthContext)

    // sử lý vẽ ngôi sao 

    const getimurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }


    const [allstar, setAllStar] = useState([1, 2, 3, 4, 5])
    const [tempRate, setTempRate] = useState(3)
    useEffect(() => {
        getAllProduct([mainData, setMainData])
    }, [])

    useEffect(() => {
        DATA.forEach(item => {
            if (pathID.split('/')[2] == item.id) setFoodInfo(item);
        })
        mainData.forEach(item => {
            if (pathID.split('/')[2] == item.ID) setFoodNamePrice(item);
        })

        // productsData
        console.log(pathID.split('/')[2])
    }, [mainData])

    // handle thêm vào cart
    // sử lý thêm vào giỏ hàng 
    const [tempData, setTempData] = useState([])
    useEffect(() => {
        if (curentUser) {
            getCart(curentUser[0].id, [tempData, setTempData])
        }
    }, [])
    const handleAddCart = () => {
        let ID = pathID.split('/')[2]
        if (!curentUser) {
            alert('bạn chưa đăng nhập')
        } else {
            // nếu chưa có sản phẩm trong cart 
            if (!tempData.length) {
                createCart(curentUser[0].id, ID)
                // setTempData([{ID:curentUser[0].id,itemID:ID,amount:1}])
                getCart(curentUser[0].id, [tempData, setTempData])
                alert('thêm thành công')
            }
            if (tempData.length) {
                let isInCart = false;
                tempData.forEach(item => {
                    if (item.itemID == ID) {
                        console.log('update: ', item.amount + 1)
                        updateCart(curentUser[0].id, ID, Number(item.amount) + 1)
                        // getCart(curentUser[0].id,[tempData,setTempData])
                        alert('đã thêm 1 sản phẩm cùng tên vào giỏ hàng')
                        isInCart = true
                    }
                })
                if (!isInCart) {
                    createCart(curentUser[0].id, ID)
                    alert('đã thêm 1 sản phẩm  vào giỏ hàng')
                }
                getCart(curentUser[0].id, [tempData, setTempData])
            }
        }
        setRefresh(!refresh)
    }


    return (
        <div className='fooditempage-main-container'>
            <div className="item-info-container">
                {/* left nav */}
                <div className="left-nav-container">
                    <div className="img-container">
                        <img src={foodNamePrice ? getimurlwithID(foodNamePrice.ID) : null} alt="" />
                    </div>
                    {/* item name price and add to cart button container  */}
                    {foodNamePrice ?
                        <div className="container-name-price-addtocartbtn">
                            <p className='Name'>{foodNamePrice.Name}</p>
                            <p className='Price'>{foodNamePrice.price} đ</p>
                            <button onClick={()=>handleAddCart()}>thêm vào giỏ </button>
                        </div>
                        : null}
                    {/* end of  item name price and add to cart button container  */}
                </div>
                {/* end of left nav */}
                {/* right nav */}
                {foodNamePrice ? <div className="right-nav-container">
                    <p className='header'>mô tả món ăn</p>
                    <p>{foodNamePrice.des}</p>
                    <p className='header'>Chính sách hoàn tiền</p>
                    <p>Hoàn tiền 100% nếu món ăn giao đến không đạt chất lượng hoặc không giống với hình </p>
                </div> : null}

                {/* end of right nav */}
            </div>
            {/* comment container */}
            <div className="comment-container" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                {/* title */}
                <p className='title'>Đánh giá</p>
                <div style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                    {/* 1 comment component */}
                    <div className="" style={{ display: 'flex', flexDirection: 'row', marginBottom: '35px', backgroundColor: '#fff' }}>
                        <div style={{ height: '40px', width: '40px', borderRadius: '20px', overflow: 'hidden' }}>
                            <img src={require('../assets/profile.jpg')} alt="" style={{ height: '40px' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', textAlign: 'left', alignItems: 'left', flexDirection: 'column', marginLeft: '10px' }}>
                            <p style={{ fontSize: '20px', margin: '5px', fontWeight: '600' }}>user name</p>
                            {/* sử lý vẽ ngôi sao  */}
                            <div style={{ marginLeft: 5 }}>
                                {allstar.map(item => {
                                    if (item <= 3) {
                                        return (
                                            <AiFillStar />
                                        )
                                    } else {
                                        return (
                                            <AiOutlineStar />
                                        )
                                    }
                                })}
                            </div>
                            {/* end of sử lý vẽ ngôi sao  */}
                            <div style={{ marginLeft: '5px' }}>
                                <p>đánh giá sản phẩm </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end of title */}
            </div>

            {/*  end of comment container */}
        </div>
    )
}

export default FooditemPage