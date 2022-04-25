import { NextPage } from "next";
import { Post } from "../components/Post";
import { MainLayout } from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
};

export default Home;
