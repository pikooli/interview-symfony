// here a list of all url that we use

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;
const loginEndpoint = `${backendUrl}/authentication_token`;
const searchEndpoint = `${backendUrl}/searchUsers`;
const deleteUserEndpoint = `${backendUrl}/deleteUsers`;

export {
  apiEndpoint,
  apiOptions,
  backendUrl,
  beneficiariesEndpoint,
  loginEndpoint,
  searchEndpoint,
  deleteUserEndpoint,
};
