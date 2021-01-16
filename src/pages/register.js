import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react';
import '../cssFiles/style.css';
import FormField from "../components/formField";
import DatePicker from 'react-date-picker';
import sample from '../yt1s.com - free video cyber security background_1080p.mp4';

const Register = (props) => {
const history = useHistory();
let users = JSON.parse(localStorage.getItem("users") || "[]"); //מערך ג'ייסון ליוזרים
const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [profileImg, setProfileImg] = useState('')
const [surname, setsurname] = useState('')
const [lastName, setlastName] = useState('')
const [email, setemail] = useState('')
const [birthdate, setbirthdate] = useState(new Date())
const [city, setCity] = useState('')
const [street, setstreet] = useState('')
const [phoneNumber, setphoneNumber] = useState('')

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
        //#region == vs === הסבר
        /*
        == -> בודק את הערך
        === -> בודק את הערך ואת הטיפוס

        5 == '5' true
        5 === '5' false
        */
       //#endregion

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

    //signup function -> לאחר הקלקה על כפתור ההרשמה
    const signup = (event) => {
        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
         //#region deconstructure example for below
            /* same thing as:
            let user = {
                userName: userName,
                password: password,
                city: city
            }
            */ 
           //#endregion 
        if (checkForm()) {
            let user = { userName, password, profileImg, surname, lastName, birthdate, email, city, street, phoneNumber } // יצירת אובייקט עם פרטי המשתמש
            let exists = false; //בוליאן לסימון האם המייל קיים כבר במערכת
            
            for (let i=0; i < users.length; i++)
            {
                if (users[i].email === user.email)
                exists = true;  
            }
        
            if(exists === false)
            {
            users.push(user);//דחיפה למערך משתמשים באיחסון המקומי
            localStorage.setItem("users", JSON.stringify(users)); //שמירה של מצב האיחסוןו המקומי
            alert(`נרשמת בהצלחה!`)
            history.push("/login")
            //return <Redirect to="/login" />
            }
            else
            {
                alert('המייל הזה כבר קיים במערכת');
            }
        }
    }

    /*
        let --> משתנה מקומי שנוצר רק לאחר השמה של ערך
        var --> משתנה גלובלי
        const --> קבוע
    */

    return (
        <div>
            <video className="videoTag" autoPlay loop muted>
                 <source src={sample}/>
            </video>
            <div className="container containerReg">
            <form onSubmit={signup}>
                <div className="regData">
                <div className="firstBlock">
                <FormField type="text" name="שם משתמש" action={setUserName} />
                <FormField type="password" name="סיסמה" action={setPassword} />
                <FormField type="password" name="אימות סיסמה" action={setConfirmPassword} />
                <FormField type="file" name="העלאת תמונה שלך"  targetImg={profileImg} action={uploadImage}/>
                <FormField type="text" name="שם פרטי" action={setsurname}/>
                <FormField type="text" name="שם משפחה" action={setlastName}/>
                </div>

                <div className="secondBlock">
                <FormField type="email" name="דואר אלקטרוני" action={setemail}/>
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
                <FormField type="list" listId="listOfCities" data={cities} name="עיר" action={setCity} />
                <FormField type="text" name="רחוב" action={setstreet}/>
                <FormField type="number" name="מספר פלאפון" action={setphoneNumber}/>
                </div>
                </div>
                <div className="buttons">
                <button type="submit">הרשמה</button>
                <button type="reset">ניקוי</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Register;