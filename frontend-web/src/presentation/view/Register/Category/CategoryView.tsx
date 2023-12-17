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

interface CategoryViewProps {
  viewModel: ReturnType<typeof CategoryViewModel>
}

export default function CategoryView({ viewModel }: CategoryViewProps) {
  const { t } = useTranslation()

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

      <Grid container id="contentView" direction={"column"} alignItems={"center"}>
        <Grid item xs={12}>
          <Grid item>
            <TextField
              label={t(LanguageConstants.NAME)}
              sx={{ width: 300 }}
              name="category_name"
              value={viewModel.name}
              error={viewModel.nameHasError}
              helperText={viewModel.nameErrorText}
              onChange={viewModel.onSetName}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Grid item>
            <Button
              variant="contained"
              sx={{ height: 50, width: 300 }}
              onClick={viewModel.saveCategory}
            >
              <Typography>{t(LanguageConstants.SAVE)}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
