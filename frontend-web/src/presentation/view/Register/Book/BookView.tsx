import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { LanguageConstants } from "enums/Constants"
import { BasicDatePicker } from "presentation/components/BasicDatePicker"
import { LoadingState } from "presentation/components/States/LoadingState"
import { useTranslation } from "react-i18next"
import { BookViewModel } from "./BookViewModel"
interface BookViewProps {
  viewModel: BookViewModel
}

export default function BookView({ viewModel }: BookViewProps) {
  const { t } = useTranslation()

  return (
    <>
      <Grid container id="loadingView" justifyContent="center" style={{ display: "none" }}>
        <Grid item>
          <LoadingState />
        </Grid>
      </Grid>

      <Grid
        container
        id="contentView"
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container item justifyContent={"inherit"} xs={4}>
          <Grid item>
            <Grid item xs={12}>
              <TextField
                label={t(LanguageConstants.TITLE)}
                name="title"
                value={viewModel.title}
                onChange={(event) => {
                  viewModel.setTitle(event.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField
                label={t(LanguageConstants.SYNOPSIS)}
                name="synopsis"
                value={viewModel.sinopse}
                onChange={(event) => {
                  viewModel.setSinopse(event.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} mt={1}>
              <TextField
                label={t(LanguageConstants.ACCESS_LINK)}
                name="accessLink"
                value={viewModel.accessLink}
                onChange={(event) => {
                  viewModel.setAccessLink(event.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField
                label={t(LanguageConstants.IMAGE_LINK)}
                name="imageLink"
                value={viewModel.imageLink}
                onChange={(event) => {
                  viewModel.setImageLink(event.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} mt={1}>
              <BasicDatePicker
                label={t(LanguageConstants.RELEASE_DATE)}
                value={viewModel.releaseDate}
                onChange={viewModel.setReleaseDate}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Grid item xs={12} ml={2}>
              <FormControl required sx={{ minWidth: 120 }}>
                <InputLabel id="inputLabelAuthorId">{t(LanguageConstants.AUTHOR)}</InputLabel>
                <Select
                  labelId="authorSelect"
                  id="authorSelectId"
                  value={viewModel.authorSelected}
                  label={t(LanguageConstants.AUTHOR)}
                  onChange={(e) => viewModel.setAuthorSelected(e.target.value as number)}
                >
                  <MenuItem>{t(LanguageConstants.SELECT)}</MenuItem>

                  {viewModel.authors.map((author) => (
                    <MenuItem value={author.id} key={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} ml={2} mt={2}>
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
                  <MenuItem>{t(LanguageConstants.SELECT)}</MenuItem>

                  {viewModel.categories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {" "}
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} ml={2} mt={2}>
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
                  <MenuItem>{t(LanguageConstants.SELECT)}</MenuItem>

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

        <Grid item mt={2} xs={4}>
          <Button variant="contained" style={{ width: 300, height: 50 }} onClick={viewModel.save}>
            <Typography>{t(LanguageConstants.SAVE)}</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
