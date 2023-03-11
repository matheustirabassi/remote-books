import axios from "axios"

const Api = axios.create({
  baseURL: "http://matheustir.ddns.net:8081",
})

export { Api }
