import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./SearchUserInDB.css";
import names from "../../names";
// make the first letter in name capitalize

function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// search beneficiary in db from name

function useLogic(setBeneficiaryNames) {
  const [name, setName] = useState("");
  const [email] = useState(Cookies.get("email"));

  // set the name to search, if field is null get all beneficiary from db
  function setSearchName(e) {
    if (!e.target.value)
      setBeneficiaryNames(
        [...Array(12).keys()].map((number) => ({
          name: names[Math.floor(Math.random() * names.length)],
        }))
      );
    setName(capitalizeFirstLetter(e.target.value));
  }

  // search in db from name, if field is null get all beneficiary from db
  async function search(e) {
    e.preventDefault();
    if (name) setBeneficiaryNames([{ name: name }]);
  }

  useEffect(() => {}, []);

  return { name, setSearchName, search, email };
}

export default function App({ setBeneficiaryNames }) {
  const { setSearchName, search, email, name } = useLogic(setBeneficiaryNames);

  // if not authenticated, don't allows to search

  if (!email) return null;
  return (
    <form onSubmit={search} className="form_search">
      <input
        type="text"
        onChange={setSearchName}
        placeholder="Nom"
        value={name}
      ></input>
      <input type="submit" value="search"></input>
    </form>
  );
}
