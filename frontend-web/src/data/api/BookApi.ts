import { BookDto } from "data/dto/BookDto"
import { Api } from "./config/AxiosConfig"

const BOOK_ENDPOINT = "/book"

const create = async (book: BookDto) => {
  return Api.post(BOOK_ENDPOINT, book)
}

export const BookApi = {
  create
}