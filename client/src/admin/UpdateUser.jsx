import React, { useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import {getUser, getCategories, updateUser} from './ApiAdmin';


const UpdateUser = ({match})=>{

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name: '',
        about: '',
        role: '',
        loading: false,
        redirectToProfile: false,
        error: '',
        formData: '',
        createdUser: '',
    });

    const {
        name,
       about, 
       redirectToProfile,
       role, 
       error,
       loading,
       formData, 
       createdUser
    } = values;

    const init = (userId) =>{
        getUser(userId).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                //POPULATE THE STATE
                setValues({
                    ...values,
                    name: data.name,
                    about: data.about,
                    role: data.role,
                    formData: new FormData()
                });

                //LOAD CATEGORIES
                // initCategories()
            }
        })
    }

    //LOAD CATEGORIES AND LOAD FORM DATA
    // const initCategories = ()=>{
    //     getCategories().then(data=>{
    //         if(data.error){
    //             setValues({...values, error: data.error})
    //         }else{
    //             setValues({
    //                 categories: data,
    //                 formData : new FormData()
    //             })
    //         }
    //     })
    // }

    useEffect(()=>{
      init(match.params.userId);
    }, [])

    const handleChange = name => event =>{
        const value =  event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:"", loading: true});

        updateUser(match.params.userId, token, formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values,
                    name: "",
                    about: "",
                    role:"",
                    loading:false,
                    redirectToProfile: true,
                    createdUser: data.name
                })
            }
        })
    }

    const newPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" className="form-control" value={about} />
            </div>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <select onChange={handleChange('role')}
                 className="form-control"
                 >
                     <option >Please Select</option>
                        <option  value="0">user</option>
                        <option  value="1">Admin</option>
                        <option  value="2">worker</option>
                     
                </select>
            </div>

            <button className="btn btn-outline-primary">Update User</button>
        </form>
    )

    const showError = ()=>(
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )
    const showSuccess = ()=>(
        <div className="alert alert-info" style={{display: createdUser ? '': 'none'}}>
            <h2>{`${createdUser} is updated!`}</h2>
        </div>
    )
    const showLoading = ()=>(
        loading && (
           <div className="alert alert-success"><h2>Loading ...</h2></div>
            )
    )

    const redirectUser = ()=>{
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/"/>
            }
        }
    }

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
}

export default UpdateUser;