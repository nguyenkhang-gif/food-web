import axios from 'axios'

export  const getAllProduct = async ([data,setdata]) => {
    // let final
    try{
        axios.get(`http://localhost/food-app-api/product/read.php`)
        .then((res) => {
            console.log(res.data)
            setdata(res.data)
        })
    }catch(err){

    }
    // return final
}