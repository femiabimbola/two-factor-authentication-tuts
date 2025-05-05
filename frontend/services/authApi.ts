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

export const login = async ({ password, email}: registerProps) => {
  return await api.post("/auth/login", { password, email}, {withCredentials:true})
}