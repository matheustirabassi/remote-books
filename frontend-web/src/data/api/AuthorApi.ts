import { AuthorDto } from "data/dto/AuthorDto"
import Api from "./config/AxiosConfig"
import { AxiosInstance } from "axios"

const AUTHOR_ENDPOINT = "/author"
interface AuthorApiProps {
  Api: AxiosInstance
}

export function AuthorApi({ Api: api }: AuthorApiProps) {
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
