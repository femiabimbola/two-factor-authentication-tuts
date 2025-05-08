import { Button } from "@/components/ui/button";
import Link from "next/link";

const  Home = () => {
  return ( 
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-white"> A 2 Factor Authentication</h1>

      <p className="text-white pb-3">A Two Factor Authentication with Speakeasy and Jsonwebtoken</p>
      <Button className="bg-white text-blue-500" asChild>
        <Link href={'/login'}> Login  </Link>        
        </Button>
    </div>
    
  );
}

export default Home
