import React from 'react';
import Layout from '../core/Layout';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { signin, authenticate, isAuthenticated, resetPass } from '../auth';
import { useState } from 'react';
// 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


const ForgotPassword = () => {
    const [success, setSuccess] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory()
    const submitForm = (e)=>{
     e.preventDefault()
     resetPass(email)
     .then(data=>{
         if(data.error){
             console.log(data.error)
         }else{
              setSuccess(data.message)
            //  history.push('/signin')
            // <Redirect to='/signin'/>
         }
     }).catch(err=>{
         console.log(err)
     })
    } 
    const handleChange = name=>event=>{
        setEmail(event.target.value)
    }
    const showSuccess = ()=>(
        
        <div className="alert alert-success" style={{display: success ? '':'none'}}>
            {success}
        </div>  
    )
    return (
        <Layout title="Forgot Your Password?"
            description="Enter your email below"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            <form className="form-group" onSubmit={submitForm}>
                <input className="form-control" onChange={handleChange("email")} type="email" name="email" value={email} placeholder="Enter your email address..." />
                <input className="btn btn-success btn-md btn-block" type="submit" value="Submit" />
            </form>

        </Layout>
    )
}

export default ForgotPassword