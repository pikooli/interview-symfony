import React from "react";
import names from "../../names";
import getUserInfo from "../../Controller/API/GetUserInfo";

// import axios from "axios";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
// const backendUrl = "http://localhost:8000";
// const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;
// const loginEndpoint = `${backendUrl}/authentication_token`;

const getAvatar = (name) => `${apiEndpoint}${name}.svg?${apiOptions}`;

function App() {
  const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
    []
  );
  // const fetchBeneficiaries = async () => {
  //   const loginResponse = await axios({
  //     url: loginEndpoint,
  //     method: "POST",
  //     data: { email: "tester@gmail.com", password: "I@mTheT€ster" },
  //   });
  //   axios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${loginResponse.data.token}`;
  //   const response = await axios.get(beneficiariesEndpoint);
  //   console.log(response);
  //   setRegisteredBeneficiaries(response.data["hydra:member"]);
  // };

  React.useEffect(() => {
    getUserInfo()
      .then((resp) => {
        if (resp) setRegisteredBeneficiaries(resp.data["hydra:member"]);
      })
      .catch((err) => console.log(err));
    // fetchBeneficiaries();
  }, []);
  console.log(registeredBeneficiaries);
  const beneficiaryNames = [...Array(12).keys()].map((number) => ({
    name: names[Math.floor(Math.random() * names.length)],
  }));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        <hr />
        <h3>Personnes stockées en base</h3>
        <div className="Beneficiaries-list">
          {registeredBeneficiaries.map((beneficiary) => (
            <div className="Beneficiary-card" key={beneficiary.id}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
            </div>
          ))}
        </div>
        <hr />
        <h3>Personnes non stockées</h3>
        <div className="Beneficiaries-list">
          {beneficiaryNames.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
