import {API} from '../config'


export const signup = (user)=>{
    return fetch(`${API}/signup`, {
          method: "POST",
          headers:{
              Accept :'application/json',
              "Content-Type": 'application/json' 
          },
          body: JSON.stringify(user)
      })
      .then(res=>{
          console.log(res);
          return res.json();
      })
      .catch(err=>{
          console.log(err); 
      })
  }
export const signin = (user)=>{
    return fetch(`${API}/signin`, {
          method: "POST",
          headers:{
              Accept :'application/json',
              "Content-Type": 'application/json' 
          },
          body: JSON.stringify(user)
      })
      .then(res=>{
          console.log(res);
          return res.json();
      })
      .catch(err=>{
          console.log(err); 
      })
  }
export const signinGoogle = ()=>{
    return fetch(` http://localhost:8000/apiauth/google`, {
          method: "GET",
      })
      .then(res=>{
          console.log(res);
          return res.json();
      })
      .catch(err=>{
          console.log(err); 
      })
  }

  
  export const authenticate =(data, next)=>{
      if(typeof window !== "undefined"){
          localStorage.setItem("jwt", JSON.stringify(data));
          next();
      }
  }

  export const signout = next=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method:"GET"
        })
        .then(response =>{
            console.log('signout', response);
        })
        .catch(err=>{
            console.log(err);
        })
    }

  }

  export const isAuthenticated = ()=>{
      if(typeof window == "undefined"){
          return false
      }

      if(localStorage.getItem('jwt'))
      {
          return JSON.parse(localStorage.getItem('jwt'))
      }
      else{
          return false;
      }
  }

  export const resetPass = (email)=>{
    return fetch(`${API}/resetpassword`, {
          method: "POST",
          headers:{
              "Content-Type": 'application/json' 
          },
          body: JSON.stringify({email})
      })
      .then(res=>{
          console.log(res);
          return res.json();
      })
      .catch(err=>{
          console.log(err); 
      })
  }
  export const newPass = (password, token)=>{
    return fetch(`${API}/newpassword`, {
          method: "POST",
          headers:{
              "Content-Type": 'application/json' 
          },
          body: JSON.stringify({password, token})
      })
      .then(res=>{
          console.log(res);
          return res.json();
      })
      .catch(err=>{
          console.log(err); 
      })
  }