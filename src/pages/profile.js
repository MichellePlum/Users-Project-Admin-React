import React from 'react';
import { useHistory } from "react-router-dom";
import '../cssFiles/style.css';
import sample from '../Sci Fi - 60718.mp4';

const Profile = (props) => {
    const history = useHistory();
    let userProfileData = JSON.parse(sessionStorage.getItem("activeUser"))
    let usersArrData = JSON.parse(localStorage.getItem("users") || "[]");
    let index;

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
        <div className="container containerProfile">
            <form>
            <img className="profileImg" src={usersArrData[index].profileImg}/>
            <div className="textBlock">
                <h2 className="firstAndSecName"> 
                    { surname + " " + lastName} 
                </h2>
                <p> { email } </p>
                <p> { city + ", " + street } </p>
                <p> { birthdate } </p>
                <p> { phone } </p>
                
                <div className="buttonsLogin">
                   <button onClick={handleClick}>התנתק</button>
                   <button onClick={changeInfo}>עדכון פרטים</button>
                   <button onClick={openGame}>למשחק</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    )} 
    export default Profile;