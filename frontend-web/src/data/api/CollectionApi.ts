import { CollectionDto } from "data/dto/CollectionDto"
import Api from "./config/AxiosConfig"
import { AxiosInstance } from "axios"

const COLLECTION_ENDPOINT = "/collection"
interface CollectionApiProps {
  Api: AxiosInstance
}

export function CollectionApi({ Api: api }: CollectionApiProps) {
  const create = async (collection: CollectionDto) => {
    return Api.post(COLLECTION_ENDPOINT, collection)
  }

  const getAll = async () => {
    return Api.get(COLLECTION_ENDPOINT)
  }

  return { create, getAll }
}
