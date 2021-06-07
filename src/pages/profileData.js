import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react';
import '../cssFiles/style.css';
import FormField from "../components/formField";
import DatePicker from 'react-date-picker';
import sample from '../Images/Sci Fi - 60718.mp4';
import { Navbar, Nav } from 'react-bootstrap';


const ProfileData = (props) => {
    const history = useHistory();
    let userProfileData = JSON.parse(sessionStorage.getItem("activeUser"));
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let index;
    const passAdmin = 'admin1234admin';
    const logAdmin = 'admin';
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [surname, setsurname] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [birthdate, setbirthdate] = useState(new Date());
    const [city, setCity] = useState('');
    const [street, setstreet] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    for(let i = 0; i < users.length; i++){
       if(users[i].password === userProfileData.password && users[i].userName === userProfileData.userName)
       {
         index = i;
       }
    }

    //list of cities
    const [cities, setCities] = useState([])

    //udate the list of cities once the page load
    useEffect(() => {
        getCitiesFromJson();
    }, []);
    
    //get all the cities from the JSON file
    const getCitiesFromJson = async () => {
        let response = await fetch('./data/israel-cities.json');
        let data = await response.json(); //the values
        setCities(data);
    }

    //validate the register form
    const checkForm = () => {
        if (userName === '' || password === '' || confirmPassword === '' || profileImg === '' || city === '' || surname === '' || lastName === '' || email === '' || birthdate === '' || street === '' || phoneNumber === '') {
            alert('יש למלא את כל השדות')
            return false;
        }

        if(!(/^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{1,59}$/i.test(userName)))
        {
            alert ('הזן שם משתמש באנגלית בלבד ועד 60 תווים')
            return false;
        }

        if(!(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])([!@#$%^&*A-Za-z0-9]){6,11}$/.test(password)))
        {
            alert('סיסמה לא תקינה, אנא הזן בין 7 ל-12 תווים הכוללים אותיות גדולות וסימן מיוחד')
            return false;
        }

        if (!(password === confirmPassword))
        {
            alert(`הסיסמאות לא תואמות`)
            return false;
        }

        if(!(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[c]{1}[o]{1}[m]{1}$/i.test(email))) // i = case insensitive, {n} - only n letters/numbers, [range-range2] is the range of input available
        {
            alert('תצורת מייל לא נכונה, נסה שנית')
            return false;
        }
        
        if(!(/^[\u0590-\u05fe]+$/i.test(surname))){ //regex של עברית
            alert ('הזן שם בעברית בלבד')
            return false;
        }
        
        if(!(/^[\u0590-\u05fe]+$/i.test(lastName))){
            alert ('הזן שם משפחה בעברית בלבד')
            return false;
        }

        if(!(/^[\u0590-\u05fe]+( [\u0590-\u05fe ]+)*$/i.test(street))){ //דורש מילה ראשונה ואם רוצים אפשר להוסיף רווח ועוד אחת
            alert ('הזן רחוב בעברית')
            return false;
        }

        if(!(/[0-9]{10}/.test(phoneNumber)))
        {
            alert('הזן מספר פלאפון תקין')
            return false;
        }
        return true;
    }

    const uploadImage = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setProfileImg(e.target.result);
            }
            reader.readAsDataURL(input.files[0]); //convert to base64 string
        }
    }

    const updateInfo = (event) => {
        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
        if (checkForm()) { 
            let user = { userName, password, profileImg, surname, lastName, birthdate, email, city, street, phoneNumber } // יצירת אובייקט עם פרטי המשתמש
            users[index] = user;//דחיפה למערך משתמשים באיחסון המקומי
            localStorage.setItem("users", JSON.stringify(users)); //שמירה של מצב האיחסוןו המקומי
            alert(`עדכון עבר בהצלחה!`); 

            if(userProfileData.passAdmin === passAdmin && userProfileData.logAdmin === logAdmin){
                sessionStorage.clear();
                history.push("/admin");
            }
            else if (users[index].password === userProfileData.password && users[index].userName === userProfileData.userName){
                history.push("/profile");
            } 
        }  
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

            <div className="container containerProfileDate">
            <form onSubmit={updateInfo}>
                <div className="regData">
                <div className="firstBlock">
                <p>Your user name: {users[index].userName} </p>
                <FormField type="text" name="עדכון שם משתמש" action={setUserName}/>
                <p>Your password: {users[index].password} </p>
                <FormField type="password" name="עדכון סיסמה" action={setPassword} />
                <FormField type="password" name="אימות סיסמה" action={setConfirmPassword} />
                <FormField type="file" name="העלאת תמונה חדשה"  targetImg={profileImg} action={uploadImage}/>
                <p>Your first name: {users[index].surname} </p>
                <FormField type="text" name="עדכון שם פרטי" action={setsurname}/>
                <p>Your last name: {users[index].lastName} </p>
                <FormField type="text" name="עדכון שם משפחה" action={setlastName}/>
                </div>

                <div className="secondBlock">
                <p>Your email: {users[index].email} </p>
                <FormField type="email" name="עדכון דואר אלקטרוני" action={setemail}/>
                <p>Your birthdate: {users[index].birthdate} </p>
                <div className="field">
                <label>{"date"}</label>
                <DatePicker //מתוך הרחבה בשם react-date-picker
                value={birthdate}
                defaultValue={new Date()}
                onChange={setbirthdate}
                minDate={new Date(1901, 1, 1)}
                maxDate={new Date()} //תאריך נוכחי
                placeholderText={"Select a date"}/>
                </div>   
                <p>Your city: {users[index].city} </p>           
                <FormField type="list" listId="listOfCities" data={cities} name="עדכון עיר" action={setCity} />
                <p>Your street: {users[index].street} </p> 
                <FormField type="text" name="עדכון רחוב" action={setstreet}/>
                <p>Your phone number: {users[index].phoneNumber} </p> 
                <FormField type="number" name="עדכון מספר פלאפון" action={setphoneNumber}/>
                </div>
                </div>
                <div className="buttons">
                <button type="submit">עדכון פרטים</button>
                <button type="reset">ניקוי</button>
                </div>
            </form>
            </div>
        </div>
    )
} 
export default ProfileData;