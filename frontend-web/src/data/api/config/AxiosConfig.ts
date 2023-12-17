import { BASE_URL } from "requests"
import axios from "axios"

const BaseApi = axios.create({
  baseURL: BASE_URL,
})

export default BaseApi
