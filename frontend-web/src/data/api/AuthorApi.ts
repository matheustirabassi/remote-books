import { AuthorDto } from "data/dto/AuthorDto"
import BaseApi from "./config/AxiosConfig"
import { AxiosInstance } from "axios"

const AUTHOR_ENDPOINT = "/author"
interface AuthorApiProps {
  BaseApi: AxiosInstance
}

export function AuthorApi({ BaseApi: api }: AuthorApiProps) {
  const create = async (author: AuthorDto) => {
    return api.post(AUTHOR_ENDPOINT, author)
  }

  const getAll = async () => {
    return api.get(AUTHOR_ENDPOINT)
  }

  return {
    create,
    getAll,
  }
}
