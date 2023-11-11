import type { WikiCategory } from "@prisma/client";
import BlogCard from "./BlogCard";

export default function WikiContainer({ wikiCategories }: { wikiCategories: Array<WikiCategory> }) {
  return (
    <div className="container mx-auto gap-2 grid grid-cols-12 grid-rows-2 px-8">
      {wikiCategories.map((wikiCategory) => (
        <BlogCard
          key={wikiCategory.id}
          title={wikiCategory.name}
          extra={undefined}
          imageSrc={wikiCategory.thumbnail}
          url={`/wiki/category/${wikiCategory.id}`} />
      ))}
    </div>
  )
}