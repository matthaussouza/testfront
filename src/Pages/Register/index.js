import React , { useState } from "react";
import { useHistory } from "react-router";
import { api } from "../../Services/api";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [companyName, setCompanyName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function submit(e){
    e.preventDefault();
    api.post('/perfis/', {
      nome: name,
      telefone : phone, 
      email: email, 
      senha: password, 
      nome_empresa: companyName
    })
    .then((resp) => 
      console.log(resp),
      history.push("/")
    )
    .catch((error) => console.log(error));
    }

  return <div className="form">
    <form onSubmit={submit}>
      <label>
        Nome
      </label>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <label>
        Telefone
      </label>
      <input type="text" onChange={(e) => setPhone(e.target.value)}/>
      <label>
        Email
      </label>
      <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      <label>
        Nome da Empresa
      </label>
      <input type="text" onChange={(e) => setCompanyName(e.target.value)}/>
      <label>
        Senha
      </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)}/>

      <button>Registrar</button>
    </form>
  </div>;
}
