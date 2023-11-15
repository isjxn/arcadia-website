import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Spacer, Image } from "@nextui-org/react";
import type { BlogPost } from "@prisma/client";
import Head from "next/head";
import React from "react";
import BlogContainer from "~/components/BlogContainer";
import getSortedBlogPosts from "~/utils/getSortedBlogPosts";


export async function getStaticProps() {
  return await getSortedBlogPosts();
}

export default function App({ blogPosts }: { blogPosts: Array<BlogPost> }) {
  return (
    <>
      <Head>
        <title>Arcadia | Home</title>
        <meta name="description" content="Arcadia | Willkommen auf Arcadia! Tauche ein in eine faszinierende Welt voller Rollenspiel-Abenteuer und entdecke die einzigartie Atmosphäre von Arcadia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-[url('/welcome2.png')] flex justify-center items-center">
        <Card className="max-w-[800px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="Arcadia Logo"
              height={40}
              radius="sm"
              src="/placeholder-logo.jpg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-4xl">Willkommen auf Arcadia!</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg">
            Tauche ein in eine faszinierende Welt voller Rollenspiel-Abenteuer und entdecke die einzigartige Atmosphäre von Arcadia.<br /><br />
            Unser Server bietet eine lebendige und immersive Erfahrung, in der du deine eigene Geschichte schreiben kannst. Hierbei legen wir besonderen Wert auf ein ausgewogenes Spielerlebnis, bei dem du die Möglichkeit hast, effektiv zu grinden und so deine Charakterentwicklung voranzutreiben.
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <BlogContainer blogPosts={blogPosts} />
      <Spacer y={8} />
    </>
  );
}
