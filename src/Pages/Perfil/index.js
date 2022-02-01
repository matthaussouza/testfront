import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../Services/api";
import "./perfil.css";

export default function Profiles() {
    const [perfilAtual, setPerfilAtual] = useState();
  
    useEffect(() => {
      api.get('/perfil/')
      .then((resp) => setPerfilAtual(resp.data))
      .catch((error) => console.error(error));
    }, []);
  
    return (
      <>
        <h1>Olá {perfilAtual?.nome}</h1>
          <div className="body">
            <div className="dataUser">
                <hr/>
                <h2>Dados do Usuário: </h2>
                <p>Nome do Usuário: {perfilAtual?.nome}</p>
                <p>Email: {perfilAtual?.email}</p>
                <p>Telefone: {perfilAtual?.telefone}</p>
                <p>Nome da empresa: {perfilAtual?.nome_empresa}</p>
                <hr/>
            </div>

            <div className="contacts">
              <h2>Contatos</h2>
              <ul className="contact">
                {perfilAtual?.contatos.map(contact => (
                  <li className="card_contact" key={contact.id}> 
                    <h3>{contact.nome}</h3>
                    <span>{contact.email}</span>
                  </li>
                ))}
              </ul>
              <Link to="/profiles" className="linkp">Convidar Perfis</Link>
            </div>
          </div>
      </>
    );
  }