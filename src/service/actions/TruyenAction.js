import { message } from "antd";
import { apiKey } from "../http"

export const GetChiTietChuongTruyenAction = async (id) => {
    console.log(id)
    try {
        let result;
        if (localStorage.getItem("TOKEN")) {
            result = await apiKey.getToken("Chuongtruyens/GetChiTietChuong", id)

        } else {
            result = await apiKey.get("Chuongtruyens/GetChiTietChuong", id)
            console.log("kotoken")
        }
        if (result.status === 200)
            return result.data.data;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}