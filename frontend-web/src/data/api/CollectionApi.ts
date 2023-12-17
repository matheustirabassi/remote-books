import { CollectionDto } from "data/dto/CollectionDto"
import { Api } from "./config/AxiosConfig"

const COLLECTION_ENDPOINT = "/collection"

export function CollectionApi() {
  const create = async (collection: CollectionDto) => {
    return Api.post(COLLECTION_ENDPOINT, collection)
  }

  const getAll = async () => {
    return Api.get(COLLECTION_ENDPOINT)
  }

  return { create, getAll }
}
