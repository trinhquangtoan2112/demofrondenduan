import { message } from "antd";
import { apiKey } from "../http"; // Ensure apiKey is correctly configured
// Function to add a pseudonym
export const themBaocao = async (Baocaos) => {
  try {
    const response = await apiKey.postToken(`/api/Baocaos`, Baocaos);
    if (response.status === 200) { // Created
      message.success("Báo cáo thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
}; 


// Function to get a user's list of pseudonyms
export const layDanhSachBaoCao = async () => {
  try {
    const response = await apiKey.get(`api/Baocaos/LayDSBaocao`);
    if (response.status === 200) { // OK
      return response.data;
    } else {
      message.error(`Lấy danh sách thất bại: ${response.data.message}`);
    }
  } catch (error) {
    message.error(`Lấy danh sách thất bại: ${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const suaBaoCao = async (baocao) => {
  try {
    const response = await apiKey.putToken(`/api/Baocaos/SuaBaoCao`, baocao);
    if (response.status === 200) { // Created
      message.success("Đã xác nhận xử lý thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};

// Function to add a pseudonym
export const xoaBaoCao = async (id) => {
  try {
    const response = await apiKey.deleteToken2(`/api/Baocaos/${id}`);
    if (response.status === 200) { // Created
      message.success("Xóa thành công");
      return response.data;
    }
  } catch (error) {
    message.error(`${error.response?.data?.message || error.message}`);
  }
};