import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import { useEffect } from 'react';
import Card from './Card';
import { getCart, removeItem } from './CartHelpers';
import Checkout from './Checkout'

const Cart = ()=>{
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=>{
        setItems(getCart())
    }, [run])

    const showItems = (items)=>{
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((product, i)=>
                 (<Card key={i}
                 showAddToCartButton={false}
                 product={product} 
                 cartUpdate ={true}
                 showRemoveProductButton={true}
                 setRun={setRun}
                 run={run}
                 />))}
            </div>
        )
    }

    const noItemsMessage = ()=>{
        return(
            <>
            <h1>your cart have no items.</h1>
             <br/>
             <h3>
             <Link to ="/shop">Continue Shopping</Link>
             </h3>
             </>
        )
    }

   
    return (
        <Layout title="Shopping Cart"
         description="Manage your cart items. Add, remove, checkout or continue shopping" className="container-fluid">
        <div className="row">
            <div className="col-6">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-6">
                <h2 className="mb-4">Your cart summary</h2>
                <hr/>
                <Checkout products={items} setRun={setRun} run={run}/>
            </div>
        </div>

        </Layout>
    )
}

export default Cart