import Axios from "axios-observable";
import TokenStore from "./TokenStore";

Axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `${TokenStore.getInstance().getToken()}`,
  };
  return config;
});

Axios.interceptors.response.use((response) => {
  TokenStore.getInstance().setToken(response.headers.authorization);

  return response;
});

export default Axios;
