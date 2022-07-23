import { Button, Grid, Container } from "@mui/material";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";

import "../styles/globals.css";
import styles from "../styles/Home.module.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#602eb2",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.containeroutter}>
        <GlobalHeader />
        <Container
          sx={{
            background: "white",
            padding: "20px",
            overflow:'scroll',
            height: "calc( 100vh - 112px )",
            "& > div": {
              height: "100%",
              padding: "40px 20px",
            },
          }}
          maxWidth="sm"
        >
          <Component {...pageProps} />
        </Container>
        <GlobalFooter />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
