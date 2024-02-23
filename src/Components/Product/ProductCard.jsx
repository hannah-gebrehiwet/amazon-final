import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import Currencyformat from "../CurrencyFormat/Currencyformat";
import classes from "./products.module.css";
import { Link } from "react-router-dom";
import {Type} from'../../utility/action.type'
import { DataContext } from "../Dataprovider/Dataprovider"; 

function ProductCard({ product, flex,renderDesc }) {
  const { image, title, id, rating, price, description } = product;
  const[state,dispatch]=useContext(DataContext)
  // console.log(state)
  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,title,id,rating,price,description
        
      }
    })
  }
  // console.log(dispatch);
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"500px"}}> {description} </div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <Currencyformat amount={price} />
        </div>
        <button className={classes.button}onClick={addtocart}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
