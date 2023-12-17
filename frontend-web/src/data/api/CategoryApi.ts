import { CategoryDto } from "data/dto/CategoryDto"
import Api from "./config/AxiosConfig"
import { AxiosInstance } from "axios"

const CATEGORY_ENDPOINT = "/category"
interface CategoryApiProps {
  Api: AxiosInstance
}

export function CategoryApi({ Api: api }: CategoryApiProps) {
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
