import {Card, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";


interface CardWrapperProps {
  children: React.ReactNode;
  Opplink?: string;
  label?:string;
  ForgotPasswordLink?: string;
  ForgotPassword?: string
}

const CardWrapper = ({
  children, Opplink, label, ForgotPassword, ForgotPasswordLink } : CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardContent>{children}</CardContent>
      <CardFooter className="flex px-0justify-between">
      <Button variant={"link"}>
        {Opplink && <Link href={Opplink}>{label}</Link>}
      </Button>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper;