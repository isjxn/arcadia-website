//index.tsx
import type { OutputData } from "@editorjs/editorjs";
import { Button, Card, CardBody, CardFooter, Divider, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import EditorJsRenderer from "~/components/EditorJsRenderer";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(() => import("../../../components/EditorBlock"), {
  ssr: false,
});

export default function StaffEditor() {
  const [data, setData] = useState<OutputData>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const teamMemberData = JSON.stringify({
      uuid: formData.get("uuid")?.toString(),
      username: formData.get("username")?.toString(),
      role: formData.get("role")?.toString(),
      text: data,
    });

    const response = await fetch(`/api/staff/teamMember/create`, {
      method: "POST",
      body: teamMemberData,
    });

    if (response.ok) {
      window.location.href = '/staff';
    }
  }

  return (
    <>
      <Head>
        <title>Arcadia | Create Team Member</title>
        <meta name="description" content="Create a Blog Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card className="mx-4">
        <form onSubmit={async (e) => await onSubmit(e)}>
          <CardBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="text" name="uuid" label="UUID" />
              <Input type="text" name="username" label="Username" />
              <Input type="text" name="role" label="Role" />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="primary" type="submit">
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
      <EditorBlock data={data} onChange={setData} holder="editorjs-container" />
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <div className="container mx-auto px-4">
        <div className="p-16">{data && <EditorJsRenderer data={data} />}</div>
      </div>
    </>
  );
};
