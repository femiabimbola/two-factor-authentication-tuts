import {Card, CardContent, CardHeader, CardFooter} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper = ( {
  children} : CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default CardWrapper;