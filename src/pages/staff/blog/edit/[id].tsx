//index.tsx
import type { OutputData } from "@editorjs/editorjs";
import { Button, Card, CardBody, CardFooter, Divider, Input, Spacer } from "@nextui-org/react";
import type { BlogPost } from "@prisma/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import EditorJsRenderer from "~/components/EditorJsRenderer";
import { db } from "~/server/db";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(() => import("../../../../components/EditorBlock"), {
  ssr: false,
});

export async function getStaticPaths() {
  const blogPosts = db.blogPost.findMany();

  // Get the paths we want to pre-render based on blog posts
  const paths = (await blogPosts).map((post) => ({ params: { id: post.id.toString() } }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const blogPost = await db.blogPost.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    props: {
      originalBlogPostString: JSON.stringify(blogPost),
    },
    revalidate: 1,
  };
}

export default function StaffEditor({ originalBlogPostString }: { originalBlogPostString: string }) {
  const originalBlogPost = JSON.parse(originalBlogPostString) as BlogPost;
  const [title, setTitle] = useState(originalBlogPost.title);
  const [thumbnail, setThumbnail] = useState(originalBlogPost.thumbnail);
  const [data, setData] = useState<OutputData>(JSON.parse(originalBlogPost.content) as OutputData);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const blogPostData = JSON.stringify({
      id: originalBlogPost.id,
      title: formData.get("title")?.toString(),
      thumbnail: formData.get("thumbnail")?.toString(),
      content: data,
    });

    const reponse = await fetch(`/api/staff/blog/edit`, {
      method: "POST",
      body: blogPostData,
    });

    if (reponse.ok) {
      window.location.href = '/staff';
    }
  }

  return (
    <>
      <Head>
        <title>Arcadia | Edit Blog Post</title>
        <meta name="description" content="Create a Blog Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card className="mx-4">
        <form onSubmit={async (e) => await onSubmit(e)}>
          <CardBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="text" name="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input type="text" name="thumbnail" label="Thumbnail Image URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="primary" type="submit">
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Spacer y={8} />
      <EditorBlock data={data} onChange={setData} holder="editorjs-container" />
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <div className="p-16">{data && <EditorJsRenderer data={data} />}</div>

    </>
  );
};
