import { Card, CardBody, CardFooter, Spacer } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function RaceCard({ name, imgUrl, description }: { name: string, imgUrl: string, description: string }) {
  return (
    <Card className="h-min" shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="w-full object-contain"
          src={imgUrl}
        />
      </CardBody>
      <CardFooter className="text-small flex flex-col">
        <b>{name}</b>
        <Spacer y={0.5} />
        <p>{description}</p>
      </CardFooter>
    </Card>
  )
}