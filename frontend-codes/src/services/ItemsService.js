import axios from "axios";

const ROUTE = "/api/items"

export const getItems = (cid) => {
    if (!cid) {
        return axios.get(ROUTE)
    } else {
        return axios.get(`${ROUTE}/${cid}`)
    }
}


export const createItem = (items) => {
    return axios.post(`${ROUTE}/add`, items)
}

export const deleteItems = (id) => {
    return axios.post(`${ROUTE}/${id}`)
}