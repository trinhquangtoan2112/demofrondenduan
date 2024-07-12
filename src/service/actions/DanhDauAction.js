import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured

// Function to add a pseudonym
export const themdanhdautruyen = async (danhdau) => {
  try {
    const response = await apiKey.postToken(`/api/Danhdaus`, danhdau);
    if (response.status === 200) { // Created
      message.success("Đánh dấu truyện thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`Đánh dấu thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const checkDanhDau = async (danhdau) => {
  try {
    const response = await apiKey.getToken(`/api/Danhdaus/CheckDanhdau`, danhdau);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.error(`Kiểm tra thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const XoaDanhDauTruyen = async (danhdau) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Danhdaus/XoaDanhDauTruyen`, danhdau);
    if (response.status === 202) { // Created
      message.success("Bỏ đánh dấu truyện thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`Kiểm tra thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const dsDanhDau = async (danhdau) => {
  try {
    const response = await apiKey.getToken(`/api/Danhdaus`, danhdau);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.success(`Không có truyện đánh dấu`);
    // message.error(`Kiểm tra thất bại: ${error.response?.data?.message || error.message}`);
  }
};