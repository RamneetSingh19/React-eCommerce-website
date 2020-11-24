import React, { useState,useEffect } from 'react';
import Layout from './Layout';
import { getProducts,getBraintreeClientToken,processPayment,createOrder} from './ApiCore';
import Card from './Card';
import {isAuthenticated} from '../auth';
import { Link } from 'react-router-dom';
import { emptyCart} from './CartHelpers'

import DropIn from 'braintree-web-drop-in-react'

    const Checkout = ({products, setRun = f => f, run = undefined })=>{

        const [data, setData]= useState({
            loading: false,
            success: false,
            clientToken: null,
            error: '',
            instance: {},
            address: ''
        })

    
        const userId = isAuthenticated() && isAuthenticated().user._id
        const token = isAuthenticated() && isAuthenticated().token

        const getToken = (userId, token) =>{
            getBraintreeClientToken(userId, token).then(data=>{
                if(data.error){
                    setData({...data, error: data.error})
                }else{
                    setData({ clientToken: data.clientToken})
                }
            })
        }

    useEffect(()=>{
        getToken(userId, token)
    }, [])

    const handleAddress = event =>{
        setData({...data, address: event.target.value})
    }
    const getTotal =()=>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckOut = ()=>{
        return(
            isAuthenticated() ? (
            <div >{showDropIn()}</div>
            ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign In to checkout</button>
                </Link>
                
            )
        )
    }
     // WE WANT ADDRESS STORED IN STATE AND WE CAN'T USE data.address in requestPatmentMethod below BECAUSE WE ARE RETURNING data FROM THERE TOO

    let deliveryAddress = data.address; 

    const buy = ()=>{
        setData({loading: true})
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(data=>{
            console.log(data)
            nonce = data.nonce
            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged

            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response=>{
                
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress
                }

                createOrder(userId, token, createOrderData)
                .then(response =>{
                    emptyCart(()=>{
                        setRun(!run)
                    console.log('Payment success and empty cart')
                    setData({loading: false ,success:true}) 
                })
                })
                .catch(error=>{
                    console.log(error)
                    setData({loading: false})  
                })
                
            })
            .catch(err=>{
                console.log(err)
                setData({loading: false})
            })
        })
        .catch(error =>{
            // console.log('dropin error :', error)
            setData({...data,error:error.message})
        })

    }

    const showDropIn = ()=>(
        <div onBlur={()=>{setData({...data, error:""})}}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>

                    <div className="gorm-group mb-3">
                        <label  className="text-muted">Delivery Adderss:</label>
                        <textarea
                         onChange={handleAddress}
                         className="form-control"
                         value={data.address}
                         placeholder="Add your delivery address here"
                        ></textarea>
                    </div>

                    <DropIn 
                    options = {{
                        authorization: data.clientToken,
                        paypal:{
                            flow: "vault"
                        }
                    }} onInstance={instance=>(data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ):null
        
        }
        </div>
    )

    const showError = error =>(
        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSuccess = success =>(
        <div className="alert alert-success" style={{display:success ? '' : 'none'}}>
            Your Payment was successful
        </div>
    )

    const showLoading = loading=> loading && <h2>Loading...</h2>
    return (
    <div >
        <h2>Total : ₹{getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckOut()}
    </div>
    )
    
}

export default Checkout;
