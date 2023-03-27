import { Button, Grid, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { LanguageConstants } from "enums/Constants"
import { enqueueSnackbar } from "notistack"
import { BasicDatePicker } from "presentation/components/BasicDatePicker"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "Routes"
import AuthorViewModel from "./AuthorViewModel"

export default function CategoryView() {
  const { t } = useTranslation()

  const viewModel = AuthorViewModel()

  const navigate = useNavigate()

  useEffect(() => {
    if (viewModel.name.isEmpty()) {
      return
    }

    viewModel.validateName()
  })

  useEffect(() => {
    if (viewModel.dateOfBirth === undefined) {
      return
    }

    viewModel.validateDateOfBirth()
  })

  useEffect(() => {
    showSnackbarAndNavigate()
  })

  useEffect(() => {
    if (viewModel.errorMessage.isEmpty()) {
      return
    }

    enqueueSnackbar(t(viewModel.errorMessage), { variant: "error" })
  })

  /**
   * Mostra a snackbar de sucesso e navega para tela inicial
   */
  function showSnackbarAndNavigate() {
    if (!viewModel.authorWasSaved) {
      return
    }

    enqueueSnackbar(t(LanguageConstants.SAVED_CONTENT), { variant: "success" })
    navigate(ROUTES.HOME)
  }

  function nameHasError(): boolean {
    if (viewModel.nameErrorText === undefined) {
      return false
    }

    return !viewModel.nameErrorText?.isEmpty()
  }

  return (
    <>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"end"}
        alignContent={"center"}
        id="loadingView"
        style={{display:"none"}}
      >
        <LoadingState />
      </Grid>

      <Grid container id="contentView">
        <Grid container item mt={2} direction={"column"} alignContent={"left"}>
          <TextField
            label={t(LanguageConstants.NAME)}
            name="author_name"
            style={{ width: 300 }}
            value={viewModel.name}
            error={nameHasError()}
            helperText={viewModel.nameErrorText}
            onChange={viewModel.onSetName}
          />

          <BasicDatePicker
            label={t(LanguageConstants.DATE_OF_BIRTH)}
            sx={{ marginTop: 2, width: 300 }}
            value={viewModel.dateOfBirth}
            onChange={viewModel.setDateOfBirth}
            helperText={viewModel.dateOfBirthErrorText}
          />
        </Grid>

        <Grid
          container
          direction={"column"}
          justifyContent={"end"}
          alignItems={"center"}
          alignContent={"center"}
          height={"45vh"}
        >
          <Button
            variant="contained"
            style={{ width: 300, height: 50 }}
            onClick={viewModel.saveAuthor}
          >
            <Typography>{t(LanguageConstants.SAVE)}</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
