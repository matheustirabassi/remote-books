import { Grid } from "@mui/material"
import { BookCard } from "presentation/components/BookCard"
import { Header } from "presentation/components/Header"
import HomeViewModel from "./HomeViewMode"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

/** A tela principal do site */
export default function HomeView() {
	const { t } = useTranslation()

  const viewModel = HomeViewModel()
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <Grid
        container
        justifyContent="space-evenly"
        justifyItems="baseline"
        alignItems="baseline"
				spacing={4}
				padding={6}
        marginTop={1}
      >
        <Grid item md={3}>
          <BookCard
            imageLink={
              "https://img.quizur.com/f/img5f8e5b745bd285.10956982.jpg?lastEdited=1603165046"
            }
            title={"Andy Hunt, Dave Benson"}
            author={"Evwin Schorodinger"}
          />
        </Grid>
      </Grid>
    </>
  )
}
