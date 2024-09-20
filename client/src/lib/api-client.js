// import { HOST } from "@/utils/constants"
import axios from "axios"

export const apiClient = axios.create({
    baseURL: "http://localhost:8747",
})
