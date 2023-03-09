import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import HomeRoutes from "Routes";
import remoteBooksTheme from "theme";

function App() {
  return (
    <div className="App">
			<ThemeProvider theme={remoteBooksTheme}>
					<CssBaseline />
          <HomeRoutes />
			</ThemeProvider>
    </div>
  );
}

export default App;
