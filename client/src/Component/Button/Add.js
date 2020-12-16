import React, { useEffect, useState } from "react";
import {
  addBeneficiaire,
  searchBeneficiaire,
} from "../../Controller/API/Beneficiairies";

function useLogic(name, fetchBeneficiairies) {
  useEffect(() => {}, []);

  async function onClick() {
    await addBeneficiaire(name);
    await fetchBeneficiairies();
  }
  return { onClick };
}

export default function App({ name, fetchBeneficiairies }) {
  const { onClick } = useLogic(name, fetchBeneficiairies);

  return <button onClick={() => onClick()}>Add </button>;
}
