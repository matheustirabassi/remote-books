import { CategoryApi } from "data/api/CategoryApi"
import { CategoryDto } from "data/dto/CategoryDto"
import { ErrorState } from "data/types/ErrorState"
import { StandardError } from "data/types/StandardError"
import { LanguageConstants, RegexConstants } from "enums/Constants"
import { enqueueSnackbar } from "notistack"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

export default function CategoryViewModel() {
  const { t } = useTranslation()

  const [name, setName] = useState<string>("")
  const [nameHasError, setNameHasError] = useState<boolean>(false)
  const [nameErrorText, setNameErrorText] = useState<string>("")

  const [categoryWasSaved, setCategoryWasSaved] = useState<boolean>(false)

  const [isLoading, setLoadingState] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string>("")

  function onSetName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const nameText: string = event.target.value

    setName(nameText)

    setErrorMessage("")
  }

  function validate() {
    return validateName()

    return true
  }

  function validateName() {
    if (!name.match(RegexConstants.NAME_REGEX)) {
      setNameHasError(true)
      setNameErrorText(t(LanguageConstants.INVALID_FIELD).toString())

      return false
    }

    setNameErrorText("")
    setNameHasError(false)
    
    return true
  }

  function saveCategory() {
    if (!validate()) {
      return
    }

    setLoadingState(true)

    const newCategory = new CategoryDto(name)
    CategoryApi.createCategory(newCategory)
      .then((response) => {
        console.log(response)

        setCategoryWasSaved(true)
      })
      .catch((error) => {
        const responseData = error.response.data

        const standardError = responseData as StandardError
        console.error(standardError)

        setErrorMessage(standardError.message)
      })
      .finally(() => {
        setLoadingState(false)
      })
  }

  return {
    name,
    onSetName,
    nameHasError,
    validate,
    nameErrorText,
    saveCategory,
    categoryWasSaved,
    setCategoryWasSaved,
    isLoading,
    errorMessage,
  }
}
