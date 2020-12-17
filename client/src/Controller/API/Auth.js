import axios from "axios";
import * as url from "./Url";

// tester@gmail.com
// I@mTheT€ster
export async function auth(email, password) {
  const loginResponse = await axios({
    url: url.loginEndpoint,
    method: "POST",
    data: { email: email, password: password },
    // data: { email: "tester@gmail.com", password: "I@mTheT€ster" }, // this is the testing email and password
  }).catch((err) => console.log(err));

  if (loginResponse) {
    return loginResponse.data.token;
  }
  return false;
}
