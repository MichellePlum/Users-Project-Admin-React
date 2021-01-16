import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './pages/register';
import Admin from './pages/admin';
import Profile from './pages/profile';
import Login from './pages/login';
import ProfileData from './pages/profileData';



const App = () => {
return(
<BrowserRouter>
  <Switch>
    <Route exact path ="/" component={Register}></Route>
    <Route exact path ="/login" component={Login}></Route>
    <Route exact path ="/profile" component={Profile}></Route>
    <Route exact path ="/admin" component={Admin}></Route>
    <Route exact path ="/profileData" component={ProfileData}></Route>
  </Switch>
</BrowserRouter>
)}
export default App;