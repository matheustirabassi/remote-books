import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { SnackbarProvider } from "notistack"
import Routes from "Routes"
import remoteBooksTheme from "theme"

function App() {
  const MILLISECONDS_TO_HIDE = 4000
  const MAX_SNACK = 3

  return (
    <div className="App">
      <ThemeProvider theme={remoteBooksTheme}>
        <CssBaseline />
        <Routes />
        <SnackbarProvider maxSnack={MAX_SNACK} autoHideDuration={MILLISECONDS_TO_HIDE} />
      </ThemeProvider>
    </div>
  )
}

export default App
