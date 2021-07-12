import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react";

const initialState = {
    userName: '',
    password: '',
}

function LogInPage ({setUser, setAuthToken}){
    
    const [state,setState] = useState(initialState)
    
    function changeHandler(e){
        const {value,name} = e.target
        setState({
            ...state,
            [name]:value
        })
        
    }
    
    function authenticateUser(){
        fetch("http://localhost:3200/login/secure-login",{
                    headers:{
                        "Content-type":"application/json"
                    },
                    method:"post",
                    body:JSON.stringify({
                        ...state
                    })
                }).then(res=>res.json()).then(res=>{
                    if(res.status === 'ok'){
                        setUser(true)
                        setAuthToken(res.data)
                    }
                })
    }

    return (
        <div className="loginPageBackground">
            <div className="rigstrationButtonContainer">
                <p>New to Financepeer ?</p>
                <Link to="/register"><button className = "register"> Register </button></Link>
            </div>
            
            <div className="inputFieldsContainer">
                <h2>Login</h2>
                <div>
                    <label className="labelStyle">Username : </label>
                    <input 
                        className="userNameInputLoginPage"
                        name="userName"
                        placeholder="Enter userName"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label className="labelStyle">Password : </label>
                    <input 
                        className="passwordInputLoginPage userNameInputLoginPage" 
                        onChange={changeHandler} 
                        name="password"
                        placeholder="Enter Password"
                    />
                </div>
                <button className="loginButton" 
                    disabled={state.userName === '' || state.password === ''}
                    onClick={ authenticateUser }>login</button>
            </div>
        </div>
    )
}

export default LogInPage;