import React, { useState } from 'react';
import Layout from './Layout';
import { getProducts } from './ApiCore';
import { useEffect } from 'react';
import Card from './Card';
import Search from './Search'
const Home = () => {

    const [productsBySell, setProductBySell] = useState([]);
    const [productsByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductBySell = () => {
        getProducts("sold")
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProductBySell(data);
                }
            })
    }
    const loadProductByArrival = () => (
        getProducts('createdAt')
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProductByArrival(data);
                }
            })
    )

    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    }, [])

    return (
        <Layout title="Home Page" description="Node React E-com app" className="container-fluid">
              <Search />
                <h2 className="mb-4">New Arrivals</h2>

            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card  product={product} />
                    </div> 
                ))}
            </div>
                <h2 className="mb-4">Best Sellers</h2>

            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                    <Card  product={product} />
                </div> 
                ))}
            </div>

        </Layout>
    )
}

export default Home;