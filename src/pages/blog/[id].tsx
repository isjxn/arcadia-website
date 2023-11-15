import { Spacer } from "@nextui-org/react";
import { BlogPost } from "@prisma/client";
import Head from "next/head";
import EditorJsRenderer from "~/components/EditorJsRenderer";
import { db } from "~/server/db";

export async function getStaticPaths() {
  const blogPosts = await db.blogPost.findMany({
    where: {
      visible: true,
    },
  });

  const paths = blogPosts.map((blogPost) => {
    return {
      params: {
        id: blogPost.id.toString(),
      },
    };
  });

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const blogPost = await db.blogPost.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return {
    props: {
      blogPost,
    },
    revalidate: 1,
  };
}

export default function BlogPostPage({ blogPost }: { blogPost: BlogPost }) {
  const headTitle = `Arcadia | ${blogPost.title}`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={blogPost.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer y={4} />
      <EditorJsRenderer data={JSON.parse(blogPost.content)} />
    </>
  );
}