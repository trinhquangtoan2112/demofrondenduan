import { message } from "antd";
import { apiKey } from "../http";

export const themBanThaoAction = async (data) => {
    console.log(data);
    try {
        const response = await apiKey.post(`api/Banthaos`, data);
        console.log(response);
        if (response.status === 200) {
            message.success("Thành công");
            return response.data;
        }
    } catch (error) {

        return false
    }
};
export const suaBanThaoAction = async (data, id) => {
    try {
        const response = await apiKey.put(`api/Banthaos`, data, { id });
        if (response.status === 200) {
            message.success("Thành công");
            return response.data;
        }
    } catch (error) {

        return false
    }
};
export const xoaBanThaoAction = async (id) => {
    const data = {
        id
    }

    try {
        const response = await apiKey.delete(`api/Banthaos`, data);
        if (response.status === 200) {
            message.success("Thành công");
            return response.data;
        }
    } catch (error) {

        return false
    }
};
export const getDanhSachBanThaoTheoTruyenAction = async (id) => {
    const params = {
        id
    }
    console.log(params)
    try {
        const response = await apiKey.get(`api/Banthaos/DanhSachBanThaoTheoTruyen`, params);
        console.log(response.data);
        if (response.status === 200) {

            return response.data;
        }
    } catch (error) {

        return false
    }
};
export const getLayChiTietBanThaoAction = async (id) => {
    const params = {
        id
    }
    try {
        const response = await apiKey.get(`api/Banthaos/LayChiTietBanThao`, params);
        console.log(response.data)
        if (response.status === 200) {
            message.success("Thành công");
            return response.data;
        }
    } catch (error) {

        return false
    }
};