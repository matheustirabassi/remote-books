import { CollectionDto } from "data/dto/CollectionDto"
import { AxiosInstance } from "axios"

const COLLECTION_ENDPOINT = "/collection"
interface CollectionApiProps {
  BaseApi: AxiosInstance
}

export function CollectionApi({ BaseApi: api }: CollectionApiProps) {
  const create = async (collection: CollectionDto) => {
    return api.post(COLLECTION_ENDPOINT, collection)
  }

  const getAll = async () => {
    return api.get(COLLECTION_ENDPOINT)
  }

  return { create, getAll }
}
