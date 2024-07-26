import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured

// Function to add a pseudonym
export const themlike = async (like) => {
  try {
    const response = await apiKey.postToken(`/api/Likes`, like);
    if (response.status === 200) { // Created
      message.success("Like thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`Like thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const checklike = async (like) => {
  try {
    const response = await apiKey.postToken(`/api/Likes/CheckMultipleLikes`, like);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {

  }
};

export const xoalike = async (like) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Likes`, like);
    if (response.status === 200) { // Created
      message.success("Bỏ thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`Bỏ thất bại: ${error.response?.data?.message || error.message}`);
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