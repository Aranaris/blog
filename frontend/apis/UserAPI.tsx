import { api } from "./configs/fetchConfigs";

export const UserAPI = {
    getUsers: async function() {
    const response = fetch(`${api.baseURL}users/`, { method: 'GET', mode: 'cors' })
        .then((response) => response.json())
    return response;
  }
}
