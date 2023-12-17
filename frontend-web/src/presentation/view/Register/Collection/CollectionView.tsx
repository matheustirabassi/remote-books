import { Button, Grid, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { ROUTES } from "Routes"
import { LanguageConstants } from "enums/Constants"
import { enqueueSnackbar } from "notistack"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import CollectionViewModel from "./CollectionViewModel"

interface CollectionViewProps {
  viewModel: ReturnType<typeof CollectionViewModel>
}

export default function CollectionView({ viewModel }: CollectionViewProps) {
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
    if (!viewModel.collectionWasSaved) {
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
        <Grid item>
          <TextField
            label={t(LanguageConstants.NAME)}
            name="collection_name"
            sx={{ width: 300 }}
            value={viewModel.name}
            error={viewModel.nameHasError}
            helperText={viewModel.nameErrorText}
            onChange={viewModel.onSetName}
          />
        </Grid>

        <Grid item mt={2}>
          <Button
            variant="contained"
            sx={{ width: 300, height: 50 }}
            onClick={viewModel.saveCollection}
          >
            <Typography>{t(LanguageConstants.SAVE)}</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
