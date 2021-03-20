import { client } from "./api-client";

function getUser() {
  return client("/api/auth");
}

function login(user) {
  return client("/api/auth", { data: user });
}
function logout() {}
function register(user) {
  return client("/api/users", { data: user });
}

export { getUser, login, logout, register };
