import { Box, Grid, Typography } from "@mui/material"
import { Header } from "presentation/components/Header"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormBookViewModel from "./FormBookViewModel"
import { daysToWeeks } from "date-fns"
import { Link } from "react-router-dom"

interface FormBookViewProps {
  viewModel: ReturnType<typeof FormBookViewModel>
}

/** A tela principal do site */
export default function FormBookView({ viewModel }: FormBookViewProps) {
  const { id } = useParams()

  useEffect(() => {
    if (id === undefined) {
      return
    }

    viewModel.setBookId(parseInt(id))
  })

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
        alignItems="center"
        spacing={4}
        padding={6}
        marginTop={1}
        direction={"column"}
      >
        <Typography variant="h1" color="text.secondary">
          {viewModel.bookDto?.title}
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={viewModel.bookDto?.imageLink}
        />

        <Link to={viewModel.bookDto?.accessLink!!}>{viewModel.bookDto?.accessLink}</Link>
        <Typography variant="body1" color="text.secondary">
          {viewModel.bookDto?.authorName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {viewModel.bookDto?.sinopse}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {new Date(viewModel.bookDto?.releaseDate!!).toLocaleDateString()}
        </Typography>
      </Grid>
    </>
  )
}
