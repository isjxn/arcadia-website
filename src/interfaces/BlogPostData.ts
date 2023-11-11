import type { OutputData } from "@editorjs/editorjs";

export default interface BlogPostData {
  id?: number;
  title: string;
  thumbnail: string;
  content: OutputData;
}