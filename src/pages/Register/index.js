import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function Register() {
  const [dark, setDark] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [UF, setUf] = useState("");
  const history = useHistory();
  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      UF
    };
    try {
      const response = await api.post("/ongs", data);
      alert("Seu id é: ", response.data.id);
      history.push("/");
    } catch (e) {
      console.log("erro", e);
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
      <div className="register-container">
        <div id="content" className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" onClick={changeTheme} />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>

            <Link id="link" className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              Já tenho cadastro
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome da ONG"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <div className="input-group">
              <input
                placeholder="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <input
                placeholder="UF"
                style={{ width: 80 }}
                value={UF}
                onChange={e => setUf(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
