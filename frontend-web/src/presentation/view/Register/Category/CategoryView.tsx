import { Button, Grid, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { LanguageConstants } from "enums/Constants"
import { enqueueSnackbar } from "notistack"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "Routes"
import CategoryViewModel from "./CategoryViewModel"

export default function CategoryView() {
  const { t } = useTranslation()

  const viewModel = CategoryViewModel()
  const navigate = useNavigate()

  useEffect(() => {
    if (viewModel.name.isEmpty()) {
      return
    }

    viewModel.validateName()
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
    if (!viewModel.categoryWasSaved) {
      return
    }

    enqueueSnackbar(t(LanguageConstants.SAVED_CONTENT), { variant: "success" })
    navigate(ROUTES.HOME)
  }

  return (
    <>
      <Grid container id="loadingView" justifyContent="center" style={{ display: "none" }}>
        <Grid item>
          <LoadingState />
        </Grid>
      </Grid>

      <Grid container id="contentView">
        <Grid container item mt={2} direction={"row"} alignContent={"left"}>
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

        <Grid
          container
          alignContent={"left"}
          mt={2}
        >
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
