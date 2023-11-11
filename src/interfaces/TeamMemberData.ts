import type { OutputData } from "@editorjs/editorjs";

export default interface TeamMemberData {
  id?: number;
  uuid: string;
  username: string;
  role: string;
  text: OutputData;
}