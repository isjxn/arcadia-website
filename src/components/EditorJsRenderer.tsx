//components/EditorJsRenderer.tsx
/**
 * This component is used to render the output of EditorJS.
 * Right now it is hot gargabe and will likely be replaced by a better solution in the future.
 */
import { type OutputData } from "@editorjs/editorjs";
import { Code } from "@nextui-org/react";
import React from "react";

type Props = {
  data: OutputData;
};

const EditorJsRenderer = ({ data }: Props) => {
  return (
    //✔️ It's important to add key={data.time} here to re-render based on the latest data.
    <div className="container mx-auto px-8" key={data.time}>
      {data.blocks.map((block, index) => {
        block.data.text = block.data.text.replace(/<a href="/g, '<a class="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary underline hover:opacity-80 active:opacity-disabled transition-opacity underline-offset-4" href="');
        switch (block.type) {
          case "paragraph":
            return <p key={index} dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></p>;
          case "header":
            switch ((block.data as { level: number }).level) {
              case 1:
                return <h1 key={index} className="text-6xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h1>;
              case 2:
                return <h2 key={index} className="text-5xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h2>;
              case 3:
                return <h3 key={index} className="text-4xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h3>;
              case 4:
                return <h4 key={index} className="text-3xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h4>;
              case 5:
                return <h5 key={index} className="text-2xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h5>;
              case 6:
                return <h6 key={index} className="text-xl" dangerouslySetInnerHTML={{ __html: (block.data as { text: string }).text }}></h6>;
            }
          case "code":
            return <Code key={index} dangerouslySetInnerHTML={{ __html: (block.data as { code: string }).code }}></Code>
        }
      })}
    </div>
  );
};

export default EditorJsRenderer;
