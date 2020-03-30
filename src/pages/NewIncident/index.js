import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [dark, setDark] = useState(false);

  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: localStorage.getItem("ongId")
        }
      });
      alert("Caso criado");
      history.push("/profile");
    } catch (error) {
      alert("erro: ", error);
    }
  }

  function changeTheme() {
    var body = document.getElementById("body");
    var link = document.getElementById("link");
    var content = document.getElementById("content");

    if (!dark) {
      body.classList.add("dark");
      link.classList.add("dark");
      content.classList.add("dark");
    } else {
      body.classList.remove("dark");
      link.classList.remove("dark");
      content.classList.remove("dark");
    }
    setDark(!dark);
    localStorage.setItem("dark", !dark);
  }

  return (
    <div id="body">
      <div className="new-incident-container">
        <div id="content" className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" onClick={changeTheme} />

            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para
              resolver isso.
            </p>

            <Link id="link" className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
            </Link>
          </section>

          <form onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Título do caso"
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição"
            />
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Valor em reais"
            />

            <button className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
