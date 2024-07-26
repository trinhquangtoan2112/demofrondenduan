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


        return result;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return false;
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
        message.error("Lỗi xảy ra")
        return error.response

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


export const GetChuongTruyenTheoIDTruyen = async (id) => {
    const data = {
        maTruyen: id
    }

    console.log(data)
    try {
        let result = await apiKey.get("Chuongtruyens/DanhsachchuongTacGia", data)

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return error.response

    }
}
export const GetChuongTruyenTheoIDTruyen1 = async (id) => {
    const data = {
        id: id
    }

    console.log(data)
    try {
        let result = await apiKey.get("Chuongtruyens/DanhsachchuongID", data)

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)

        return error.response

    }
}
export const GetCHiTietChuongTruyen = async (id) => {
    const data = {
        maChuong: id
    }

    console.log(data)
    try {
        let result = await apiKey.get("Chuongtruyens/GetChiTietChuong", data)

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return error.response

    }
}
export const GetChiTietChuongAdmin = async (id) => {
    const data = {
        maChuong: id
    }

    console.log(data)
    try {
        let result = await apiKey.get("Chuongtruyens/GetChiTietChuongAdmin", data)

        if (result.status === 200) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return error.response

    }
}
export const SuaChuongTruyenAction = async (id, data) => {
    const data1 = {
        id: id
    }
    try {


        let result = await apiKey.put("Chuongtruyens/CapNhapChuongTruyen", data, data1)
        console.log(result)
        if (result.status === 200)
            return true;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
    }
}

export const DangChuongTruyenAction = async (data) => {
    console.log(data)
    try {


        let result = await apiKey.post("Chuongtruyens", data)
        console.log(result)
        if (result.status === 201)
            return result;

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return false
    }
}


//Adminb

export const GetDanhSachTruyenAdmin = async () => {
    try {
        const result = await apiKey.get("api/Truyens/GetDSTruyenAdmin");
        console.log(result)
        return result.data.data;
    } catch (error) {
        return null;
    }
}

export const GetDanhSachTruyenCanDuyet = async () => {
    try {
        const result = await apiKey.get("api/Truyens/DanhsachTruyenCanDuyet");
        console.log(result)

        return result.data.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const DuyetTruyenaction = async (id) => {
    const data = {
        maTruyen: id
    }
    try {
        const result = await apiKey.put("api/Truyens/DuyetTruyen", null, data);
        console.log(result)

        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const TimKiemTruyenAcion = async (tenTruyen) => {
    const data = {
        tenTruyen
    }
    try {
        const result = await apiKey.get("api/Truyens/GetTruyenTheoTenTruyen", data);
        console.log(result)

        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const GetTruyenTheoIDNguoiDung = async (id) => {

    try {
        if (localStorage.getItem("TOKEN")) {
            let result = await apiKey.getToken("api/Truyens/GetTruyenTheoIDNguoiDung")
            if (result.status === 200) {
                return result.data
            }
        }

    } catch (error) {
        console.log(error)
        message.error("Lỗi xảy ra")
        return false

    }
}