import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

import "../styles/globals.scss";
import "macro-css";
import Head from "next/head";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { wrapper } from "../redux/store";
import { setUserData } from "../redux/slices/user";
import { Api } from "../utils/api";

// TODO:
// 1) Поправить стили на кнопках в регистрации и т.д. Слетели из-за оверрайда темы
// 2) Попробовать еще раз прикрутить декоратор на проверку уникальности почты в базе данных
// 3) Рефакторинг
// 4) Сделать общую форму для регистрации и логина (отличается одним полем)
// 5) Комменты в реальном времени (сокет)
// 6) Подключить доп модули для editorJS
// 7) 403 Страница для ошибки написания статьи или убирать кнопку написания статьи для неавторизованного пользователя

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RJournal</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getMe();

        store.dispatch(setUserData(userData));
      } catch (error) {
        if (ctx.asPath === "/write") {
          ctx.res.writeHead(302, {
            Location: "/403",
          });
          ctx.res.end();
        }

        console.warn(error);
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(MyApp);
