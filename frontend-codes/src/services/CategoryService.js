import axios from "axios";

const ROUTE = "/api/categories"

export const getCategories = () => {
    return axios.get(ROUTE)
}

 export const createCategory = (category) => {
    return axios.post(`${ROUTE}/add`, category)
 }

  export const deleteCategory = (id) => {
    return axios.post(`${ROUTE}/${id}`)
 }