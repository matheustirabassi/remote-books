import { BookApi } from "data/api/BookApi"
import { BookPage } from "data/dto/BookPage"
import { ViewState } from "data/types/ViewState"
import { State } from "enums/ViewStateEnum"
import { useEffect, useState } from "react"

interface HomeViewModelProps {
  BookApi: ReturnType<typeof BookApi>
}

export default function HomeViewModel({ BookApi: bookApi }: HomeViewModelProps) {
  const [viewState] = useState<ViewState>(new ViewState())

  const [pageNumber, setPageNumber] = useState(0)

  const [page, setPage] = useState<BookPage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 8,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  })

  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    viewState.setViewState(State.LoadingState)

    bookApi
      .findAll()
      .then((response) => {
        setPage(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }, [pageNumber])

  return { page }
}
