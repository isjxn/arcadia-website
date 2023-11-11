import { Spacer } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import Head from "next/head";
import BlogContainer from "~/components/BlogContainer";
import getSortedBlogPosts from "~/utils/getSortedBlogPosts";

export async function getStaticProps() {
  return await getSortedBlogPosts();
}

export default function BlogPage({ blogPosts } : { blogPosts: Array<BlogPost>}) {
  return (
    <>
      <Head>
        <title>Arcadia | Blog</title>
        <meta name="description" content="Arcadia | Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer y={4} />
      <BlogContainer blogPosts={blogPosts} />
    </>
  );
}