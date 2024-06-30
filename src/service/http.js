import axios from "axios";

const API_URL = "https://localhost:7094/";

class SetUpAxios {
    constructor() {
        this.axiosCreate = axios.create({
            baseURL: API_URL,
            timeout: 60000
        });
    }
    get = async (url, data, params) => {
        return this.axiosCreate.get(url, {
        })
    }
    post = async (url, data, params) => {
        return this.axiosCreate.post(url, {
            data: data
        })
    }
    delete = async (url, data, params) => {
        return this.axiosCreate.delete(url, {
            data: data
        })
    }
    put = async (url, data, params) => {
        return this.axiosCreate.put(url, {
            data: data
        })
    }
    getToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.get(url, {
            params: updatedParams,
            data: data,
        })
    }
    postToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.post(url, {
            params: updatedParams,
            data: data
        })
    }
    deleteToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.delete(url, {
            params: updatedParams,
            data: data
        })
    }
    putToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.put(url, {
            params: updatedParams,
            data: data
        })
    }
}