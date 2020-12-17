import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { auth } from "../../Controller/API/Auth";
import "./Authentication.css";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function useLogic(setEmailParent) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("token")) history.push("/");
  }, []);

  function submit() {
    if (!validateEmail(email)) setError("Mauvais email");
    else if (email && password)
      auth(email, password).then((resp) => {
        if (!resp) setError("Mauvais email ou mot de passe");
        else {
          setEmailParent(email);
          Cookies.set("token", resp);
          Cookies.set("email", email);
          history.push("/");
        }
      });
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    submit,
    error,
  };
}

export default function App({ setEmailParent }) {
  const { email, setEmail, password, setPassword, submit, error } = useLogic(
    setEmailParent
  );

  return (
    <div id="authentication">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h1>Reconnect</h1>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Connexion" />
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
}
