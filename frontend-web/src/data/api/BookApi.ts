import { AxiosInstance } from "axios"
import { BookDto } from "data/dto/BookDto"

const BOOK_ENDPOINT = "/book"

interface BookApiProps {
  Api: AxiosInstance
}

export function BookApi({ Api: api }: BookApiProps) {
  return {
    create(book: BookDto) {
      return api.post(BOOK_ENDPOINT, book)
    },

    findAll() {
      return api.get(BOOK_ENDPOINT)
    },
  }
}
