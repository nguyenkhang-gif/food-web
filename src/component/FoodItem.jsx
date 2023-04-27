import React from 'react'
import '../styles/Fooditem.css'
import { Link } from 'react-router-dom'

const FoodItem = ({ imgurl, price, name, key, id }) => {
  return (
    <div className='fooditem-main-container'  >
      <Link className='Link-container' to={`/fooditem/${id}`}>
        <div className="food-item-img">
          <img src={imgurl} alt="" />
        </div>
        <p>
          {name}
        </p>
        {price?<span>{price}đ</span>:null}
      </Link>
    </div>
  )
}

export default FoodItem