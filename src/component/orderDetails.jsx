import React, { useContext, useEffect, useState } from 'react'
// import '../styles/OrderDetail.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import { AiFillCreditCard, AiOutlineCloseCircle, AiOutlineStar, AiFillStar, AiFillCloseCircle } from 'react-icons/ai'
import { getAllProduct, getOrder } from '../apicalls'
import { productsData } from '../db'
const OrderDetail = ({ data, onClickClose }) => {
    const { curentUser, refresh, setCurentUser, OrderRefresh } = useContext(AuthContext)

    // const [mainData,setMainData] = useState()
    // useEffect(()=>{
    //     getOrder(curentUser[0].data,)
    // },[curentUser,data])
    const navigate = useNavigate()

    useEffect(() => {
        console.log("order data", data)
    }, [data])
    const [allItem, setallItem] = useState([])
    useEffect(() => {
        if (data) {
            setallItem(JSON.parse(data.OrderInfo))
        }
    }, [data])

    useEffect(() => {
        if (allItem.length) {
            console.log('all item', allItem)
        }
    }, [allItem])
    const [allProductItem, setAllProductItem] = useState([])
    useEffect(() => {
        getAllProduct([allProductItem, setAllProductItem])
    }, [])
    useEffect(() => {
        if (allProductItem.length) {
            console.log(allProductItem)
        }
    }, [allProductItem])

    const getimgurlwithID = (ID) => {
        let temp
        productsData.forEach(item => {
            if (item.id == ID) {
                temp = item.imgurl
            }
        })
        return temp
    }
    const getNameWithID = (ID) => {
        let temp
        allProductItem.forEach(item => {
            if (item.ID == ID) {
                // console.log('name',item)
                temp = item.Name
            }
        })
        return temp
    }
    const getPriceWithID = (ID) => {
        let temp
        allProductItem.forEach(item => {
            if (item.ID == ID) {
                // console.log('name',item)
                temp = item.price
            }
        })
        return temp
    }




    return (
        <div  >
            <div style={{ width: 10000, opacity: 0.5, height: 10000, backgroundColor: 'gray', position: 'fixed', left: 0, top: 0 }}  >

            </div>
            {/* main */}
            <div style={{ minHeight: 500, minWidth: 500, backgroundColor: 'white', position: 'absolute', width: 'fit-content', opacity: 1, left: '50%', transform: 'translate(-50%, 0)', borderRadius: 20 }}>
            <div style={{position:'absolute',right:10,top:10,cursor:'pointer'}} onClick={()=>onClickClose()}>

                <AiFillCloseCircle color='black' size={24} />
            </div>
                {/* header */}
                <div style={{ margin: 10, padding: 5, borderBottom: '2px solid black' }}>
                    <p style={{ marginTop: 10, fontSize: 20, fontWeight: '700' }}>Chi tiết</p>
                </div>
                {/* end of header */}
                {/* main */}
                <div>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>
                        <p style={{ fontWeight: '700', fontSize: 17, alignContent: 'flex-start', display: 'flex', marginBottom: 20 }}>
                            Thông tin
                        </p>
                        <div className='shadow-eff' style={{ marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10 }}>
                            <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10, marginLeft: 10, marginRight: 10 }}>
                                {curentUser?.[0].Name}
                            </p>
                            <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10, marginLeft: 10, marginRight: 10 }}>
                                {data?.phonenumID}
                            </p>
                            <p style={{ alignContent: 'flex-start', display: 'flex', padding: 10, marginLeft: 10, marginRight: 10 }}>
                                {data?.addressID}
                            </p>
                        </div>
                    </div>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>
                        <div className='shadow-eff' style={{ marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10 }}>
                            <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10, marginLeft: 10, marginRight: 10 }}>
                                Tình trạng: {data?.status}
                            </p>
                        </div>

                    </div>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>

                        <p style={{ fontWeight: '700', fontSize: 17, alignContent: 'flex-start', display: 'flex', marginBottom: 20, marginTop: 20 }}>
                            Chi tiết các món
                        </p>

                        <p style={{ justifyContent: 'flex-end', display: 'flex', borderBottom: '1px solid black', padding: 10, marginBottom: 10 }}>
                            <p style={{ width: 100 }}></p>
                            <p style={{ width: 100 }}>Tên</p>
                            <p style={{ width: 100 }}>Giá</p>
                            <p style={{ width: 80 }}>Số lượng</p>
                        </p>
                        {allItem?.map(item => {
                            return (
                                <p className='shadow-eff' onClick={() => { navigate(`/fooditem/${item.itemID}`) }} style={{ cursor: 'pointer', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', borderBottom: '1px solid black', padding: 5, borderRadius: 10, marginBottom: 20 }}>
                                    <div style={{ overflow: 'hidden', height: 100, borderRadius: '50%', width: 100, margin: 10 }}>
                                        <img src={allProductItem && getimgurlwithID(item.itemID)} style={{ height: 100 }} alt="" />
                                    </div>
                                    <p> {allProductItem && getNameWithID(item.itemID)}</p>
                                    <p style={{ fontSize: 17, fontWeight: '600', color: '#F47B0A' }} >
                                        {allProductItem && getPriceWithID(item.itemID)} đ
                                    </p>
                                    <p>{allProductItem && item.amount}</p>
                                </p>
                            )
                        })}


                    </div>
                </div>
                {/* end of main */}
            </div>
            {/* end of main */}

        </div>
    )
}

export default OrderDetail