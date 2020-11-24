import React from 'react';
import Layout from '../core/Layout';
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';
import { useState } from 'react';
const Signin = () => {

    const {user} = isAuthenticated();

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToRefferer: false 
    })

    const { email, password, loading ,error, redirectToRefferer}=values;

    const handleChange = name=>event=>{
        setValues({...values, error: false, [name]: event.target.value})
    }

    
    const clickSubmit = (e)=>{
        e.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password}) //SAME AS email:email, password:password
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error, loading:false})
            }else{
                authenticate(data, ()=>{
                     setValues({
                    ...values,
                   redirectToRefferer: true
                })
                })
            }
        })
    }

    const signInForm = ()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")}  type="email" className="form-control" value= {email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control" value= {password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
        
    const showError = ()=>(
        
        <div className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
        </div>  
    )

    const showLoading = ()=>(
        loading && (
            <div className="alert alert-info">
                <h2>loading...</h2>
            </div>
        )
    )

    
    const redirectUser = ()=>{
        if(redirectToRefferer){
            if(user && user.role===1)
            {
                return <Redirect to='/admin/dashboard'/>
            } else if(user && user.role==2){
                return <Redirect to='/worker/dashboard'/> 
            }else{
                return <Redirect to='/user/dashboard'/> 
            }
        }
        if(isAuthenticated()){
            return  <Redirect to='/'/>
        }
    }

    return(
       <Layout   title="Signin Page" 
        description="Node React E-com app signin"
        className="container col-md-8 offset-md-2"
       >
           {showError()}
           {showLoading()}
           {signInForm()}
           {redirectUser()}
           <div className="container " style={{textAlign:"center", paddingTop:"30px"}}>
                <Link style = {{fontSize:"20px"}} to ={`/forgotpassword`}><i>Forgot Password </i> </Link>
            </div>  
          
           
       </Layout>
    )
}

export default Signin;