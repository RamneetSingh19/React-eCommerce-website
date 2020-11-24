import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home'
import Product from './core/Product'
import ChatroomPage from './core/ChatroomPage'
import Shop from './core/Shop'
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import WorkerRoute from './auth/WorkerRoute';
import AOWRoute from './auth/AOWRoutes';
import Dashboard from './user/userDashboard';
import Profile from './user/Profile';
import AdminDashboard from './user/AdminDashboard';
import ForgotPassword from './user/ForgotPassword';
import NewPassword from './user/NewPassword';
import WorkerDashboard from './user/WorkerDashboard';
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import UpdateUser from './admin/UpdateUser'
import Orders from './admin/Orders'
import ManageProducts from './admin/ManageProducts'
import ManageUsers from './admin/ManageUsers'
import Cart from './core/Cart'

const Routes = () => {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/signin"><Signin /></Route>
                <Route exact path="/signup"><Signup /></Route>
                <Route exact path="/forgotpassword"><ForgotPassword /></Route>
                <Route exact path="/reset/:token"><NewPassword /></Route>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/shop"><Shop /></Route>
                <PrivateRoute path = '/user/dashboard' exact component={Dashboard}/>
                <PrivateRoute path = '/profile/:userId' exact component={Profile}/>
                <PrivateRoute path = '/admin/products' exact component={ManageProducts}/>
                <AdminRoute path = '/admin/users' exact component={ManageUsers}/>
                <PrivateRoute path = '/chats' exact component={ChatroomPage}/>
                <AdminRoute path = '/admin/dashboard' exact component={AdminDashboard}/>
                <WorkerRoute path = '/worker/dashboard' exact component={WorkerDashboard}/>
                <AOWRoute path = '/create/category' exact component={AddCategory}/>
                <AOWRoute path = '/create/product' exact component={AddProduct}/>
                <AdminRoute path = '/product/:productId' exact component={Product}/>
                <WorkerRoute path = '/admin/orders' exact component={Orders}/>
                <AOWRoute path = '/admin/product/update/:productId' exact component={UpdateProduct}/>
                <AdminRoute path = '/admin/user/update/:userId' exact component={UpdateUser}/>
                <Route exact path="/cart"><Cart /></Route>
            </Switch>
        </BrowserRouter>
    )
} 

export default Routes;