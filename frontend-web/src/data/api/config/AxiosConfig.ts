import { BASE_URL } from "requests"
import axios from "axios"

const Api = axios.create({
  baseURL: BASE_URL,
})

export default Api
