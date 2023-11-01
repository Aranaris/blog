import { api } from "./configs/fetchConfigs";

export const BlogpostAPI = {
  getAllPosts: async function() {
    const response = fetch(`${api.baseURL}posts/`, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
    return response;
  },
  getPostByID: async function(id:string) {
    const response = fetch(`${api.baseURL}posts/${id}`, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
    return response;
  }, 
}
