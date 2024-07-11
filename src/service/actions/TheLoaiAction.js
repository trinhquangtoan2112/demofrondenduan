import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured


// Function to get a user's list of pseudonyms
export const layDanhSachTheloai = async () => {
    try {
      const response = await apiKey.getToken(`/api/Theloais`);
      if (response.status === 200) { // OK
        return response.data.data;
      } else {
        message.error(`Lấy danh sách thất bại: ${response.data.message}`);
      }
    } catch (error) {
      message.error(`Lấy danh sách thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to add a pseudonym
export const themTheLoai = async (theloai) => {
    try {
      const response = await apiKey.postToken(`/api/Theloais`, theloai);
      if (response.status === 200) { // Created
        message.success("Thêm thành công");
        return response.data;
      }
    } catch (error) {
      message.error(`Thêm thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

      // Function to add a pseudonym
export const suaTheLoai = async (theloai) => {
    console.log(theloai)
    try {
        const response = await apiKey.putToken(`/api/Theloais`, theloai);
      if (response.status === 200) { // Created
        message.success("Sửa thành công");
        return response.data;
      }
    } catch (error) {
      message.error(`Sửa thất bại: ${error.response?.data?.message || error.message}`);
    }
  };

    // Function to add a pseudonym
export const xoaTheLoai = async (id) => {
    try {
        const response = await apiKey.deleteToken2(`/api/Theloais/${id}`);
      if (response.status === 204) { // Created
        message.success("Xóa thành công");
        return response.data;
      }
    } catch (error) {
      message.error(`Xóa thất bại: ${error.response?.data?.message || error.message}`);
    }
  };