import React from 'react';
import Layout from '../core/Layout';
import { Link, Redirect, useHistory,useParams } from 'react-router-dom';
import { signin, authenticate, isAuthenticated, newPass } from '../auth';
import { useState } from 'react';
// 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


const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const history = useHistory()
    const {token} = useParams()
    console.log(token)
    const submitForm = (e)=>{
     e.preventDefault()
     newPass(password, token)
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
        setPassword(event.target.value)
    }
    const showSuccess = ()=>(
        
        <div className="alert alert-success" style={{display: success ? '':'none'}}>
            {success}
        </div>  
    )
    return (
        <Layout title="Set your new password"
            description="Enter your new password below"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            <form className="form-group" onSubmit={submitForm}>
                <input className="form-control" onChange={handleChange("password")} type="password" name="password" value={password} placeholder="Enter your new Password" />
                <input className="btn btn-success btn-md btn-block" type="submit" value="Reset Password" />
            </form>

        </Layout>
    )
}

export default NewPassword