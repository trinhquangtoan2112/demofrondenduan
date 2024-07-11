import { message } from "antd";
import { apiKey } from "../http";

export const GetButDanhTheoTokenAction = async () => {
    try {


        let result = await apiKey.getToken("api/Butdanhs/DanhSachButDanhTheoNguoiDung")
        console.log(result)
        if (result.status === 200)
            return result.data;

    } catch (error) {
        message.error("Lỗi xảy ra")
        return error.response

    }
}

export const ThemButDanhAction = async (data) => {
    try {
        let result = await apiKey.postToken("api/Butdanhs/Thembutdanh", data)

    } catch (error) {
        console.log(error)
    }
}