import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../App.css'
import {AddItem, updateItem, removeItem} from './CartHelpers';

const Card = ({ product,
                showViewProductButton= true,
                showAddToCartButton=true,
                cartUpdate = false,
                showRemoveProductButton= false ,
                setRun = f=>f,
                run = undefined
        }) => {
const [redirect, setRedirect] = useState(false)
const [count, setCount] = useState(product.count)
    const showViewButton = (showViewProductButton)=>{
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                View product
            </button>
            </Link>
            )
        )
    }

    const addToCart = () =>{
        AddItem(product, ()=>{
            setRedirect(true);
        })
    }

    const shouldRedirect=()=>{
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }
    const ShowAddToCart = (showAddToCartButton)=>{
        return(
                showAddToCartButton&&
                ( <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                            Add to cart
                 </button>
                )
        )
    }
    const ShowRemoveButton = (showRemoveProductButton)=>{
        return(
                showRemoveProductButton &&
                ( <button onClick={()=>{
                    removeItem(product._id)
                    setRun(!run)
                }}
                 className="btn btn-outline-danger mt-2 mb-2">
                    Remove Products
                 </button>
                )
        )
    }

    const showStock = (quantity)=>{
        return quantity>0 ? <span className="badge badge-primary badge-pill">In Stock</span> :
         <span  className="badge badge-primary badge-pill">Out of Stock</span>
    }

    const showCartUpdateOptions = cartUpdate=>{
        return cartUpdate &&
        (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input type="number"
                     className="form-control"
                      value={count}
                     onChange={handleChange(product._id)}
                        />
                </div>
            </div>
        )
    }

    const handleChange = productId => event=> {
        setRun(!run);
        setCount(event.target.value <1 ? 1: event.target.value)
        if(event.target.value >=1){
            updateItem(productId, event.target.value)
        }
    }
    return (
            <div className="card">
                <div className="card-header card-header-1">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{product.description.substring(0, 50)}</p>
                    <p className="black-10">₹ {product.price}</p>
                    <p className="black-9">Category : {product.category && product.category.name}</p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                   
                   {showStock(product.quantity)}
                   <br/>
                   {showViewButton(showViewProductButton)}
                   { ShowAddToCart(showAddToCartButton)}
                   {ShowRemoveButton(showRemoveProductButton)}
                   {showCartUpdateOptions(cartUpdate)}
                   
                </div>
            </div>
       
    )
}

export default Card;
