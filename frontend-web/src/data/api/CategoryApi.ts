import { CategoryDto } from "data/dto/CategoryDto"
import { CollectionDto } from "data/dto/CollectionDto"
import { Api } from "./config/AxiosConfig"

const CATEGORY_ENDPOINT = "/category"
const COLLECTION_ENDPOINT = "/collection"

const createCategory = async (category: CategoryDto) => {
  return Api.post(CATEGORY_ENDPOINT, category)
}


const createCollection = async (collection: CollectionDto) => {
  return Api.post(COLLECTION_ENDPOINT, collection)
}


export const CategoryApi = {
  createCategory,
  createCollection
}