import api from "./api"

interface registerProps {
  password: string;
  firstName: string;
  lastName:string;
  email: string
}

interface loginProps {
  password: string;
  email: string
}

export const register = async ({lastName, password, firstName, email}: registerProps) => {
  return await api.post("/auth/register", {lastName, password, firstName, email})
}

export const login = async ({ password, email}: loginProps) => {
  return await api.post("/auth/login", { password, email}, {withCredentials:true})
}

export const authStatus = async () => {
  return await api.get("/auth/status", {withCredentials:true})
}

export const logout = async () => {
  return await api.get("/auth/logout", {withCredentials:true})
}

export const setup2FA = async () => {
  return await api.get("/auth/2fa/setup", {withCredentials:true})
}

export const verify2FA = async (token: string) => {
  return await api.post("/auth/2fa/verify", {token}, {withCredentials:true})
}

export const reset2FA = async () => {
  return await api.get("/auth/2fa/reset", {withCredentials:true})
}