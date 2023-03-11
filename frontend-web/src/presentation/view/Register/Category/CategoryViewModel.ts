import { LanguageConstants, RegexConstants } from "enums/Constants"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

export default function CategoryViewModel() {
  const { t } = useTranslation()

  const [name, setName] = useState<String>("")
  const [nameHasError, setNameHasError] = useState<boolean>(false)
  const [nameErrorText, setNameErrorText] = useState<String>("")

  const [categoryWasSaved, setCategoryWasSaved] = useState<boolean>(false)

  function onSetName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const nameText: String = event.target.value

    setName(nameText)
  }

  function validate() {
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

    setCategoryWasSaved(true)
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
  }
}
