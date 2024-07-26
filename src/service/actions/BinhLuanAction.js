import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured
// Function to add a pseudonym
export const themBinhLuan = async (binhluan) => {
  try {
    const response = await apiKey.postToken(`/api/Binhluans`, binhluan);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

export const themPhanHoiBinhLuan = async (Phanhoibinhluans) => {
  try {
    const response = await apiKey.postToken(`/api/Phanhoibinhluans`, Phanhoibinhluans);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to fetch reviews with login status check
export const layDSBinhLuanChuaDangNhap = async (maTruyen) => {
  try {
    const response = await apiKey.get(`/api/Binhluans`, maTruyen);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
  }
};

// Function to fetch reviews with login status check
export const layDSBinhLuanDaDangNhap = async (maTruyen) => {
  try {
    const response = await apiKey.getToken(`/api/Binhluans/GetBinhluansNguoiDung`, maTruyen);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
  }
};

// Function to add a pseudonym
export const xoaBinhLuan = async (id) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Binhluans/${id}`);
    if (response.status === 200) { // Created
      message.success("Xóa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const xoaPhanHoiBinhLuan = async (id) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Phanhoibinhluans/${id}`);
    if (response.status === 200) { // Created
      message.success("Xóa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const suaBinhLuan = async (binhLuan) => {
  try {
    const response = await apiKey.putToken(`/api/Binhluans/`, binhLuan);
    if (response.status === 200) { // Created
      message.success("Sửa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const suaPhanHoiBinhLuan = async (binhLuan) => {
  try {
    const response = await apiKey.putToken(`/api/Phanhoibinhluans/`, binhLuan);
    if (response.status === 200) { // Created
      message.success("Sửa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};