import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./App.css";
import "./Nav.css";

import Home from "./Pages/Home/Home";
import Authentication from "./Pages/Authentication/Authentication";

function useLogic() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(Cookies.get("email"));
  }, []);

  // when disconnect, remove from cookies email and token
  function onDisconnect() {
    Cookies.set("token", "");
    Cookies.set("email", "");
    axios.defaults.headers.common["Authorization"] = "";
  }

  // disconnect href
  function Disconnect() {
    return (
      <a href="/" onClick={onDisconnect}>
        Deconnection
      </a>
    );
  }

  return {
    email,
    Disconnect,
    setEmail,
  };
}
export default function App() {
  const { email, Disconnect, setEmail } = useLogic();

  return (
    <Router>
      <div>
        <nav id="navbar">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              {!email ? (
                <Link to="/Authentication">Authentication</Link>
              ) : (
                <Disconnect />
              )}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/Authentication">
            <Authentication setEmailParent={setEmail} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
