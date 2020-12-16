import axios from "axios";
import * as url from "./Url";

export async function addBeneficiaire(name) {
  if (name) return await axios.post(url.beneficiariesEndpoint, { name: name });
}
export async function deleteBeneficiaire(name) {
  if (name)
    return await axios.delete(url.deleteUserEndpoint, {
      params: { name: name },
    });
}

export async function searchBeneficiaire(name) {
  if (name)
    return await axios.get(url.searchEndpoint, { params: { name: name } });
}
