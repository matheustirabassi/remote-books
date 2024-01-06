import { AxiosInstance } from "axios"
import { BookDto } from "data/dto/BookDto"

const BOOK_ENDPOINT = "/book"

interface BookApiProps {
  BaseApi: AxiosInstance
}

export function BookApi({ BaseApi: api }: BookApiProps) {
  return {
    create(book: BookDto) {
      return api.post(BOOK_ENDPOINT, book)
    },

    findAll(page: number) {
      return api.get(`${BOOK_ENDPOINT}?page=${page}`)
    },
    findById(id: number) {
      return api.get(`${BOOK_ENDPOINT}/${id}`)
    }
  }
}
