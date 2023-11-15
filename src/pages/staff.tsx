import { Spacer, Divider, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import type { BlogPost, TeamMember } from "@prisma/client";
import Head from "next/head";
import React from "react";
import StaffTable from "~/components/StaffTable";
import { StaffTableType } from "~/enums/StaffTableType";
import { db } from "~/server/db";

export const getServerSideProps = (async () => {
  const blogPosts = await db.blogPost.findMany();
  const teamMembers = await db.teamMember.findMany();

  return {
    props: {
      blogPosts,
      teamMembers,
    },
  };
});

export default function Staff({
  blogPosts,
  teamMembers,
}:
  {
    blogPosts: Array<BlogPost>,
    teamMembers: Array<TeamMember>,
  }) {

  const tableColumns = [
    { name: "NAME", uid: "value" },
    { name: "VISIBLE", uid: "visible" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const blogPostsTableColumns = [
    { name: "NAME", uid: "value" },
    { name: "VISIBLE", uid: "visible" },
    { name: "PINNED", uid: "pinned" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const blogPostsTableFormatted = blogPosts.map((blogPost) => {
    return {
      id: blogPost.id,
      value: blogPost.title,
      visible: blogPost.visible,
      pinned: blogPost.pinned,
    }
  });

  const teamMembersTableFormatted = teamMembers.map((teamMember) => {
    return {
      id: teamMember.id,
      value: teamMember.username,
      visible: teamMember.visible,
    }
  });

  return (
    <>
      <Head>
        <title>Arcadia | Team</title>
        <meta name="description" content="Arcadias Staff Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer y={4} />
      <div className="container mx-auto px-8">
        <p className="text-4xl pb-1">Staff Bereich</p>
        <p className="w-9/12">
          Wenn ihr hier seid, solltet ihr wissen, was ihr tut. Wenn nicht, dann gehört ihr hier nicht hin.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <div className="container mx-auto gap-2 grid grid-cols-2 px-8">
        <Card>
          <CardHeader className="flex gap-3">
            <p className="text-md">Blog Posts</p>
          </CardHeader>
          <CardBody>
            <Button color="primary" className="w-min mb-2" onClick={() => { window.location.href = "/staff/blog/create" }}>
              Create
            </Button>
            <StaffTable
              columns={blogPostsTableColumns}
              datas={blogPostsTableFormatted}
              type={StaffTableType.BlogPost}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <p className="text-md">Team Members</p>
          </CardHeader>
          <CardBody>
            <Button color="primary" className="w-min mb-2" onClick={() => { window.location.href = "/staff/teamMember/create" }}>
              Create
            </Button>
            <StaffTable
              columns={tableColumns}
              datas={teamMembersTableFormatted}
              type={StaffTableType.TeamMember}
            />
          </CardBody>
        </Card>
      </div >
    </>
  )
}