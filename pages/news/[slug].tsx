import React from "react";
import { FullPost } from "../../components/FullPost";
import { PostComments } from "../../components/PostComments";
import { MainLayout } from "../../layouts/MainLayout";

export default function Post() {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost />
      <PostComments />
    </MainLayout>
  );
}
