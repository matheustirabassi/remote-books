import { AuthorDto } from "data/dto/AuthorDto"
import { Api } from "./config/AxiosConfig"

const AUTHOR_ENDPOINT = "/author"

const create = async (author: AuthorDto) => {
  return Api.post(AUTHOR_ENDPOINT, author)
}

const getAll = async() => {
  return Api.get(AUTHOR_ENDPOINT)
}

export const AuthorApi = {
  create,
  getAll
}