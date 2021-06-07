import { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../cssFiles/style.css';
import imageBg from '../Images/background.jpg'

const Admin = (props) => {
    const history = useHistory();
    const [users, setUser] = useState(null);
    let usersToPrint = JSON.parse(localStorage.getItem("users"));
    const passAdmin = 'admin1234admin';
    const logAdmin = 'admin';
    
    useEffect(() => {
        let u = localStorage.getItem("users");
        setUser(JSON.parse(u)); 
    }, []);

    const changeInfo = (event) => {
        for(let i = 0; i < usersToPrint.length; i++){
            if(event === usersToPrint[i].id){
                let userName = usersToPrint[i].userName;
                let password = usersToPrint[i].password;
                let loginInfo = {userName, password, passAdmin, logAdmin};
                sessionStorage.setItem("activeUser", JSON.stringify(loginInfo));
                history.push("/profileData");
            }
        }  
    }

    const deleteUser = (event) => {
       for(let i = 0; i < usersToPrint.length; i++){
           if(event === usersToPrint[i].id){
           window.confirm("Are you sure you want to delete?");
           usersToPrint.splice(i, 1);
           localStorage.setItem("users", JSON.stringify(usersToPrint));
           }
       }
    history.push("/admin")
    }

    if (users == null) 
        return <h1> Please Login </h1>;
    else
        return (
        <div>
        <img className="backgroundAdmin" src={imageBg}/>

        <Navbar className="navBar" variant="dark">
            <Navbar.Brand href="#">ADMIN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
               <Nav.Link href="http://localhost:3000/">Register</Nav.Link>
               <Nav.Link href="http://localhost:3000/login">Log In</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>


        <h2 className="adminTitle">ADMIN PAGE</h2>
        <thead className="containerAdmin">
            <th className="dataBlock profileImgAdmin">Image {usersToPrint.map((user) => <img height="50px" width="50px" src={user.profileImg}/>)}</th>
            <th className="dataBlock">User Name {usersToPrint.map((user) => <span>{user.userName}<br/></span>)} </th>
            <th className="dataBlock">Password {usersToPrint.map((user) => <span>{user.password}<br/></span>)}</th>
            <th className="dataBlock">Surname {usersToPrint.map((user) => <span>{user.surname}<br/></span>)}</th>
            <th className="dataBlock">Last Name {usersToPrint.map((user) => <span>{user.lastName}<br/></span>)}</th>
            <th className="dataBlock">Birthdate {usersToPrint.map((user) => <span>{user.birthdate}<br/></span>)}</th>
            <th className="dataBlock">Email {usersToPrint.map((user) => <span>{user.email}<br/></span>)}</th> 
            <th className="dataBlock">City {usersToPrint.map((user) => <span>{user.city}<br/></span>)}</th>
            <th className="dataBlock">Street {usersToPrint.map((user) => <span>{user.street}<br/></span>)}</th>
            <th className="dataBlock">Delete User <th className="delButton">{usersToPrint.map((user) => <button onClick={() => deleteUser(user.id)}> remove </button>)}</th></th>
            <th className="dataBlock">Update User <th className="updateButton">{usersToPrint.map((user) => <button onClick={() => changeInfo(user.id)}> update </button>)}</th></th> 
        </thead>
        </div>
        )}
export default Admin;