import { Card, CardHeader, Image } from "@nextui-org/react";

export default function BlogCard({ title, extra, imageSrc, url } : { title: string, extra: string | undefined, imageSrc: string, url: string }) {
  return (
    <Card className="col-span-12 sm:col-span-4 h-[300px]" isPressable onPress={() => window.location.href = url}>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        {extra !== undefined &&
          <p className="text-tiny uppercase font-bold">{extra}</p>
        }
        <h4 className="font-medium text-large">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover test-gradient"
        src={imageSrc}
      />
    </Card>
  );
}