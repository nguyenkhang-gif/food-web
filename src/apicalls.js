import axios from 'axios'

export const getAllProduct = async ([data, setdata]) => {
    // let final
    try {
        axios.get(`http://localhost/food-app-api/product/read.php`)
            .then((res) => {
                console.log(res.data)
                setdata(res.data)
            })
    } catch (err) {

    }
    // return final
}


export const register = async (data) => {
    console.log("register call")
    try {
        axios.post(`http://localhost/food-app-api/user/register.php`, { email: data.email, password: data.password })
            .then((res) => {
                console.log("user have been create",res)
                // setdata(res.data)
            })
    } catch (err) {
        console.log(err)
    }
}
export const updateUserInfo = async (data) => {
    // // console.log(data.email)
    try {
        axios.post(`http://localhost/food-app-api/user/update.php`,
            {
                id: data.id,
                email: data.email,
                password: data.password,
                name: data.Name,
                username: data.userName,
                phonenum: data.phonenumber,
                address: data.address
            })
            .then((res) => {
                console.log("user have been create")
                // setdata(res.data)
            })
    } catch (err) {

    }
    console.log(data.id)
}


// phone num section


// fav option
export const createFav = async (userID, itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/fav/create.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("fav num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const getFav = async (userID, [data, setdata]) => {//ID là user ID desc là sđt của user 

    try {
        axios.post(`http://localhost/food-app-api/fav/read.php`, { userID: userID })
            .then((res) => {
                console.log("fav num has been calls: ", res.data == 'none')
                if (res.data != 'none') {
                    console.log('there is a res')
                    setdata(res.data)
                } else {
                    console.log('set main data = []')
                    setdata([])
                }
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const deleteFav = async (userID, itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/fav/delete.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("fav num has been delete")
                // setdata(res.data)
            })
    } catch (err) {

    }
}





//  cart
export const createCart = async (userID, itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/cart/create.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("cart num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const deleteCart = async (userID, itemID) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/cart/delete.php`, { userID: userID, itemID: itemID })
            .then((res) => {
                console.log("cart num has been delete")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const updateCart = async (userID, itemID, amount) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/cart/update.php`, { userID: userID, itemID: itemID, amount: amount })
            .then((res) => {
                console.log("cart num has been added")
                // setdata(res.data)
            })
    } catch (err) {

    }
}
export const getCart = async (userID, [data, setdata]) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/cart/read.php`, { userID: userID })
            .then((res) => {
                console.log("cart num has been called")
                if (res.data != 'none') {
                    setdata(res.data)
                }
                else {
                    setdata([])
                }
            })
    } catch (err) {

    }
}


// orders


export const createOrder = async (userID, addressID, phonenumID, status, des, OrderInfo, Total) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/order/create.php`, {
            userID: userID,
            addressID: addressID,
            phonenumID: phonenumID,
            status: status,
            des: des,
            OrderInfo: OrderInfo,
            Total: Total
        })
            .then((res) => {
                // if (res.data != 'none') {
                //     // console.log('there is a res')
                //     setdata(res.data)
                // }
            })
    } catch (err) {

    }
}
export const getOrder = async (userID, [data, setData]) => {//ID là user ID desc là sđt của user 
    try {
        axios.post(`http://localhost/food-app-api/order/read.php`, {
            userID: userID,
        })
            .then((res) => {
                if (res.data != 'none') {
                    console.log('there is a res')
                    setData(res.data)
                } else {
                    console.log('set main data = []')
                    setData([])
                }
            })
    } catch (err) {

    }
}

