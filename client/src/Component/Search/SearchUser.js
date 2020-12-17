import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./SearchUser.css";
import { searchBeneficiaire } from "../../Controller/API/Beneficiairies";
import getUsersInfo from "../../Controller/API/GetUsersInfo";
// make the first letter in name capitalize

function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// search beneficiary in db from name

function useLogic(setRegisteredBeneficiaries) {
  const [name, setName] = useState("");
  const [email] = useState(Cookies.get("email"));

  // set the name to search, if field is null get all beneficiary from db
  function setSearchName(e) {
    if (!e.target.value)
      getUsersInfo().then((resp) => {
        if (resp && resp.data)
          setRegisteredBeneficiaries(resp.data["hydra:member"]);
      });
    setName(capitalizeFirstLetter(e.target.value));
  }

  // search in db from name, if field is null get all beneficiary from db
  async function seachInDb(e) {
    e.preventDefault();
    if (name)
      searchBeneficiaire(name).then((resp) => {
        if (resp && resp.data) setRegisteredBeneficiaries(resp.data);
      });
    else
      getUsersInfo().then((resp) => {
        if (resp && resp.data)
          setRegisteredBeneficiaries(resp.data["hydra:member"]);
      });
  }

  useEffect(() => {}, []);

  return { name, setSearchName, seachInDb, email };
}

export default function App({ setRegisteredBeneficiaries }) {
  const { setSearchName, seachInDb, email, name } = useLogic(
    setRegisteredBeneficiaries
  );

  // if not authenticated, don't allows to search

  if (!email) return null;
  return (
    <form onSubmit={seachInDb} id="form_search">
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
