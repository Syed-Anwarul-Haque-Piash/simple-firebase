import React, { useState } from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';


const Login = () => {
    
    const auth=getAuth(app);
    const provider=new GoogleAuthProvider();
    const [user,setUser]=useState({})
    
    const googleLogin=()=>{
        // console.log("Google")
        signInWithPopup(auth,provider)
        .then(result=>{
            const loggedUser=result.user
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    const googleLogout=()=>[
        signOut(auth)
        .then(result=>{
            console.log(result)
            setUser(null)
        })
        .catch(error=>{
            console.log(error.message);
        })
    ]
    return (
        <div>
           
           {user?
           <button onClick={googleLogout}>LogOut</button>:
           <button onClick={googleLogin}>Login</button>
           }
           
           <div>
            {user &&
            <div>
            <h2>User: {user.displayName}</h2>
            <h5>Email :{user.email}</h5>
            <img src={user.photoURL} alt="" />
            </div>}
           </div>
        </div>
    );
};

export default Login;