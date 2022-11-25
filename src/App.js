import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { HashRouter } from "react-router-dom";
import { MainLayout } from "./layouts";
import { themeL, themeD } from "./themes";
import { mainNavigation, mainRoutes } from "./data";
import { RoutesWithLayout } from "./components";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      return JSON.parse(dark);
    } else {
      return false;
    }
  });

  const darkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark", !darkMode);
  };

  const themeSwitchCofig = {
    state: darkMode,
    handler: darkModeToggle,
  };

  const appliedTheme = createMuiTheme(darkMode ? themeD : themeL);
  return (
    <HashRouter>
      <ThemeProvider theme={appliedTheme}>
        <RoutesWithLayout
          layout={MainLayout}
          routes={mainRoutes}
          LayoutProps={{
            navigationData: mainNavigation,
            themeConfig: themeSwitchCofig,
          }}
        />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
