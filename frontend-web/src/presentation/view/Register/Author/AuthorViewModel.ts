import { AuthorApi } from "data/api/AuthorApi"
import { AuthorDto } from "data/dto/AuthorDto"
import { ValidationStandardError } from "data/types/ValidationStandardError"
import { ViewState } from "data/types/ViewState"
import { LanguageConstants } from "enums/Constants"
import { States } from "enums/ViewStateEnum"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

export default function AuthorViewModel() {
  const { t } = useTranslation()

  const [name, setName] = useState<string>("")
  const [nameErrorText, setNameErrorText] = useState<string>()

  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState<string>()

  const [authorWasSaved, setAuthorWasSaved] = useState<boolean>(false)

  const [viewState] = useState<ViewState>(new ViewState(States.ContentState))

  const [errorMessage, setErrorMessage] = useState<string>("")

  function onSetName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const nameText: string = event.target.value

    setName(nameText)

    setErrorMessage("")
  }

  function saveAuthor() {
    console.log(validate())

    if (!validate()) {
      return
    }

    viewState.setViewState(States.LoadingState)

    createAuthor(new AuthorDto(name, dateOfBirth!!))
  }

  function validate() {
    validateName()
    validateDateOfBirth()

    if (!nameErrorText?.isEmpty()) {
      return false
    }

    if (!dateOfBirthErrorText?.isEmpty()) {
      return false
    }

    return true
  }

  function validateName() {
    if (!name.isName()) {
      setNameErrorText(t(LanguageConstants.INVALID_FIELD).toString())

      return
    }

    setNameErrorText("")
  }

  function validateDateOfBirth() {
    if (dateOfBirth === undefined) {
      setDateOfBirthErrorText(t(LanguageConstants.INVALID_FIELD).toString())

      return
    }

    setDateOfBirthErrorText("")
  }

  function createAuthor(newAuthor: AuthorDto) {
    AuthorApi.create(newAuthor)
      .then((response) => {
        console.log(response)

        setAuthorWasSaved(true)
      })
      .catch((error) => {
        if (error.response === undefined) {
          const codeResponse: string = t(error.code)
          setErrorMessage(codeResponse)

          return
        }

        const responseData = error.response.data

        const standardError = responseData as ValidationStandardError

        console.error(standardError)

        let errorText: string = ""
        if (standardError.errors.length > 0) {
          standardError.errors.forEach((error) => {
            errorText += t(error.message) + ";"
          })
        } else {
          errorText = standardError.message
        }

        setErrorMessage(errorText)
      })
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  return {
    name,
    onSetName,
    validateName,
    nameErrorText,
    saveAuthor,
    authorWasSaved,
    setAuthorWasSaved,
    viewState,
    errorMessage,
    dateOfBirth,
    setDateOfBirth,
    validateDateOfBirth,
    dateOfBirthErrorText,
  }
}
