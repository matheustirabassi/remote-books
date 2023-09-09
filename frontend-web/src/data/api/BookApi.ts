import { AxiosResponse } from "axios"
import { BookDto } from "data/dto/BookDto"
import { Api } from "./config/AxiosConfig"

const BOOK_ENDPOINT = "/book"

export interface BookApi {
  create(book: BookDto): Promise<AxiosResponse<any, any>>;
  findAll(): Promise<AxiosResponse<any, any>>
}

export function BookApiImpl() {
  return {
    create(book: BookDto) {
      return Api.post(BOOK_ENDPOINT, book)
    },

    findAll() {
      return Api.get(BOOK_ENDPOINT)
    },
  }
}