import { Button, Grid, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { LanguageConstants } from "enums/Constants"
import { enqueueSnackbar } from "notistack"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "Routes"
import CategoryViewModel from "./CategoryViewModel"

export default function CategoryView() {
  const { t } = useTranslation()

  const viewModel = CategoryViewModel()
  const navigate = useNavigate()

  useEffect(() => {
    viewModel.validate()
  }, [viewModel.name])

  useEffect(() => {
    showSnackbarAndNavigate()
  }, [viewModel.categoryWasSaved])

  useEffect(() => {
    if (viewModel.errorMessage !== "") {
      enqueueSnackbar(t(viewModel.errorMessage), { variant: "error" })
    }
  }, [viewModel.errorMessage])

  /**
   * Mostra a snackbar de sucesso e navega para tela inicial
   */
  function showSnackbarAndNavigate() {
    if (!viewModel.categoryWasSaved) {
      return
    }

    enqueueSnackbar(t(LanguageConstants.CATEGORY_SAVED), { variant: "success" })
    navigate(ROUTES.HOME)
  }

  function hiddenIfIsLoading() {
    return viewModel.isLoading ? "hidden" : "visible"
  }

  return (
    <>
      <Grid container direction={"row"} justifyContent={"center"}>
        <ThreeDots visible={viewModel.isLoading} color="black" />
      </Grid>

      <Grid container visibility={hiddenIfIsLoading()}>
        <Grid container direction={"column"} item mt={2}>
          <TextField
            label={t(LanguageConstants.NAME)}
            name="category_name"
            style={{ width: 300 }}
            value={viewModel.name}
            error={viewModel.nameHasError}
            helperText={viewModel.nameErrorText}
            onChange={viewModel.onSetName}
          />
        </Grid>

        <Grid container direction={"row"} justifyContent={"center"} mt={2}>
          <Button
            variant="contained"
            style={{ width: 300, height: 50 }}
            onClick={viewModel.saveCategory}
          >
            <Typography>{t(LanguageConstants.SAVE)}</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
