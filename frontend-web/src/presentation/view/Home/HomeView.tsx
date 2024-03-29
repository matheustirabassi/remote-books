import { Grid } from "@mui/material"
import { BookCard } from "presentation/components/BookCard"
import { Header } from "presentation/components/Header"
import { LoadingState } from "presentation/components/States/LoadingState"
import HomeViewModel from "./HomeViewModel"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

interface HomeViewProps {
  viewModel: ReturnType<typeof HomeViewModel>
}

/** A tela principal do site */
export default function HomeView({ viewModel }: HomeViewProps) {
  const {id} = useParams()

  useEffect(() => {
    if (id === undefined) {
      viewModel.setPageNumber(0)
      return
    }

    viewModel.setPageNumber(parseInt(id))
  }, [id])

  return (
    <>
      <Header />
      <Grid container id="loadingView" justifyContent="center" style={{ display: "none" }}>
        <Grid item>
          <LoadingState />
        </Grid>
      </Grid>

      <Grid
        container
        id="contentView"
        justifyContent="space-evenly"
        justifyItems="baseline"
        alignItems="baseline"
        spacing={4}
        padding={6}
        marginTop={1}
      >
        {viewModel.page.content.map((book) => (
          <Grid item md={3} key={book.id}>
            <BookCard
              id={book.id!!}
              title={book.title}
              author={book.authorName!!}
              imageLink={book.imageLink}
              accessLink={book.accessLink}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
