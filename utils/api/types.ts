import { OutputData } from "@editorjs/editorjs";

export type PostItem = {
  title: string;
  body: OutputData["blocks"];
  description: string;
  tags: null | string;
  id: number;
  views: number;
  // user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};
