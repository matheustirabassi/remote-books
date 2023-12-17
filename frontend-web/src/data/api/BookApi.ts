import { BookDto } from "data/dto/BookDto"
import { Api } from "./config/AxiosConfig"

const BOOK_ENDPOINT = "/book"

export function BookApi() {
  return {
    create(book: BookDto) {
      return Api.post(BOOK_ENDPOINT, book)
    },

    findAll() {
      return Api.get(BOOK_ENDPOINT)
    },
  }
}
