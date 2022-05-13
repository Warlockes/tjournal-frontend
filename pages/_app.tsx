import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

import "../styles/globals.scss";
import "macro-css";
import Head from "next/head";
import { AppProps } from "next/app";
import { Header } from "../components/Header";

// TODO:
// 1) Поправить стили на кнопках в регистрации и т.д. Слетели из-за оверрайда темы
// 2) Попробовать еще раз прикрутить декоратор на проверку уникальности почты в базе данных

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

export default MyApp;
