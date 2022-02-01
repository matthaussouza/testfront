import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Profiles from "./Pages/Profiles";
import Register from "./Pages/Register";
import Perfil from "./Pages/Perfil";


export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/profiles'>
          <Profiles />
        </Route>
        <Route exact path='/myprofile'>
          <Perfil />
        </Route>
      </Switch>
    </div>
  );
}