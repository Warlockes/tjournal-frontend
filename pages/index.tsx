import { GetServerSideProps, NextPage } from "next";
import { Post } from "../components/Post";
import { MainLayout } from "../layouts/MainLayout";
import { wrapper } from "../redux/store";
import { parseCookies } from "nookies";
import { UserApi } from "../utils/api";
import { setUserData } from "../redux/slices/user";

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { tjournalAuthToken } = parseCookies(ctx);

      const userData = await UserApi.getMe(tjournalAuthToken);

      store.dispatch(setUserData(userData));

      return { props: {} };
    } catch (error) {
      console.warn(error);
      return { props: {} };
    }
  });
