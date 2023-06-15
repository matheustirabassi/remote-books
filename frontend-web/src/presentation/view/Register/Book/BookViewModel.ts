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
import { States } from "enums/ViewStateEnum"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function BookViewModel() {
  const { t } = useTranslation()

  const [viewState] = useState<ViewState>(new ViewState(States.ContentState))

  const [authors, setAuthors] = useState<AuthorDto[]>([])

  const [authorSelected, setAuthorSelected] = useState<number>(0)

  const [categories, setCategories] = useState<CategoryDto[]>([])

  const [categorySelected, setCategorySelected] = useState<number>(0)

  const [collections, setCollections] = useState<CollectionDto[]>([])

  const [collectionSelected, setCollectionSelected] = useState<number>(0)

  const [title, setTitle] = useState<string>("")

  const [sinopse, setSinopse] = useState<string>("")

  const [releaseDate, setReleaseDate] = useState<Date>(new Date())

  const [imageLink, setImageLink] = useState<string>("")

  const [bookWasSaved, setBookWasSaved] = useState<boolean>(false)

  const [errors, setErrors] = useState<ErrorFieldMessage[]>([])

  function getAllAuthors() {
    viewState.setViewState(States.LoadingState)

    AuthorApi.getAll()
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  function getAllCategories() {
    viewState.setViewState(States.LoadingState)

    CategoryApi.getAll()
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  function getAllCollections() {
    viewState.setViewState(States.LoadingState)

    CollectionApi.getAll()
      .then((response) => {
        setCollections(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  function create() {
    viewState.setViewState(States.LoadingState)

    BookApi.create(
      new BookDto(
        title,
        imageLink,
        releaseDate,
        authorSelected,
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
      }).finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  function save() {
    create()
  }

  return {
    authors,
    getAllAuthors,
    viewState,
    authorSelected,
    setAuthorSelected,
    categories,
    categorySelected,
    setCategorySelected,
    getAllCategories,
    collectionSelected,
    setCollectionSelected,
    collections,
    getAllCollections,
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
    errors
  }
}
