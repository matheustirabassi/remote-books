import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Routes from "Routes";
import remoteBooksTheme from "theme";

function App() {
  return (
    <div className="App">
			<ThemeProvider theme={remoteBooksTheme}>
					<CssBaseline />
          <Routes />
			</ThemeProvider>
    </div>
  );
}

export default App;
