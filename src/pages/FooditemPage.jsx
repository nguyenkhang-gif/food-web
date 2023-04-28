import React, { useEffect, useState } from 'react'
import { AiFillCreditCard, AiOutlineCloseCircle, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import '../styles/FooditemPage.css'
import { allComment, productsData } from '../db.js'


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



    // sử lý vẽ ngôi sao 

    const [allstar, setAllStar] = useState([1, 2, 3, 4, 5])
    const [tempRate, setTempRate] = useState(3)

    useEffect(() => {
        DATA.forEach(item => {
            if (pathID.split('/')[2] == item.id) setFoodInfo(item);
        })
        productsData.forEach(item => {
            if (pathID.split('/')[2] == item.id) setFoodNamePrice(item);
        })

        // productsData
        console.log(pathID.split('/')[2])
    }, [])

    return (
        <div className='fooditempage-main-container'>
            <div className="item-info-container">
                {/* left nav */}
                <div className="left-nav-container">
                    <div className="img-container">
                        <img src={foodNamePrice?.imgurl} alt="" />
                    </div>
                    {/* item name price and add to cart button container  */}
                    {foodNamePrice ?
                        <div className="container-name-price-addtocartbtn">
                            <p className='Name'>{foodNamePrice.Name}</p>
                            <p className='Price'>{foodNamePrice.Price} đ</p>
                            <button>thêm vào giỏ </button>
                        </div>
                        : null}
                    {/* end of  item name price and add to cart button container  */}
                </div>
                {/* end of left nav */}
                {/* right nav */}
                {foodInfo ? <div className="right-nav-container">
                    <p className='header'>mô tả món ăn</p>
                    <p>{foodInfo.deliveryInfo}</p>
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
                    <div className="" style={{ display: 'flex', flexDirection: 'row' }}>
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