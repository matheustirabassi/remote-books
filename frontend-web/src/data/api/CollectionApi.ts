import { CollectionDto } from "data/dto/CollectionDto"
import { Api } from "./config/AxiosConfig"

const COLLECTION_ENDPOINT = "/collection"

const create = async (collection: CollectionDto) => {
  return Api.post(COLLECTION_ENDPOINT, collection)
}

const getAll = async() => {
  return Api.get(COLLECTION_ENDPOINT)
}


export const CollectionApi = {
  create,
  getAll
}