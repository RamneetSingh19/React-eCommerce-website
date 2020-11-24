import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './CartHelpers';
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {
            color: "#ff9900"
        };
    }
    else {
        return {
            color: "#ffffff"
        };
    }
}
const Menu = ({ history }) => {
    //WE ARE DE STRUCTURING history FROM useRouter. OR SEND PROPS HERE AND GET PROPS.history below
    return (
        <div>
            <ul className=" nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, '/')}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>
                        Shop
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={isActive(history, '/cart')}>
                        Cart
                        <sup><small className="cart-badge">{itemTotal()}</small></sup>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/chats" style={isActive(history, '/chats')}>
                        chats
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role===0 &&(
                    <li className="nav-item">
                    <Link className="nav-link" 
                     style={isActive(history, '/user/dashboard')}
                      to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role===1 &&(
                    <li className="nav-item">
                    <Link className="nav-link"
                       to="/admin/dashboard"
                       style={isActive(history, '/admin/dashboard')}
                      >
                        Dashboard
                    </Link>
                </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role===2 &&(
                    <li className="nav-item">
                    <Link className="nav-link"
                       to="/worker/dashboard"
                       style={isActive(history, '/worker/dashboard')}
                      >
                        Dashboard
                    </Link>
                </li>
                )}
                {!isAuthenticated() && (
                    <>
                         <li>
                    <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>
                        signup
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>
                        signin
                    </Link>
                </li>
                    </>
                )}

                {isAuthenticated() && (
                    <div>
                         <li>
                    <span className="nav-link"
                        onClick={() => signout(() => {
                            history.push('/');
                        })}
                        style={{ cursor: 'pointer', color: '#ffffff' }}>
                        signout
                    </span>
                </li>
                    </div>
                )}
               
               
            </ul>
        </div>

    )
}

export default withRouter(Menu);

