import React from 'react'
import '../styles/Fooditem.css'
import { Link } from 'react-router-dom'

const FoodItem = ({imgurl,price,name,key,id}) => {
  return (
    <div className='fooditem-main-container'  >
        <Link className='Link-container' to={`/fooditem/${id}`}>
        <img src={imgurl} alt="" />
        <p>
        this is the {name}
        </p> 
        <span>{price}</span>
        </Link>
    </div>
  )
}

export default FoodItem