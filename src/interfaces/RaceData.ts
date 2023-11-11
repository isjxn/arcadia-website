import type { OutputData } from "@editorjs/editorjs";

export default interface RaceData {
  id?: number;
  name: string;
  description: string;
  imgUrl: string;
  content: OutputData;
}