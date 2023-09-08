import { BookApi } from "data/api/BookApi"
import { CategoryApi } from "data/api/CategoryApi"
import { BookPage } from "data/dto/BookPage"
import { ViewState } from "data/types/ViewState"
import { States } from "enums/ViewStateEnum"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function HomeViewModel() {
  const { t } = useTranslation()

  const [viewState] = useState<ViewState>(new ViewState(States.ContentState))

  const [errorMessage, setErrorMessage] = useState<string>("")

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
  
  function getBooks() {
    viewState.setViewState(States.LoadingState)

    BookApi.findAll()
      .then((response) => {
        setPage(response.data)
      })
      .catch((error) => {})
      .finally(() => {
        viewState.setViewState(States.ContentState)
      })
  }

  return {
    viewState,
    errorMessage,
    page,
    pageNumber,
    setPageNumber,
    getBooks
  }
}
