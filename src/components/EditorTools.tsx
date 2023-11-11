// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Code from "@editorjs/code";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Header from "@editorjs/header";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import type { ToolConstructable, ToolSettings } from "@editorjs/editorjs";

type EditorTools = Record<string, ToolConstructable | ToolSettings>;

export const EDITOR_TOOLS: EditorTools = {
  code: {
    class: Code,
    inlineToolbar: true,
  } as ToolSettings,
  header: {
    class: Header,
    inlineToolbar: true,
  } as ToolSettings,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  } as ToolSettings,
}
