import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { useMediaQuery } from "@material-ui/core";
import ModalProvider from "mui-modal-provider";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import { getLibrary } from "utils/web3React";
import store from "state";

const Providers: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme(
    {
      palette: {
        type: "light",
        primary: {
          light: "#735858",
          main: "#371110",
          dark: "#2a0c0c",
        },
        secondary: {
          light: "#dae6f0",
          main: "#cadbe9",
          dark: "#bdd2e3",
        },
        background: {
          default: "#fff",
        },
      },
      typography: {
        fontFamily: ["Ubuntu"].join(","),
      },
    },
    [prefersDarkMode]
  );

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
              <ModalProvider>{children}</ModalProvider>
            </SnackbarProvider>
          </I18nextProvider>
        </ThemeProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
