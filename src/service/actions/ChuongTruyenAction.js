import { apiKey } from "../http";

export const GetDanhSachChuongCanDuyet = async () => {
    try {
        const result = await apiKey.get("Chuongtruyens/DanhSachChuongTruyenCanDuyet");
        console.log(result)

        return result.data.data
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const DuyetChuongAction = async (id) => {
    const data = {
        maChuong: id
    }
    try {
        const result = await apiKey.put("Chuongtruyens/DuyetChuong", null, data);
        console.log(result)

        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const AnChuongAction = async (id) => {
    const data = {
        id: id
    }
    try {
        const result = await apiKey.put("Chuongtruyens/AnChuongTruyen", null, data);
        console.log(result)
        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const HienChuongAction = async (id) => {
    const data = {
        id: id
    }
    try {
        const result = await apiKey.put("Chuongtruyens/HienChuong", null, data);
        console.log(result)

        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}


//admin 

export const GetDanhSachChuongAdmin = async (id) => {
    const data = {
        id
    }
    try {
        const result = await apiKey.get("Chuongtruyens/DanhsachchuongID", data);
        console.log(result)
        console.log(result)
        return result.data
    } catch (error) {
        console.log(error);
        return false;
    }
}