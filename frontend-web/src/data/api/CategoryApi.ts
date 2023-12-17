import { CategoryDto } from "data/dto/CategoryDto"
import { AxiosInstance } from "axios"

const CATEGORY_ENDPOINT = "/category"
interface CategoryApiProps {
  BaseApi: AxiosInstance
}

export function CategoryApi({ BaseApi: api }: CategoryApiProps) {
  const create = async (category: CategoryDto) => {
    return api.post(CATEGORY_ENDPOINT, category)
  }

  const getAll = async () => {
    return api.get(CATEGORY_ENDPOINT)
  }

  return {
    create,
    getAll,
  }
}
