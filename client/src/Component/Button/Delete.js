import React, { useEffect, useState } from "react";
import {
  addBeneficiaire,
  searchBeneficiaire,
  deleteBeneficiaire,
} from "../../Controller/API/Beneficiairies";

function useLogic(name, fetchBeneficiairies) {
  useEffect(() => {}, []);

  async function onClick() {
    console.log(name);
    console.log(await deleteBeneficiaire(name));
    await fetchBeneficiairies();
  }
  return { onClick };
}

export default function App({ name, fetchBeneficiairies }) {
  const { onClick } = useLogic(name, fetchBeneficiairies);

  return <button onClick={() => onClick()}>X </button>;
}
