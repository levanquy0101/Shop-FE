import {jwtDecode} from "jwt-decode";

const  token  = JSON.parse(localStorage.getItem("user")) || "";
const decodedToken = token ? jwtDecode(token) : {};

export const account = {
  username: decodedToken?.sub || null,
  codeUser: decodedToken?.code || null,
  displayName: decodedToken?.name || null,
  roleName: decodedToken?.roleName || null,
  email: decodedToken?.email || null,
  photoURL: decodedToken?.avatarUrl || null,
};
