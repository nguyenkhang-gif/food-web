import React, { useContext, useEffect, useState } from 'react'
import { AiFillCreditCard, AiOutlineCloseCircle, AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import '../styles/FooditemPage.css'
import { allComment, productsData } from '../db.js'
import { createCart, createFav, deleteFav, getAllProduct, getCart, getFav, updateCart } from '../apicalls'
import { AuthContext } from '../context/authcontext'
import { VNDFormat } from '../Funtions'


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
    const { curentUser, setRefresh, refresh } = useContext(AuthContext)

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


    // sử lý lấy Yêu thích
    const [isFav, setIsFav] = useState(false)
    const [allFav, setAllFav] = useState([])
    useEffect(() => {
        if (curentUser) { getFav(curentUser[0].id, [allFav, setAllFav]) }
    }, [curentUser])

    useEffect(() => {
        if (allFav.length) {
            allFav.forEach(item => {
                if (item.itemID == pathID.split('/')[2]) {
                    setIsFav(true)
                }
            })
        }
    }, [curentUser, allFav])


    const handleAddFav = () => {
        if (!isFav) {
            if (curentUser) { createFav(curentUser[0].id, pathID.split('/')[2]) }
            setIsFav(true)
        }
        if (isFav) {
            setIsFav(false)
            if (curentUser) deleteFav(curentUser[0].id, pathID.split('/')[2])
        }
        setRefresh(!refresh)
    }

    return (
        <div className='fooditempage-main-container'>
            <div className="item-info-container" style={{ position: 'relative',marginBottom:200 }}>
                {/* left nav */}
                <div className="left-nav-container">
                    <div className="img-container">
                        <img src={foodNamePrice ? getimurlwithID(foodNamePrice.ID) : null} alt="" />
                    </div>
                    {/* item name price and add to cart button container  */}
                    {foodNamePrice ?
                        <div className="container-name-price-addtocartbtn">
                            <p className='Name'>{foodNamePrice.Name}</p>
                            <p className='Price'>{VNDFormat(foodNamePrice.price)} đ</p>
                            <button onClick={() => handleAddCart()}>Thêm vào giỏ </button>
                        </div>
                        : null}
                    {/* end of  item name price and add to cart button container  */}
                </div>
                {/* end of left nav */}
                {/* right nav */}
                {foodNamePrice ? <div className="right-nav-container">
                    <p className='header'>Mô tả món ăn</p>
                    <p>{foodNamePrice.des}</p>
                    <p className='header'>Chính sách hoàn tiền</p>
                    <p>Hoàn tiền 100% nếu món ăn giao đến không đạt chất lượng hoặc không giống với hình </p>
                </div> : null}

                {/* end of right nav */}

                <div style={{ position: 'absolute', top: 30, right: 30, cursor: 'pointer' }} onClick={() => handleAddFav()}>
                    {!isFav ? <AiOutlineHeart size={34} /> : <AiFillHeart size={34} />}
                </div>
            </div>
            {/* comment container */}
           

            {/*  end of comment container */}
        </div>
    )
}

export default FooditemPage