import { BookDto } from "data/dto/BookDto"
import { Api } from "./config/AxiosConfig"
import { BookPage } from "data/dto/BookPage"

const BOOK_ENDPOINT = "/book"

const create = async (book: BookDto) => {
  return Api.post(BOOK_ENDPOINT, book)
}

const findAll = async () => {
  return (await Api.get(BOOK_ENDPOINT))
}

export const BookApi = {
  create,
  findAll
}