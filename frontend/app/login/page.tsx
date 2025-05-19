"use client";

import { LoginForm } from "@/components/LoginForm";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useSession();
  const router = useRouter();

  // This function is called after the users logs in
  const handleLoginSuccess = (userdata: any) => {
    console.log(" This is the user data", userdata);
    login(userdata);

    console.log(userdata.data.userPreferences.twoFactorSecret)
    if (userdata.data.userPreferences.twoFactorSecret === null) {
      router.push("/setup2fa");
    }else {
      router.push("/verify2fa");
    }
    
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;
