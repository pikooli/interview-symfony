import axios from "axios";
import * as url from "./Url";
import Cookies from "js-cookie";

export default async function getUsersInfo() {
  if (Cookies.get("token")) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
    return await axios.get(url.beneficiariesEndpoint);
  }
  return false;
}
