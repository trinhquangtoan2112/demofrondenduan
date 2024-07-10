import { message } from "antd";
import { apiKey } from "../http";

export const pushFeedback = async (feedback) => {
  try {
    const result = await apiKey.post("api/Phanhois", feedback);
    if (result.status === 201) { // Created
      message.success("Gửi phản hồi thành công");
    } else {
      message.error("Gửi phản hồi thất bại");
    }
  } catch (error) {
    message.error("Lỗi xảy ra khi gửi phản hồi");
    console.error('Error pushing feedback:', error);
  }
};

export const getFeedback = async () => {
  try {
    const response = await apiKey.get('api/Phanhois');
    if (response.status === 200) {
      return response.data;
    } else {
      message.error("Lấy dữ liệu phản hồi thất bại");
    }
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const getFeedbackid = async (id) => {
  try {
    const response = await apiKey.get(`api/Phanhois/${id}`);
    return response.data; // Assuming your API returns the feedback object
  } catch (error) {
    throw error; // Handle errors as needed
  }
};


export const updateFeedback = async (id, feedback) => {
  try {
    console.log('Updating feedback:', id, feedback); // Log dữ liệu để kiểm tra
    const response = await apiKey.put(`api/Phanhois/${id}`, feedback);
    if (response.status === 204) { // No Content
      message.success("Cập nhật phản hồi thành công");
      return response.data;
    } else {
      message.error(`Cập nhật phản hồi thất bại: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating feedback:', error);
    if (error.response && error.response.data) {
      message.error(`Lỗi xảy ra khi cập nhật phản hồi: ${error.response.data.title}`);
    } else {
      message.error("Lỗi xảy ra khi cập nhật phản hồi");
    }
  }
};
