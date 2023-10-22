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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

interface BookViewModelProps {
  bookApi: BookApi
}

export interface BookViewModel {
  viewState: ViewState
  authors: AuthorDto[]

  authorSelected: number | undefined
  setAuthorSelected: Dispatch<SetStateAction<number | undefined>>

  errors: ErrorFieldMessage[]
  bookWasSaved: boolean

  title: string
  setTitle: Dispatch<SetStateAction<string>>

  sinopse: string
  setSinopse: Dispatch<SetStateAction<string>>

  releaseDate: Date
  setReleaseDate: Dispatch<SetStateAction<Date>>

  accessLink: string
  setAccessLink: Dispatch<SetStateAction<string>>

  imageLink: string
  setImageLink: Dispatch<SetStateAction<string>>

  categories: CategoryDto[]
  setCategories: Dispatch<SetStateAction<CategoryDto[]>>
  categorySelected: number | undefined
  setCategorySelected: Dispatch<SetStateAction<number | undefined>>

  collections: CollectionDto[]
  setCollections: Dispatch<SetStateAction<CollectionDto[]>>
  collectionSelected: number | undefined
  setCollectionSelected: Dispatch<SetStateAction<number | undefined>>

  save: () => void
}

export default function BookViewModelImpl({ bookApi }: BookViewModelProps) {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [viewState] = useState<ViewState>(new ViewState())

  const [authors, setAuthors] = useState<AuthorDto[]>([])

  const [authorSelected, setAuthorSelected] = useState<number>()

  const [categories, setCategories] = useState<CategoryDto[]>([])

  const [categorySelected, setCategorySelected] = useState<number>()

  const [collections, setCollections] = useState<CollectionDto[]>([])

  const [collectionSelected, setCollectionSelected] = useState<number>()

  const [title, setTitle] = useState<string>("")

  const [sinopse, setSinopse] = useState<string>("")

  const [releaseDate, setReleaseDate] = useState<Date>(new Date())

  const [accessLink, setAccessLink] = useState<string>("")

  const [imageLink, setImageLink] = useState<string>("")

  const [bookWasSaved, setBookWasSaved] = useState<boolean>(false)

  const [errors, setErrors] = useState<ErrorFieldMessage[]>([])

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

    AuthorApi.getAll()
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

    CategoryApi.getAll()
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

    CollectionApi.getAll()
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
          accessLink,
          imageLink,
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
    sinopse,
    setSinopse,
    imageLink,
    setImageLink,
    releaseDate,
    setReleaseDate,
    bookWasSaved,
    errors,
    accessLink,
    setAccessLink
  }
}
