import { message } from "antd";
import { apiKey } from "../http"

export const GetChiTietChuongTruyenAction = async (id) => {
    console.log(id, "4142142")
    try {
        let result;
        if (localStorage.getItem("TOKEN")) {
            result = await apiKey.getToken("Chuongtruyens/GetChiTietChuong", id)
        } else {
            result = await apiKey.get("Chuongtruyens/GetChiTietChuong", id)

        }
        console.log(result)
        if (result.status === 200)
            return result

    } catch (error) {
        return error.response;

    }
}

export const DangTruyen = async (data) => {
    console.log(data)
    try {


        let result = await apiKey.post("api/Truyens", data)
        console.log(result)
        if (result.status === 201)
            return true;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}

export const GetThongTinTruyen = async (id) => {
    const data = {
        id: id
    }
    try {


        let result = await apiKey.get("api/Truyens/GetTruyenID", data)
        console.log(result)
        if (result.status === 200) {
            return result.data.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}
export const GetTruyenMain = async () => {
    try {
        let result = await apiKey.get("api/Truyens/TrangChu")

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}
export const SuaTruyen = async (id, data) => {
    const data1 = {
        id: id
    }
    try {


        let result = await apiKey.put("api/Truyens/SuaTruyen", data, data1)
        console.log(result)
        if (result.status === 201)
            return true;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}
export const GetChiTietChuongTruyen = async (id) => {
    const data = {
        id: id
    }
    try {


        let result = await apiKey.get("api/Truyens/GetTruyenID", data)
        console.log(result)
        if (result.status === 200) {
            return result.data.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}


export const GetTruyenTheoButDanh = async (id) => {
    const data = {
        id: id
    }
    try {
        let result = await apiKey.get("api/Truyens/GetTruyenTheoButDanh", data)

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}
export const AnTruyenAction = async (id) => {
    const data = {
        id: id
    }
    console.log(data)
    try {
        let result = await apiKey.put("api/Truyens/AnTruyen", null, data)

        if (result.status === 200) {
            return true
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}
export const HienTruyenAction = async (id) => {
    const data = {
        id: id
    }
    console.log(data)
    try {
        let result = await apiKey.put("api/Truyens/HienTruyen", null, data)

        if (result.status === 200) {
            return true
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}