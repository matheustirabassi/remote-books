import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material"
import Typography from "@mui/material/Typography"
import { LanguageConstants } from "enums/Constants"
import { BasicDatePicker } from "presentation/components/BasicDatePicker"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import BookViewModel from "./BookViewModel"
import { useNavigate } from "react-router-dom"
import { enqueueSnackbar } from "notistack"
import { ROUTES } from "Routes"

export default function BookView() {
  const { t } = useTranslation()

  const viewModel = BookViewModel()

  const navigate = useNavigate()

  useEffect(() => {
    viewModel.getAllAuthors()
  }, [undefined])

  useEffect(() => {
    viewModel.getAllCategories()
  }, [undefined])

  useEffect(() => {
    viewModel.getAllCollections()
  }, [undefined])
  
  useEffect(() => {
    showSnackbarAndNavigate()
  })

  useEffect(() => {
    if (viewModel.errors.length === 0) {
      return
    }

    viewModel.errors.forEach((error) => enqueueSnackbar(t(error.message), { variant: "error" }))
  })

  function showSnackbarAndNavigate() {
    if (!viewModel.bookWasSaved) {
      return
    }

    enqueueSnackbar(t(LanguageConstants.SAVED_CONTENT), { variant: "success" })
    navigate(ROUTES.HOME)
  }

  return (
    <>
      <Grid container direction="row" id="loadingView" style={{ display: "none" }}>
        <LoadingState />
      </Grid>

      <Grid container id="contentView">
        <Grid
          container
          direction="column"
          alignContent="flex-start"
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={2}
        >
          <Grid item mt={2} xs={6} md={6}>
            <Grid item>
              <TextField
                label={t(LanguageConstants.TITLE)}
                name="title"
                value={viewModel.title}
                onChange={(event) => {
                  viewModel.setTitle(event.target.value)
                }}
              />
            </Grid>

            <Grid item mt={2}>
              <TextField
                label={t(LanguageConstants.SYNOPSIS)}
                name="synopsis"
                value={viewModel.sinopse}
                onChange={(event) => {
                  viewModel.setSinopse(event.target.value)
                }}
              />
            </Grid>

            <Grid item mt={2}>
              <BasicDatePicker
                label={t(LanguageConstants.RELEASE_DATE)}
                sx={{ maxWidth: "210px" }}
                value={viewModel.releaseDate}
                onChange={viewModel.setReleaseDate}
              />
            </Grid>

            <Grid item mt={2}>
              <TextField
                label={t(LanguageConstants.LINK)}
                name="link"
                value={viewModel.imageLink}
                onChange={(event) => {
                  viewModel.setImageLink(event.target.value)
                }}
              />
            </Grid>
          </Grid>

          <Grid item mt={2} xs={6} md={6}>
            <Grid item xs={2}>
              <FormControl sx={{ minWidth: 120 }} required>
                <InputLabel id="inputLabelAuthorId">{t(LanguageConstants.AUTHOR)}</InputLabel>

                <Select
                  labelId="authorSelect"
                  id="authorSelectId"
                  value={viewModel.authorSelected}
                  label={t(LanguageConstants.AUTHOR)}
                  onChange={(e) => viewModel.setAuthorSelected(e.target.value as number)}
                >
                  <MenuItem>None</MenuItem>

                  {viewModel.authors.map((author) => (
                    <MenuItem value={author.id} key={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} mt={2}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="inputLabelCollectionId">{t(LanguageConstants.CATEGORY)}</InputLabel>

                <Select
                  labelId="collectionSelect"
                  id="collectionSelectId"
                  value={viewModel.categorySelected}
                  label={t(LanguageConstants.CATEGORY)}
                  onChange={(event) => {
                    viewModel.setCategorySelected(event.target.value as number)
                  }}
                >
                  <MenuItem>None</MenuItem>

                  {viewModel.categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {" "}
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} mt={2}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="inputLabelCollectionId">
                  {t(LanguageConstants.COLLECTION)}
                </InputLabel>

                <Select
                  labelId="collectionSelect"
                  id="collectionSelectId"
                  value={viewModel.collectionSelected}
                  label={t(LanguageConstants.COLLECTION)}
                  onChange={(event) => {
                    viewModel.setCollectionSelected(event.target.value as number)
                  }}
                >
                  <MenuItem value="">None</MenuItem>

                  {viewModel.collections.map((collection) => (
                    <MenuItem value={collection.id} key={collection.id}>
                      {" "}
                      {collection.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center" mt={2}>
          <Grid item>
            <Button variant="contained" style={{ width: 300, height: 50 }} onClick={viewModel.save}>
              <Typography>{t(LanguageConstants.SAVE)}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
