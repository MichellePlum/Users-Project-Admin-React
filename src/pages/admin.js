import { useState, useEffect } from 'react';
import FormField from "../components/formField";
import React from 'react';
import { useHistory } from "react-router-dom";
import '../cssFiles/style.css';
import sample from '../Sci Fi - 60718.mp4';

const Admin = (props) => {
    const history = useHistory();
    let usersArrData = JSON.parse(localStorage.getItem("users") || "[]");

    // for(let i=0; i < usersArrData.length; i++){
        
    // }


    //var + state
    const [users, setUser] = useState(null)

    //update the user once the page loaded
    useEffect(() => {
        let u = localStorage.getItem('users')
        setUser(JSON.parse(u))
    }, []);


    if (users == null) 
        return <h1>Please Login</h1>
    else 
        return (
        <div>
            <h1>Admin page</h1>
            <p>
                bla bla bla bla
            </p>
            <img src={users.profileImg} />
        </div>
    )
}
export default Admin;