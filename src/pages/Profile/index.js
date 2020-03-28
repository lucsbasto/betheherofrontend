import React, { useEffect, useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  useEffect(() => {
    getIncidents();
  }, [ongId]);
  //atualizando toda vez que o array de incidentes for atualizado
  useEffect(() => {
    getIncidents();
  }, [incidents]);

  async function getIncidents() {
    try {
      const { data } = await api.get("/ong/incidents", {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(data.incidents);
    } catch (error) {
      console.log("ee", error);
    }
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      //realizando a remoção do incident na mão
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower onClick={handleLogout} size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso: </strong>
            <p>{incident.title}</p>

            <strong>Descrição: </strong>
            <p>{incident.description}</p>

            <strong>Valor: </strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
