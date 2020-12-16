import React, { useEffect, useState } from "react";
import { auth } from "../../Controller/API/Auth";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

function useLogic(setCookie) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {}, []);

  function submit() {
    if (email && password)
      auth(email, password).then((resp) => {
        if (!resp) setError("Bad email or password");
        else {
          setCookie(resp);
          Cookies.set("token", resp);
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

export default function App({ setCookie }) {
  const { email, setEmail, password, setPassword, submit, error } = useLogic(
    setCookie
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
