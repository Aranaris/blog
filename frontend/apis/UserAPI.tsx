import { api } from "./configs/fetchConfigs";

export interface User {
  _id: string,
  username: string,
  lastaction: string,
}

export const UserAPI = {
  getAllUsers: async function() {
    const response = fetch(`${api.baseURL}users/`, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
    return response;
  },
  getUserByID: async function(id:string) {
    const response = fetch(`${api.baseURL}users/${id}`, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
    return response;
  }, 
}
