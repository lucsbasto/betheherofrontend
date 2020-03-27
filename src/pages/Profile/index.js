import React, { useEffect, useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";
export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  useEffect(() => {
    getIncidents();
  }, [ongId]);
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

  console.log("incidents2", incidents);
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
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

            <button type="button">
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
