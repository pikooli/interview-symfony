import React, { useEffect, useState } from "react";
import {
  addBeneficiaire,
  searchBeneficiaire,
} from "../../Controller/API/Beneficiairies";
import getUsersInfo from "../../Controller/API/GetUsersInfo";

function useLogic(setRegisteredBeneficiaries) {
  const [name, setName] = useState("");

  function setSearchName(e) {
    if (e.target.value) setName(e.target.value);
    else
      getUsersInfo().then((resp) => {
        if (resp && resp.data)
          setRegisteredBeneficiaries(resp.data["hydra:member"]);
      });
  }

  async function seachInDb(e) {
    e.preventDefault();
    if (name)
      searchBeneficiaire(name).then((resp) => {
        if (resp && resp.data) setRegisteredBeneficiaries(resp.data);
      });
  }

  useEffect(() => {}, []);

  return { name, setSearchName, seachInDb };
}

export default function App({ setRegisteredBeneficiaries }) {
  const { setSearchName, seachInDb } = useLogic(setRegisteredBeneficiaries);

  return (
    <form onSubmit={seachInDb}>
      <input type="text" onChange={setSearchName}></input>
      <input type="submit" value="search"></input>
    </form>
  );
}
