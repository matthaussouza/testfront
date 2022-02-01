import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import { api } from "../../Services/api";
import { login } from "../../Services/utils"

export default function Login() {
  const[username, setUsername] =  useState();
  const[password, setPassword] =  useState();
  const history = useHistory();

  function submit(e){
    e.preventDefault();
    api.post('/login/', { username, password })
    .then((resp) => 
    login(resp.data.token),
    history.push('/profiles')
    )
    .catch((error) => console.log(error));
  }

  return( <div className="form">
    <form>
      <label>
        Usuário
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Senha
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button type="submit" onClick={submit}> Login </button>
    </form>
  </div>);
}