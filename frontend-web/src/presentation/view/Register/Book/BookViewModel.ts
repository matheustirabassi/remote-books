import { ROUTES } from "Routes"
import { AuthorApi } from "data/api/AuthorApi"
import { BookApi } from "data/api/BookApi"
import { CategoryApi } from "data/api/CategoryApi"
import { CollectionApi } from "data/api/CollectionApi"
import { AuthorDto } from "data/dto/AuthorDto"
import { BookDto } from "data/dto/BookDto"
import { CategoryDto } from "data/dto/CategoryDto"
import { CollectionDto } from "data/dto/CollectionDto"
import { ErrorFieldMessage } from "data/types/ErrorFieldMessage"
import { ValidationStandardError } from "data/types/ValidationStandardError"
import { ViewState } from "data/types/ViewState"
import { LanguageConstants } from "enums/Constants"
import { State } from "enums/ViewStateEnum"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

interface BookViewModelProps {
  BookApi: ReturnType<typeof BookApi>
  CategoryApi: ReturnType<typeof CategoryApi>
  CollectionApi: ReturnType<typeof CollectionApi>
  AuthorApi: ReturnType<typeof AuthorApi>
}

export default function BookViewModel({
  BookApi: bookApi,
  CategoryApi: categoryApi,
  CollectionApi: collectionApi,
  AuthorApi: authorApi,
}: BookViewModelProps) {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [viewState] = useState<ViewState>(new ViewState())

  const [title, setTitle] = useState<string>("")
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("")
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false)

  const [sinopse, setSinopse] = useState<string>("")
  const [sinopseErrorMessage, setSinopseErrorMessage] = useState<string>("")
  const [invalidSinopse, setInvalidSinopse] = useState<boolean>(false)

  const [releaseDate, setReleaseDate] = useState<Date>(new Date())

  const [accessLink, setAccessLink] = useState<string>("")
  const [accessLinkErrorMessage, setAccessLinkErrorMessage] = useState<string>("")
  const [invalidAccessLink, setInvalidAccessLink] = useState<boolean>(false)

  const [imageLink, setImageLink] = useState<string>("")
  const [imageLinkErrorMessage, setImageLinkErrorMessage] = useState<string>("")
  const [invalidImageLink, setInvalidImageLink] = useState<boolean>(false)

  const [bookWasSaved, setBookWasSaved] = useState<boolean>(false)

  const [errors, setErrors] = useState<ErrorFieldMessage[]>([])

  const [authors, setAuthors] = useState<AuthorDto[]>([])

  const [authorSelected, setAuthorSelected] = useState<number>()

  const [categories, setCategories] = useState<CategoryDto[]>([])

  const [categorySelected, setCategorySelected] = useState<number>()

  const [collections, setCollections] = useState<CollectionDto[]>([])

  const [collectionSelected, setCollectionSelected] = useState<number>()

  useEffect(() => {
    if (errors.length === 0) {
      return
    }

    errors.forEach((error) => enqueueSnackbar(t(error.message), { variant: "error" }))

    setErrors([])
  }, [errors])

  useEffect(() => {
    if (bookWasSaved === false) {
      return
    }

    enqueueSnackbar(t(LanguageConstants.SAVED_CONTENT), { variant: "success" })
    navigate(ROUTES.HOME)
  }, [bookWasSaved])

  useEffect(() => {
    getAllAuthors()
  }, [undefined])

  useEffect(() => {
    getAllCategories()
  }, [undefined])

  useEffect(() => {
    getAllCollections()
  }, [undefined])

  function getAllAuthors() {
    viewState.setViewState(State.LoadingState)

    authorApi
      .getAll()
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }

  function getAllCategories() {
    viewState.setViewState(State.LoadingState)

    categoryApi
      .getAll()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }

  function getAllCollections() {
    viewState.setViewState(State.LoadingState)

    collectionApi
      .getAll()
      .then((response) => {
        setCollections(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }

  function create() {
    viewState.setViewState(State.LoadingState)

    bookApi
      .create(
        new BookDto(
          title,
          imageLink,
          accessLink,
          releaseDate,
          authorSelected!!,
          categorySelected,
          collectionSelected,
          sinopse
        )
      )
      .then((response) => {
        setBookWasSaved(true)
      })
      .catch((error) => {
        if (error.response === undefined) {
          const codeResponse: string = t(error.code)
          setErrors([new ErrorFieldMessage("", codeResponse)])

          return
        }

        const standardError = error.response.data as ValidationStandardError

        console.error(standardError)

        setErrors(standardError.errors)
      })
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }

  function save() {
    create()
  }

  useEffect(() => {
    if (title === "") {
      clearTitleError()

      return
    } else if (!title.isName()) {
      setInvalidTitle(true)
      setTitleErrorMessage(t(LanguageConstants.INVALID_FIELD)!!)

      return
    }

    clearTitleError()
  }, [title])

  useEffect(() => {
    if (sinopse === "") {
      clearSinopseError()

      return
    } else if (!sinopse.isName()) {
      setInvalidSinopse(true)
      setSinopseErrorMessage(t(LanguageConstants.INVALID_FIELD)!!)

      return
    }

    clearSinopseError()
  }, [sinopse])

  useEffect(() => {
    if (imageLink === "") {
      clearImageLinkError()

      return
    } else if (!imageLink.isName()) {
      setInvalidImageLink(true)
      setImageLinkErrorMessage(t(LanguageConstants.INVALID_FIELD)!!)

      return
    }

    clearImageLinkError()
  }, [imageLink])

  useEffect(() => {
    if (accessLink === "") {
      clearAccessLinkError()

      return
    } else if (!accessLink.isName()) {
      setInvalidAccessLink(true)
      setAccessLinkErrorMessage(t(LanguageConstants.INVALID_FIELD)!!)

      return
    }

    clearAccessLinkError()
  }, [accessLink])

  return {
    authors,
    viewState,
    authorSelected,
    setAuthorSelected,
    categories,
    setCategories,
    categorySelected,
    setCategorySelected,
    collectionSelected,
    setCollectionSelected,
    collections,
    setCollections,
    save,
    title,
    setTitle,
    invalidTitle,
    titleErrorMessage,
    setTitleErrorMessage,
    sinopse,
    setSinopse,
    sinopseErrorMessage,
    setSinopseErrorMessage,
    invalidSinopse,
    imageLink,
    setImageLink,
    imageLinkErrorMessage,
    setImageLinkErrorMessage,
    invalidImageLink,
    releaseDate,
    setReleaseDate,
    bookWasSaved,
    errors,
    accessLink,
    setAccessLink,
    accessLinkErrorMessage,
    setAccessLinkErrorMessage,
    invalidAccessLink,
  }

  function clearTitleError() {
    setInvalidTitle(false)
    setTitleErrorMessage("")
  }

  function clearSinopseError() {
    setInvalidSinopse(false)
    setSinopseErrorMessage("")
  }

  function clearImageLinkError() {
    setInvalidImageLink(false)
    setImageLinkErrorMessage("")
  }

  function clearAccessLinkError() {
    setInvalidAccessLink(false)
    setAccessLinkErrorMessage("")
  }
}
