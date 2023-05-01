import { createTheme } from "@mui/material"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const remoteBooksTheme =  createTheme({
  palette: {
    primary: {
      main: "#C83E4D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F4D6CC",
      dark: "#9e9e9d",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#C73E1D",
    },
    background: {
      default: "#F4B860",
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: ["roboto", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "40px",
      lineHeight: "54px",
      textAlign: "center",
    },
    h2: {
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: "44px",
    },
    h3: {
      fontWeight: 500,
      fontSize: "26px",
    },
    h4: {
      fontWeight: 400,
      fontSize: "24px",
    },
    h5: {
      fontWeight: 400,
      fontSize: "16px",
    },
    h6: {
      fontWeight: 400,
      fontSize: "13px",
    },
    

    fontWeightRegular: 400,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "static",
        },
        colorPrimary: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "#4A5859",
					fontSize: "40px",
					fontWeight: 600,
          marginTop: 3,
          marginBottom: 3,
        },
      },
    },
    MuiMenu: {
			styleOverrides: {
				list: {
					backgroundColor: "#F4B860",
				},
			},
		},
  },
})

export default remoteBooksTheme