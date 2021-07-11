import React,{ useState, useEffect } from "react"
import NavBar from "../../componets/navBar/NavBar";


function Home({authToken}){
    const [data,setData] = useState('');

    useEffect(()=>{
        
    })

    return(
        <div>
            <NavBar setData={setData}/>
            <div>
                <button onClick={()=>{
                    fetch("http://localhost:3200/posts",{headers:{
            authorization:`Barer ${authToken}`
        }})
                }}>append</button>
            </div>
        </div>
    )
}

export default Home