import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured

// Function to add a pseudonym
export const themGiaodich = async (giaodich) => {
  try {
    const response = await apiKey.postToken(`/api/Giaodiches`, giaodich);
    if (response.status === 200) { // Created
      return response.data;
     
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const dsGiaodichNguoiDung = async (giaodich) => {
  try {
    const response = await apiKey.getToken(`/api/Giaodiches`, giaodich);
    if (response.status === 200) { // Created
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};