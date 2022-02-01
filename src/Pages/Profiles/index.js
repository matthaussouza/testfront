import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { api } from "../../Services/api";
import "./Profiles.css";

export default function Profiles() {
  const [perfis, setPerfis] = useState();
  const [perfilAtual, setPerfilAtual] = useState();
  const [mensagem, setMensagem] = useState();
  const [perfilConvidado, setPerfilConvidado] = useState();
  const [invites, setInvites] = useState();


  useEffect(() => {
    api.get('/perfis/')
    .then(resp => setPerfis(resp.data))
    .catch((error) => console.error(error));

    api.get('/perfil/')
    .then((resp) => setPerfilAtual(resp.data))
    .catch((error) => console.error(error));

    api.get('/convites/')
    .then((resp) => {
      const invitesInfo = resp.data.map((invite) => {
        const profile = perfis?.find((profile) => invite.solicitante === profile.id);
        return { ... profile, inviteId: invite.id };
      });
      setInvites(invitesInfo);
    })
    .catch((error) => console.error(error));
  }, [perfis]);

  function convidar(id){
    api.post(`/convites/convidar/${id}`)
    .then((resp) => setMensagem(resp.data.mensagem))
    .catch((error) => console.error(error));

    setPerfilConvidado(id);
  }

  function accept(id){
    api.post(`/convites/aceitar/${id}`)
    .then((resp) => console.log(resp))
    .catch((error) => console.error(error));
  }

  return (
    <>
      <Link to="/myprofile" className="link">Olá {perfilAtual?.nome}</Link>
        <div className="profiles">
          <div className="invite">
          <h2>Perfis disponiveis:</h2>
            { perfis?.map((perfil) => 
              perfil.id === perfilAtual?.id ? null : ( 
                <div key={perfil.id}>
                  <div className="card">
                  <h3>{ perfil.nome }</h3>
                  <span>{ perfil.email }</span>
                  { perfil.pode_convidar ? <button className="icon" title="Convidar" onClick={() => convidar(perfil.id)}>Convidar</button> : null }
                  </div>
                  {perfil.id === perfilConvidado ? <span className="message">{mensagem}</span> : null}
                </div>
              ),
            )}
          </div>

          <div className="invitations">
            <h2>Convites</h2>
            {
              invites?.map(invite => (
                <div className="card-default card" key={invite.inviteId}>
                  <h3>{invite.nome}</h3>
                  <button onClick={() => accept(invite.inviteId)}>Aceitar</button>
                </div>
              ))
            }
          </div>
        </div>
    </>
  );
}