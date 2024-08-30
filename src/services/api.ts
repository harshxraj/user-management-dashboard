import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export const getUsers = () => axios.get<User[]>(API_URL);

export const addUser = (user: Omit<User, "id">) => axios.post<User>(API_URL, user);

export const editUser = (id: number, user: User) => axios.put<User>(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
