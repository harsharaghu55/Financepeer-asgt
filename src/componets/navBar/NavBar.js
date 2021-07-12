import React, {useState} from 'react'
import './NavBar.scss'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaCloudUploadAlt } from 'react-icons/fa'

function NavBar({ authToken,setUserData }) {
    const [data,setData] = useState('')

    function uploadClickHandler (){
        const formData = new FormData();
        formData.append('file', data.selectedFile);
        fetch("http://localhost:3200/fileUploder/upload",{
            headers:{
                authorization:`Barer ${authToken}`
            },
            method:"post",
            body:formData
        }).then(res=>res.json()).then(res=>setUserData(res.userData))
    }
    return (
        <div className="navBar">
            <div className="bandIconContainer">
                <h1>FINANCEPEER</h1>
            </div>  
            
            <div className="searchBar">
                <input 
                        className="inputBar" 
                        type="file" 
                        accept=".json"
                        onChange={(e)=>{
                            e.preventDefault()
                            setData({
                                selectedFile:e.target.files[0],
                            })
                        }}>
                    
                </input>
                <div  className= "uploadButton" onClick={uploadClickHandler}>
                        <FaCloudUploadAlt />
                </div>
            </div>
            <div className="navLinks">
                <button className="logoutButton">
                    <AiOutlineLogout fillColor="red" />
                    <p>LogOut</p>
                </button>
            </div>
        </div>
    )
}

export default NavBar
