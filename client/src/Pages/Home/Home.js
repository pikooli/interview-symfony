import React from "react";
import Cookies from "js-cookie";
import names from "../../names";
import getUsersInfo from "../../Controller/API/GetUsersInfo";
import AddButton from "../../Component/Button/Add";
import DeleteButton from "../../Component/Button/Delete";
import SearchUserInDB from "../../Component/Search/SearchUserInDB";
import SearchUser from "../../Component/Search/SearchUser";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";

const getAvatar = (name) => `${apiEndpoint}${name}.svg?${apiOptions}`;

function App() {
  const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
    []
  );
  const [beneficiaryNames, setBeneficiaryNames] = React.useState(
    [...Array(12).keys()].map((number) => ({
      name: names[Math.floor(Math.random() * names.length)],
    }))
  );
  const [email, setEmail] = React.useState("");

  function fetchBeneficiairies() {
    getUsersInfo()
      .then((resp) => {
        if (resp && resp.data)
          setRegisteredBeneficiaries(resp.data["hydra:member"]);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    fetchBeneficiairies();
    setEmail(Cookies.get("email"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        {email ? <h3>Bonjour {email}</h3> : null}
        <h3>Personnes stockées en base</h3>
        <SearchUserInDB
          setRegisteredBeneficiaries={setRegisteredBeneficiaries}
        />
        <hr />
        <div className="Beneficiaries-list">
          {registeredBeneficiaries.map((beneficiary) => (
            <div className="Beneficiary-card" key={beneficiary.id}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
              <br />
              <DeleteButton
                name={beneficiary.name}
                fetchBeneficiairies={fetchBeneficiairies}
              />
            </div>
          ))}
        </div>
        <hr />
        <h3>Personnes non stockées</h3>
        <SearchUser setBeneficiaryNames={setBeneficiaryNames} />
        <hr />

        <div className="Beneficiaries-list">
          {beneficiaryNames.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
              <br />
              {email ? (
                <AddButton
                  name={beneficiary.name}
                  fetchBeneficiairies={fetchBeneficiairies}
                />
              ) : null}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
