import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
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
  const backgroundImageStyle = {
    backgroundImage: `url('${blogPost.thumbnail}')`,
  };

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={blogPost.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex justify-center items-center" style={backgroundImageStyle}>
        <Card className="max-w-[960px] h-2/3">
          <CardHeader className="flex gap-3">
            <Image
              alt="Arcadia Logo"
              height={40}
              radius="sm"
              src="/placeholder-logo.jpg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-2xl font-bold">{blogPost.title}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <EditorJsRenderer data={JSON.parse(blogPost.content)} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}