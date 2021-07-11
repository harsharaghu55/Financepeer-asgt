import { useState } from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import LoginPage from "./pages/loginPage/LoginPage.js"
import RegistrationPage from "./pages/registerPage/RegistrationPage.js"
import './App.css';
import Home from "./pages/home/home_page.js"

function App() {
  const[user,setUser] = useState(false)
  const [authToken,setAuthToken] = useState('')

  return (
      !user ? 
        (<div className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <LoginPage setUser={setUser} setAuthToken={setAuthToken}/>
              </Route>
              <Route path="/register">
                <RegistrationPage/>
              </Route>
            </Switch>
          </Router>
        </div> ):(
          <div className="App">       
            <Home authToken={authToken}/>
        </div>
      )
  );
}

export default App;
// <Route path = "/RegistrationPage"><RegistrationPage/></Route>
// https://dribbble.com/shots/5978930-Home-for-GroceryStore-Web-App/attachments/5978930-Home-for-GroceryStore-Web-App?mode=media