import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { WriteForm } from "../../components/WriteForm";
import { MainLayout } from "../../layouts/MainLayout";
import { Api } from "../../utils/api";
import { PostItem } from "../../utils/api/types";

interface WritePageProps {
  post: PostItem;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm data={post} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const post = await Api(ctx).post.getOne(+id);
    const user = await Api(ctx).user.getMe();

    if (post.user.id !== user.id) {
      return {
        props: {},
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.warn("Write page error", error);
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default WritePage;
