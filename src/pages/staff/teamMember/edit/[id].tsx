import type { OutputData } from "@editorjs/editorjs";
import { Button, Card, CardBody, CardFooter, Divider, Input, Spacer } from "@nextui-org/react";
import type { TeamMember } from "@prisma/client";
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
  const teamMembers = db.teamMember.findMany();

  // Get the paths we want to pre-render based on blog posts
  const paths = (await teamMembers).map((teamMember) => ({ params: { id: teamMember.id.toString() } }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const teamMember = await db.teamMember.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    props: {
      originalTeammemberString: JSON.stringify(teamMember),
    },
    revalidate: 1,
  };
}

export default function StaffEditor({ originalTeammemberString }: { originalTeammemberString: string }) {
  const originalBlogPost = JSON.parse(originalTeammemberString) as TeamMember;
  const [uuid, setUuid] = useState(originalBlogPost.uuid);
  const [username, setUsername] = useState(originalBlogPost.username);
  const [role, setRole] = useState(originalBlogPost.role);
  const [data, setData] = useState<OutputData>(JSON.parse(originalBlogPost.text) as OutputData);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const blogPostData = JSON.stringify({
      id: originalBlogPost.id,
      uuid: formData.get("uuid")?.toString(),
      username: formData.get("username")?.toString(),
      role: formData.get("role")?.toString(),
      text: data,
    });

    const reponse = await fetch(`/api/staff/teamMember/edit`, {
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
              <Input type="text" name="uuid" label="UUID" value={uuid} onChange={(e) => setUuid(e.target.value)} />
              <Input type="text" name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input type="text" name="role" label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
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
