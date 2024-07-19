import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured
// Function to add a pseudonym
export const themdanhgiatruyen = async (danhgia) => {
  try {
    const response = await apiKey.postToken(`/api/Danhgias`, danhgia);
    if (response.status === 200) { // Created
      message.success("Đánh giá truyện thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to fetch reviews with login status check
export const layDSDanhGia = async (maTruyen) => {
  try {
      const response = await apiKey.getToken(`/api/Danhgias`, maTruyen);
      if (response.status === 200) {
        return response.data;
    }
  } catch (error) {
    message.error(`Failed to fetch reviews: ${error.response?.data?.message || error.message}`);
  }
};

// Function to fetch reviews with login status check
export const DsDanhGiaChuaDangNhap = async (maTruyen) => {
  try {
      const response = await apiKey.getToken(`/api/Danhgias/DsDanhGiaChuaDangNhap`, maTruyen);
      if (response.status === 200) {
        return response.data;
    }
  } catch (error) {
    message.error(`Failed to fetch reviews: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const xoaDanhGia = async (id) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Danhgias/${id}`);
    if (response.status === 200) { // Created
      message.success("Xóa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const suaDanhGia = async (danhgia) => {
  try {
    const response = await apiKey.putToken(`/api/Danhgias/`, danhgia);
    if (response.status === 200) { // Created
      message.success("Sửa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const checkDanhgia = async (danhgia) => {
  try {
    const response = await apiKey.getToken(`/api/Danhgias/CheckDanhgia`, danhgia);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.error(`Kiểm tra thất bại: ${error.response?.data?.message || error.message}`);
  }
};