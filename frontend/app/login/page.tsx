"use client"

import { LoginForm } from "@/components/LoginForm"
import { useSession } from "@/context/SessionContext"


const Login = () => {
const {login} = useSession()

// This function is called after the users logs in
const handleLoginSuccess = (userdata: any) => {
  console.log(" This is the user data",userdata)
  login(userdata)
}


  return (
   <LoginForm onLoginSuccess={handleLoginSuccess}/>
  )
}

export default Login
