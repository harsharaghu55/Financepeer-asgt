import React,{ useState, useEffect } from "react"
import NavBar from "../../componets/navBar/NavBar";
import "./home_page.scss"

function Home({authToken}){
    const [userData,setData] = useState(null);

    useEffect(()=>{
        console.log(authToken)
        fetch("http://localhost:3200/posts/posts",{headers:{
            authorization:`Barer ${authToken}`
        }}).then(res=>res.json()).then(res=>setData(res.userData))
    },[authToken])
    console.log(userData)
    return(
        <div>
            <NavBar setUserData={setData} authToken={authToken}/>
            <div className="dataContainer">
                {userData && userData.map(data=>
                    <div key={data.id} className="card">
                        <div className="userId">
                            <h4>user id</h4>
                            <div>:</div>
                            <p> {data.userId} </p>
                        </div>
                        <div className="title">
                            <h4>title</h4>
                            <div>:</div>
                            <p> {data.title}</p>
                        </div>
                        <div className="body">
                            <h4>body</h4>
                            <div>:</div>
                            <p> {data.body} </p>
                        </div>  
                    </div>)}
            </div>
        </div>
    )
}

export default Home