import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {getUsers, deleteUser} from './ApiAdmin'
import { useEffect } from 'react';
// deleteProduct
const ManageUsers = ()=>{

    const [users, setUsers] = useState([]);
    const {user, token} = isAuthenticated();
    const [error, setError] = useState('');
    const loadUsers = () =>{
        getUsers().then(data =>{
            if(data.error){
                console.log(data.error)
                
            }else{
                setUsers(data)
            }
        })
    }

   

    const destroy = removedUserId =>{
        deleteUser(removedUserId, user._id ,token).then(data =>{
            if(data.error){
                console.log(data.error)
                setError(data.error);
            } else{
                loadUsers(); //THE PRODUCT DELETED WILL NOT BE IN THE STATE NOW
            }
        })
    }
     const showError = ()=>(
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    useEffect(()=>{
        loadUsers()
    }, [])
    return (
        <Layout title="Manage Users" description="Manage all your users from here" className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                </div>
            </div>
              <div className="row">
                  <div className="col-12">
                      <h2>Total {users.length} users</h2>
                      <hr/>
                      <ul className="list-group">
                          {users.map((u,i)=>(
                              <li key={i}
                               className="list-group-item d-flex justify-content-between align-items-center">
                                   <strong>{u.name}</strong>

                                   <Link to ={`/admin/user/update/${u._id}`}>
                                       <span className="badge badge-warning badge-pill">
                                           Update
                                       </span>
                                   </Link>

                                   <span onClick={()=> destroy(u._id)}
                                    className="badge badge-danger badge-pill"
                                    style={{cursor: "pointer"}}
                                    >
                                           Delete
                                   </span>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
              
        </Layout>
    )
}

export default ManageUsers;