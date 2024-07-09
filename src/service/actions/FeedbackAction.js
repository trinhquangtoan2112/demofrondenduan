import { message } from "antd";
import { apiKey } from "../http";

export const pushFeedback = async (feedback) => {
  try {
    const result = await apiKey.post("api/Phanhois", feedback);
    if (result.data.status === 200) {
      message.success("Gửi phản hồi thành công");
    }
  } catch (error) {
    message.error("Lỗi xảy ra");
  }
};
