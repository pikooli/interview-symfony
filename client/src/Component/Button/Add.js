import React, { useEffect } from "react";
import { addBeneficiaire } from "../../Controller/API/Beneficiairies";

// add beneficiary to db

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
