import { Grid } from "@mui/material"
import { BookCard } from "presentation/components/BookCard"
import { Header } from "presentation/components/Header"
import HomeViewModel from "./HomeViewMode"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LoadingState } from "presentation/components/States/LoadingState"
import { BookPage } from "data/dto/BookPage"
import { useEffect, useState } from "react"
import { CategoryApi } from "data/api/CategoryApi"
import { States } from "enums/ViewStateEnum"

/** A tela principal do site */
export default function HomeView() {
  const { t } = useTranslation()

  const viewModel = HomeViewModel()
  const navigate = useNavigate()

  useEffect(() => {
    viewModel.getBooks()
  }, [viewModel.pageNumber])

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
          <Grid item md={3}>
            <BookCard
              imageLink={book.imageLink}
              title={book.title}
              author={book.authorId.toString()}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
