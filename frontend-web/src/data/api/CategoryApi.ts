import { CategoryDto } from "data/dto/CategoryDto"
import { Api } from "./config/AxiosConfig"

const CATEGORY_ENDPOINT = "/category"

const createCategory = async (category: CategoryDto) => {
  return Api.post(CATEGORY_ENDPOINT, category)
}

export const CategoryApi = {
  createCategory,
}
