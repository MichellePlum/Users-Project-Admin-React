import FormField from "../components/formField";
import {useState} from 'react';
import { useHistory } from "react-router-dom";
import sample from '../Images/Sci Fi - 60718.mp4';
import '../cssFiles/style.css';
import { Navbar, Nav } from 'react-bootstrap';

const Login = (props) =>  {
    const history = useHistory();
    let users = JSON.parse(localStorage.getItem("users") || "[]"); //מערך ג'ייסון ליוזרים
    console.log(users);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const passAdmin = 'admin1234admin';
    const logAdmin = 'admin';

    const checkLogin = () => 
    {
        if(userName === '' || password === ''){
            alert('אנא מלא את כל השדות')
            return false;
        }

        if(password === passAdmin && userName === logAdmin){
            return true;
        }

        else if(!(/^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{1,60}$/i.test(userName)))
        {
            alert ('הזן שם משתמש באנגלית בלבד ועד 60 תווים')
            return false;
        }

        else if(!(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])([!@#$%^&*A-Za-z0-9]){6,11}$/.test(password)))
        {
            alert('סיסמה לא תקינה, אנא הזן בין 7 ל-12 תווים הכוללים אותיות גדולות וסימן מיוחד')
            return false;
        } 
        
        return true;
    }

    const loginSys = (event) => {
        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
        if (checkLogin()) {
            let userExists = false; //בוליאן לסימון האם קיים כבר במערכת
            let passExists = false; //בוליאן לסימון האם קיים כבר במערכת
            let loginInfo = {userName, password}; //אובייקט שם משתמש וסיסמה

            for (let i=0; i < users.length; i++)
            {
                if (users[i].userName === loginInfo.userName)
                userExists = true;  
            }

            for (let i=0; i < users.length; i++)
            {
                if (users[i].password === loginInfo.password)
                passExists = true;  
            }

            if (userExists && passExists)
            {
                sessionStorage.setItem("activeUser", JSON.stringify(loginInfo)); //שמירת שם משתמש וסיסמת המשתמש שהתחבר
                alert('התחברת בהצלחה');
                history.push("/profile");
            }
            else if(loginInfo.password === passAdmin && loginInfo.userName === logAdmin){
                alert('התחברת בהצלחה');
                history.push("/admin");
            }
            else
            {
                alert('שם משתמש או סיסמה לא תקינים');
            }
        }
    }

    return (
    <div>
        <video className="videoTag" autoPlay loop muted>
                 <source src={sample}/>
        </video>
        <Navbar className="navBar" variant="dark">
            <Navbar.Brand href="#">Login</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="http://localhost:3000/">Register</Nav.Link>
                <Nav.Link href="http://localhost:3000/login">Log In</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar> 
        
        <div className="container containerLogin">
            <form onSubmit={loginSys}>
                <FormField type="text" name="שם משתמש" action={setUserName} />
                <FormField type="password" name="סיסמה" action={setPassword} />
            <div className="buttonsLogin">
            <button type="submit">הרשמה</button>
            <button type="reset">ניקוי</button>
            </div>
            </form>
        </div>
    </div>
    )}
export default Login;