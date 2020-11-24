import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const WorkerDashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const workerLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Worker links</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/create/category">Create Catrgories</Link> 
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/create/product">Create Product</Link> 
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/orders">View Orders</Link> 
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/products">Manage Products</Link> 
                        </li>
                        {/* <li className="list-group-item">
                            <Link className="nav-link" to="/admin/users">Manage Users</Link> a
                        </li> */}
                    </ul>
                
            </div>
        )
    }

    const workerInfo = () => {
        return (
            <div className="card mg-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : role==2 ? "worker": "Registered User"}</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`have a great day ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {workerLinks()}
                </div>
                <div className="col-9">
                    {workerInfo()}
                </div>
            </div>

        </Layout>
    )
}

export default WorkerDashboard
