import { CategoryApi } from "data/api/CategoryApi"
import { CollectionDto } from "data/dto/CollectionDto"
import { StandardError } from "data/types/StandardError"
import { ViewState } from "data/types/ViewState"
import { LanguageConstants } from "enums/Constants"
import { States } from "enums/ViewStateEnum"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

export default function CategoryViewModel() {
  const { t } = useTranslation()

  const [name, setName] = useState<string>("")
  const [nameHasError, setNameHasError] = useState<boolean>(false)
  const [nameErrorText, setNameErrorText] = useState<string>("")

  const [categoryWasSaved, setCollectionWasSaved] = useState<boolean>(false)

  const [viewState] = useState<ViewState>(new ViewState())

  const [errorMessage, setErrorMessage] = useState<string>("")

  function onSetName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const nameText: string = event.target.value

    setName(nameText)

    setErrorMessage("")
  }

  function validateName() {
    if (!name.isName()) {
      setNameHasError(true)
      setNameErrorText(t(LanguageConstants.INVALID_FIELD).toString())

      return false
    }

    setNameErrorText("")
    setNameHasError(false)

    return true
  }

  function saveCollection() {
    if (!validateName()) {
      return
    }

    viewState.setViewState(States.LoadingState)

    createCollection(new CollectionDto(name))
  }

  function createCollection(newCollection: CollectionDto) {
    CategoryApi.createCollection(newCollection)
      .then((response) => {
        console.log(response)

        setCollectionWasSaved(true)
      })
      .catch((error) => {
        if (error.response === undefined) {
          const codeResponse: string = t(error.code)
          setErrorMessage(codeResponse)

          return
        }

        const responseData = error.response.data

        const standardError = responseData as StandardError
        console.error(standardError)

        setErrorMessage(standardError.message)
      })
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  return {
    name,
    onSetName,
    nameHasError,
    validateName,
    nameErrorText,
    saveCollection,
    categoryWasSaved,
    setCollectionWasSaved,
    viewState,
    errorMessage,
  }
}
