import { CategoryDto } from "data/dto/CategoryDto"
import { Api } from "./config/AxiosConfig"

const CATEGORY_ENDPOINT = "/category"

export function CategoryApi() {
  const create = async (category: CategoryDto) => {
    return Api.post(CATEGORY_ENDPOINT, category)
  }

  const getAll = async () => {
    return Api.get(CATEGORY_ENDPOINT)
  }

  return {
    create,
    getAll,
  }
}
