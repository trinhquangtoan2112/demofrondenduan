import { message } from "antd";

import { apiKey } from "../http"; // Ensure apiKey is correctly configured

// Function to add a pseudonym
export const themButDanh = async (butdanh) => {
  try {
    const response = await apiKey.postToken(`/api/Butdanhs/Thembutdanh`, butdanh);
    if (response.status === 201) { // Created
      message.success("Thêm thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`Thêm thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to get a user's list of pseudonyms
export const layDanhSachButDanh = async () => {
  try {
    const response = await apiKey.getToken(`/api/Butdanhs/DanhSachButDanhTheoNguoiDung`);
    if (response.status === 200) { // OK
      return response.data.data;
    } else {
      message.error(`Lấy danh sách thất bại: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    message.error(`Lấy danh sách thất bại: ${error.response?.data?.message || error.message}`);
    return false;
  }
};

// Function to edit a pseudonym
export const suaButDanh = async (butdanhDto) => {
  try {
    const response = await apiKey.putToken(`/api/Butdanhs/SuaButDanh`, butdanhDto);
    if (response.status === 200) { // OK
      message.success("Sửa thành công");
      return response.data;
    } else {
      message.error(`Sửa thất bại: ${response.data.message}`);
    }
  } catch (error) {
    message.error(`Sửa thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// API Này sai rồi
export const KhoaButDanh = async (butdanhDtoKhoa) => {
  try {
    const response = await apiKey.putToken(`/api/Butdanhs/KhoaButDanh`, butdanhDtoKhoa);
    if (response.status === 200) { // Accepted
      message.success("Khóa thành công");
      return response.data;
    } else {
      message.error(`Khóa thất bại: ${response.data.message}`);
    }
  } catch (error) {
    message.error(`Khóa thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to get the list of pseudonyms for admin including the count of stories
export const layButDanhCuaAdmin = async () => {
  try {
    const response = await apiKey.getToken(`/api/Butdanhs/laybutdanhcuaadmin`);
    if (response.status === 200) { // OK
      return response.data.data;
    } else {
      message.error(`Lấy danh sách thất bại: ${response.data.message}`);
    }
  } catch (error) {
    message.error(`Lấy danh sách thất bại: ${error.response?.data?.message || error.message}`);
  }

};

// Function to get the list of pseudonyms for admin including the count of stories
export const XoaButDanhCuaAdmin = async (butdanhDtoXoa) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Butdanhs/XoaButDanhCuaAdmin`, butdanhDtoXoa);
    if (response.status === 200) { // OK
      message.success("Xóa thành công");
      return response.data.data;
    } else {
      message.error(`Xóa thất bại: ${response.data.message}`);
    }
  } catch (error) {
    message.error(`Xóa thất bại: ${error.response?.data?.message || error.message}`);
  }
};

