import axios from "axios";

const API_URL = "https://demodoan120240809201623.azurewebsites.net/";
const TOKEN = "TOKEN";
class SetUpAxios {
    constructor() {
        this.axiosCreate = axios.create({
            baseURL: API_URL,
            timeout: 60000
        });
    }
    get = async (url, params) => {
        return this.axiosCreate.get(url
            , {
                params
            }
        )
    }
    post = async (url, data, params) => {
        return this.axiosCreate.post(url, data, {
            params
        })
    }
    delete = async (url, params) => {
        return this.axiosCreate.delete(url, { params })
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
    deleteToken = async (url, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        console.log(updatedParams)
        return this.axiosCreate.delete(url, {
            params: updatedParams,
        })
    }
    putToken = async (url, data, params) => {
        const updatedParams = await { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.put(url, data, {
            params: updatedParams,
        })
    }

    deleteToken2 = async (url, data, params) => {
        const updatedParams = { ...params, 'token': 'Bearer ' + localStorage.getItem(TOKEN) };
        return this.axiosCreate.delete(url, { data, params: updatedParams });
    }

}

export const apiKey = new SetUpAxios();