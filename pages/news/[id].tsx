import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { FullPost } from "../../components/FullPost";
import { PostComments } from "../../components/PostComments";
import { MainLayout } from "../../layouts/MainLayout";
import { Api } from "../../utils/api";
import { PostItem } from "../../utils/api/types";

interface FullPostPageProps {
  post: PostItem;
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost post={post} />
      <PostComments postId={post.id} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const post = await Api(ctx).post.getOne(+id);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.warn("Full post page error", error);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default FullPostPage;
