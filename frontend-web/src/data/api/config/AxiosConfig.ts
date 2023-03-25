import axios from "axios"
import { BASE_URL } from "requests"

const Api = axios.create({
  baseURL: BASE_URL,
})

export { Api }
