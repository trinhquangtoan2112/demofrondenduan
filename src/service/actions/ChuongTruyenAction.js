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