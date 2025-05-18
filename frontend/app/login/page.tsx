import { LoginForm } from "@/components/LoginForm"
import { useSession } from "@/context/SessionContext"


const Login = () => {
const {login} = useSession()

const handleLoginSuccess = (userdata: any) => {
  console.log(userdata)
  login(userdata)
}


  return (
   <LoginForm onLoginSuccess={handleLoginSuccess}/>
  )
}

export default Login
