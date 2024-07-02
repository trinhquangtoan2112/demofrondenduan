import axios from "axios";

const API_URL = "https://localhost:7094/";
const TOKEN = "TOKEN";
class SetUpAxios {
    constructor() {
        this.axiosCreate = axios.create({
            baseURL: API_URL,
            timeout: 60000
        });
    }
    get = async (url, params) => {

        console.log(params)
        return this.axiosCreate.get(url
            , {
                params
            }


        )
    }
    post = async (url, data) => {
        return this.axiosCreate.post(url, data)
    }
    delete = async (url, data, params) => {
        return this.axiosCreate.delete(url, data)
    }
    put = async (url, data, params) => {
        console.log(params)
        return this.axiosCreate.put(url, data, { params })
    }
    getToken = async (url, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };

        return this.axiosCreate.get(url, {
            params: updatedParams,
        })
    }
    postToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.post(url, data, {
            params: updatedParams,
        })
    }
    deleteToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.delete(url, data, {
            params: updatedParams,
        })
    }
    putToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.put(url, data, {
            params: updatedParams,
        })
    }

}

export const apiKey = new SetUpAxios();