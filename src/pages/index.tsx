import { Divider, Spacer } from "@nextui-org/react";
import type { BlogPost } from "@prisma/client";
import Head from "next/head";
import React from "react";
import BlogContainer from "~/components/BlogContainer";
import getSortedBlogPosts from "~/utils/getSortedBlogPosts";

export async function getStaticProps() {
  return await getSortedBlogPosts();
}

export default function App({ blogPosts } : { blogPosts: Array<BlogPost> }) {
  return (
    <>
      <Head>
        <title>Arcadia | Home</title>
        <meta name="description" content="Arcadia | Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-[url('/welcome2.png')] flex justify-center items-center">
        <div className="w-6/12 p-4 flex flex-col justify-center items-center">
          <p className="text-6xl pb-4 w-fit text-white">Willkommen auf Arcadia!</p>
          <p className="text-xl text-center text-white">
            Willkommen. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <BlogContainer blogPosts={blogPosts} />
      <Spacer y={8} />
    </>
  );
}
