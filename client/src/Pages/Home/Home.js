import React from "react";
import names from "../../names";
import getUsersInfo from "../../Controller/API/GetUsersInfo";
import AddButton from "../../Component/Button/Add";
import DeleteButton from "../../Component/Button/Delete";
import SearchUser from "../../Component/Search/SearchUser";
import Cookies from "js-cookie";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";

const getAvatar = (name) => `${apiEndpoint}${name}.svg?${apiOptions}`;

function App() {
  const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
    []
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

  const beneficiaryNames = [...Array(12).keys()].map((number) => ({
    name: names[Math.floor(Math.random() * names.length)],
  }));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
        {email ? <h3>Bonjour {email}</h3> : null}
        <hr />
        <SearchUser setRegisteredBeneficiaries={setRegisteredBeneficiaries} />
        <h3>Personnes stockées en base</h3>
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
        <div className="Beneficiaries-list">
          {beneficiaryNames.map((beneficiary, index) => (
            <div className="Beneficiary-card" key={beneficiary.name + index}>
              <img src={getAvatar(beneficiary.name)} alt={beneficiary.name} />
              <span>{beneficiary.name}</span>
              <br />
              <AddButton
                name={beneficiary.name}
                fetchBeneficiairies={fetchBeneficiairies}
              />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
