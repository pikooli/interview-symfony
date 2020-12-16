import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./App.css";
import Home from "./Pages/Home/Home";
import Authentication from "./Pages/Authentication/Authentication";

function useLogic() {
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    setCookie(Cookies.get("token"));
  });

  function onDisconnect() {
    Cookies.set("token", "");
    axios.defaults.headers.common["Authorization"] = "";
  }

  function Disconnect() {
    return (
      <a href="/" onClick={onDisconnect}>
        {" "}
        Disconnect
      </a>
    );
  }
  return {
    cookie,
    Disconnect,
    setCookie,
  };
}
export default function App() {
  const { cookie, Disconnect, setCookie } = useLogic();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {!cookie ? (
                <Link to="/Authentication">Authentication</Link>
              ) : (
                <Disconnect />
              )}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/Authentication">
            <Authentication setCookie={setCookie} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
