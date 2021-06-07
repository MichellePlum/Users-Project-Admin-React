import React from 'react';
import { useHistory } from "react-router-dom";
import '../cssFiles/style.css';
import sample from '../Images/Sci Fi - 60718.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';


const Profile = (props) => {
    const history = useHistory();
    let userProfileData = JSON.parse(sessionStorage.getItem("activeUser"));
    let usersArrData = JSON.parse(localStorage.getItem("users") || "[]");
    let index;

    if(userProfileData){
    for(let i=0; i < usersArrData.length; i++){
       if(usersArrData[i].password === userProfileData.password && usersArrData[i].userName === userProfileData.userName)
       {
         index = i;
       }
    }

    let surname = usersArrData[index].surname;
    let lastName = usersArrData[index].lastName;
    let email = usersArrData[index].email;
    let city = usersArrData[index].city;
    let street = usersArrData[index].street;
    let birthdate = usersArrData[index].birthdate;
    let phone = usersArrData[index].phoneNumber;

    function handleClick() {
        sessionStorage.clear();
        history.push("/");
    }

    function openGame() {
        alert("Open React Native Project!");
    }

    function changeInfo() {
        history.push("/profileData");
    }

    return (
    <div>
        <video className="videoTag" autoPlay loop muted>
            <source src={sample}/>
        </video>

        <Navbar className="navBar" variant="dark">
            <Navbar.Brand href="#">Profile</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="http://localhost:3000/">Register</Nav.Link>
                <Nav.Link href="http://localhost:3000/login">Log In</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar> 

        <div className="container containerProfile">
            <form>
            <img className="profileImg" src={usersArrData[index].profileImg}/>
            <div className="textBlock">
                <h2 className="firstAndSecName"> 
                    { surname + " " + lastName} 
                </h2>
                <p> { email } <FontAwesomeIcon icon={faEnvelope} /> </p>
                <p> { city + ", " + street} <FontAwesomeIcon icon={faBuilding} /> </p>
                <p> { birthdate } <FontAwesomeIcon icon={faBirthdayCake} /></p>
                <p> { phone } <FontAwesomeIcon icon={faMobileAlt} /></p>
                
                <div className="buttonsLogin">
                   <button onClick={handleClick}>התנתק</button>
                   <button onClick={changeInfo}>עדכון פרטים</button>
                   <button onClick={openGame}>למשחק</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    )}}
    export default Profile;