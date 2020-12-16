import axios from "axios";
import * as url from "./Url";

export default async function test() {
  return await axios.get(url.beneficiariesEndpoint, { name: "toto" });
  // return await axios.get(url.backendUrl + "/product");
}
