import axios from "axios";

const api = axios.create({
   baseURL:"https://localhost:3004/categories"
})

export default api