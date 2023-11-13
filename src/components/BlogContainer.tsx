import type { BlogPost } from "@prisma/client";
import BlogCard from "./BlogCard";
import { Spacer } from "@nextui-org/react";

export default function BlogContainer({ blogPosts }: { blogPosts: Array<BlogPost> }) {
  const newestBlogPostWithoutPin = blogPosts.filter(blogPost => !blogPost.pinned)[0];

  return (
    <>
      <div className="container mx-auto px-8">
        <h1 className="text-4xl">Blog</h1>
      </div>
      <Spacer y={4} />
      {blogPosts.length === 0 ? (
        <div className="container mx-auto px-8">
          <p className="text-lg">Es gibt noch keine Blog-Posts.</p>
        </div>
      ) : (
        <div className="container mx-auto gap-2 grid grid-cols-12 grid-rows-2 px-8">
          {blogPosts.map((blogPost) => (
            <BlogCard
              key={blogPost.id}
              title={blogPost.title}
              extra={blogPost.pinned ? "ANGEPINNT" : (blogPost.id === newestBlogPostWithoutPin?.id ? "NEU" : undefined)}
              imageSrc={blogPost.thumbnail}
              url={`/blog/${blogPost.id}`} />
          ))}
        </div>
      )}
    </>
  )
}