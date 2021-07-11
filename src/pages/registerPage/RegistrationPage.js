import React, {useState} from "react"
import "./Registerationpage.scss"

function RegistrationPage (){
    const initialState = {
        fullName: '',
        email: '',
        password: '',
    }
    const [state,setState] = useState(initialState)

    function changeHandler(e){
        e.preventDefault()
        const { name,value } = e.target
        setState({
            ...state,
            [name]:value
        })
    }
    console.log(state)
    function submmitButtonClickHandler(){
        fetch('http://localhost:3200/router/user-register',{
            headers:{
                "Content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify({
                ...state
            })
        })
    }
    return(
        <div className="registerPageBackground">
            <div className="inputFieldsContainer">
                <h2>Register</h2>
                <div>
                    <label className="labelStyle">Full Name : </label>
                    <input 
                        className="userNameInputregisterPage"
                        name="fullName"
                        placeholder="Enter userName"
                        onChange={changeHandler}
                        value={state.fullName}
                        type="text"
                    />
                </div>
                <div>
                    <label className="labelStyle">Email : </label>
                    <input 
                        className="userNameInputregisterPage"
                        name="email"
                        placeholder="Enter userName"
                        onChange={changeHandler}
                        value={state.email}
                        type="text"
                    />
                </div>
                <div>
                    <label className="labelStyle">Password : </label>
                    <input 
                        className="passwordInputregisterPage userNameInputregisterPage" 
                        onChange={changeHandler} 
                        name="password"
                        placeholder="Enter Password"
                        value={state.password}
                        type="password"
                    />
                </div>
                <button className="registerButton" 
                    disabled={state.fullName === '' || state.password === '' || state.fullName === ''}
                    onClick={submmitButtonClickHandler}>Register</button>
            </div>
        </div>
    )
}

export default RegistrationPage