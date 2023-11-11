import { db } from "~/server/db";

export default async function getSortedBlogPosts() {
  const blogPosts = await db.blogPost.findMany({
    where: {
      visible: true,
    },
    orderBy: [
      {
        pinned: "desc",
      },
      {
        createdAt: "desc",
      },
    ]
  });

  return {
    props: {
      blogPosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}