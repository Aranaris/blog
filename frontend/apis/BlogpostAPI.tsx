import { api } from "./configs/fetchConfigs";
import { User } from "./UserAPI";

export interface Post {
    _id: string,
    user: User,
    title: string,
    content: string,
    postdate: string,
  }

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
  getLatestPost: async function() {
    const response = fetch(`${api.baseURL}posts/latest`, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
    return response;
  }, 
}
