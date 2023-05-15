import { createContext, useEffect, useState } from "react";
// import { json } from "react-router-dom";
import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    // lấy token
    const [curentUser, setCurentUser] = useState(null)
    // const [curentUser, setCurentUser] = useState(JSON.parse(AsyncStorage.getItem("user")) || null)

    const _retrieveData = async () => {
        try {
            const value = await localStorage.getItem('user');
            if (value !== null) {
                // We have data!!
                console.log("get user", value);
                setCurentUser(JSON.parse(value))
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    };
    const _storeData = async () => {
        try {
            await localStorage.setItem(
                'user',
                JSON.stringify(curentUser),
            );
            console.log("user stored")
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    };
    const _removeData = async () => {
        try {
            await localStorage.removeItem(
                'user'
            );
            console.log("user remove")
            setCurentUser(null)
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    };

    const login = async (data) => {
        // console.log('login onl')
        // const res = await axios({
        //     method: 'post',
        //     url: 'http://localhost:8800/api/auth/login', // my Node server on 8800 port   
        //     data: user,
        //     withCredentials: true
        // })
        // setCurentUser(res.data)
        let result 
        try {
            axios.post(`http://localhost/food-app-api/user/login.php`, { email: data.email, password: data.password })
                .then((res) => {
                    console.log("res:", res.data[0])
                    if (res.data[0]) {
                        setCurentUser(res.data)
                        result=true
                    }else {
                        result=false
                    }
                })
        } catch (err) {
            result=false
            console.log("res:", err)
        }
        return result
    }
    const logout = async () => {
        // const res = await axios({
        //     method: 'post',
        //     url: 'http://localhost:8800/api/auth/logout', // my Node server on 8800 port   
        //     withCredentials: true
        // })
        // setCurentUser(null)
        _removeData()

    }
    useEffect(() => {
        _retrieveData()
        console.log("get data")
    }, [])
    useEffect(() => {
        // _retrieveData()
        // localStorage.setItem("user", JSON.stringify(curentUser))
        if(curentUser)_storeData()
        console.log("data shoudl be store :",curentUser)
        // console.log('this is the shit')
    }, [curentUser])
    const [refresh,setRefresh]= useState(false)
    const [OrderRefresh,setOrderRefresh]= useState(false)
    // const refreshLoop = setInterval(()=>{

    // },1000)
    useEffect(() => {
        const interval = setInterval(() => {
        //   console.log('This will run every second!');
          setOrderRefresh(!OrderRefresh)
        //   setRefresh(!refresh)
        //   setRefresh(!refresh)
        }, 1000);
        return () => clearInterval(interval);
      }, [OrderRefresh]);
    //   useEffect(()=>{
    //     console.log("order refresh")
    //   },[OrderRefresh])
    return <AuthContext.Provider value={{ curentUser, login, logout,setCurentUser,refresh,setRefresh,OrderRefresh,setOrderRefresh }}>
        {children}
    </AuthContext.Provider>
}
