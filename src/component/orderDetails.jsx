import React, { useContext, useEffect, useState } from 'react'
// import '../styles/OrderDetail.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import { getOrder } from '../apicalls'
import { productsData } from '../db'
const OrderDetail = ({ data }) => {
    const { curentUser, refresh, setCurentUser, OrderRefresh } = useContext(AuthContext)

    // const [mainData,setMainData] = useState()
    // useEffect(()=>{
    //     getOrder(curentUser[0].data,)
    // },[curentUser,data])

    useEffect(() => {
        console.log("order data", data)
    }, [data])
    const [allItem, setallItem] = useState([])
    useEffect(() => {
        if (data) {
            setallItem(JSON.parse(data.OrderInfo))
        }
    }, [data])

    useEffect(()=>{
        if(allItem.length){
            console.log('all item',allItem)
        }
    },[allItem])


    return (
        <div  >
            <div style={{ width: 10000, opacity: 0.5, height: 10000, backgroundColor: 'gray', position: 'fixed', left: 0, top: 0 }}  >

            </div>
            {/* main */}
            <div style={{ minHeight: 500, minWidth: 500, backgroundColor: 'white', position: 'absolute', width: 'fit-content', opacity: 1, left: '50%', transform: 'translate(-50%, 0)', borderRadius: 20 }}>
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
                        <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10 }}>
                            {curentUser?.[0].Name}
                        </p>
                        <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10 }}>
                            {data?.phonenumID}
                        </p>
                        <p style={{ alignContent: 'flex-start', display: 'flex', padding: 10 }}>
                            {data?.addressID}
                        </p>
                    </div>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>

                        <p style={{ alignContent: 'flex-start', display: 'flex', borderBottom: '1px solid black', padding: 10 }}>
                            Tình trạng: {data?.status}
                        </p>

                    </div>
                    <div style={{ marginLeft: 10, marginRight: 10 }}>

                        <p style={{ fontWeight: '700', fontSize: 17, alignContent: 'flex-start', display: 'flex', marginBottom: 20, marginTop: 20 }}>
                            Chi tiết các món
                        </p>

                        <p style={{ justifyContent: 'space-evenly', display: 'flex', borderBottom: '1px solid black', padding: 10 }}>
                            <p></p>
                            <p>Tên</p>
                            <p>Giá</p>
                            <p>Số lượng</p>
                        </p>
                        <p style={{ justifyContent: 'space-evenly', display: 'flex', borderBottom: '1px solid black', padding: 10 }}>
                            <p></p>
                            <p>Tên</p>
                            <p>Giá</p>
                            <p>Số lượng</p>
                        </p>

                    </div>
                </div>
                {/* end of main */}
            </div>
            {/* end of main */}

        </div>
    )
}

export default OrderDetail