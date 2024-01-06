import { BookApi } from "data/api/BookApi"
import { BookDto } from "data/dto/BookDto"
import { ViewState } from "data/types/ViewState"
import { State } from "enums/ViewStateEnum"
import { useEffect, useState } from "react"

interface FormBookViewModelModelProps {
  BookApi: ReturnType<typeof BookApi>
}

export default function FormBookViewModel({ BookApi: bookApi }: FormBookViewModelModelProps) {
  const [viewState] = useState<ViewState>(new ViewState())

  const [bookDto, setBookDto] = useState<BookDto>()
  const [bookId, setBookId] = useState<number>()
  
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (!bookId) {
      return
    }

    viewState.setViewState(State.LoadingState)

    bookApi
      .findById(bookId)
      .then((response) => {
        setBookDto(response.data)
      })
      .catch((error) => {
      })
      .finally(() => {
        viewState.setViewState(State.ContentState)
      })
  }, [bookId])

  return {
    bookDto,
    setBookId,
    viewState,
  }
}
