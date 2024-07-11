import React, { Component } from "react";
import { Table, Button, message, Modal, Form, Select } from "antd";
import { apiKey } from "../../service/http";
import {
  getFeedback,
  updateFeedback,
  getFeedbackid,
} from "../../service/actions/FeedbackAction";

class FeedbackAdmin extends Component {
  state = {
    feedbacks: [],
    visible: false,
    editVisible: false,
    currentFeedback: null,
  };

  componentDidMount() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks = async () => {
    try {
      const response = await getFeedback();
      this.setState({ feedbacks: response });
    } catch (error) {
      message.error("Lỗi xảy ra khi lấy dữ liệu phản hồi");
    }
  };

  deleteFeedback = async (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa phản hồi này?",
      content: "Hành động này không thể hoàn tác",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await apiKey.delete(`api/Phanhois/${id}`);
          this.setState({
            feedbacks: this.state.feedbacks.filter(
              (feedback) => feedback.maPhanHoi !== id
            ),
          });
          message.success("Xóa phản hồi thành công");
        } catch (error) {
          message.error("Lỗi xảy ra khi xóa phản hồi");
        }
      },
    });
  };

  showModal = async (feedback) => {
    try {
      const response = await getFeedbackid(feedback.maPhanHoi); // Fetch single feedback
      this.setState({
        visible: true,
        currentFeedback: response,
      });
    } catch (error) {
      message.error("Lỗi xảy ra khi lấy dữ liệu phản hồi");
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showEditModal = (feedback) => {
    this.setState({
      editVisible: true,
      currentFeedback: feedback,
    });
  };

  handleEditCancel = () => {
    this.setState({ editVisible: false });
  };

  handleEditSubmit = async (values) => {
    const { currentFeedback } = this.state;
    try {
      await updateFeedback(currentFeedback.maPhanHoi, {
        ...currentFeedback,
        trangThai: values.trangThai,
      });
      this.fetchFeedbacks(); // refresh feedback list
      this.setState({ editVisible: false });
    } catch (error) {
      message.error("Lỗi xảy ra khi cập nhật phản hồi");
    }
  };

  render() {
    const { feedbacks, visible, editVisible, currentFeedback } = this.state;

    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Tiêu đề",
        dataIndex: "tieude",
        key: "tieude",
        width: "200px",
        sorter: (a, b) => a.tieude.localeCompare(b.tieude),
      },
      {
        title: "Trạng thái",
        dataIndex: "trangThai",
        key: "trangThai",
        render: (text) => {
          switch (text) {
            case 0:
              return "Chưa xử lý";
            case 1:
              return "Đang xử lý";
            case 2:
              return "Đã xử lý";
            default:
              return text;
          }
        },
        sorter: (a, b) => a.trangThai - b.trangThai,
      },
      {
        title: "Người gửi",
        dataIndex: "emailNguoiDung",
        key: "emailNguoiDung",
      },
      {
        title: "Ngày gửi",
        dataIndex: "ngaytao",
        key: "ngaytao",
        render: (text) => {
          const date = new Date(text);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return formattedDate;
        },
        sorter: (a, b) => new Date(a.ngaytao) - new Date(b.ngaytao),
      },

      {
        title: "Hành động",
        key: "action",
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={() => this.showModal(record)}>
              Xem
            </Button>
            {record.trangThai !== 2 && (
              <Button type="default" onClick={() => this.showEditModal(record)}>
                Sửa
              </Button>
            )}
            <Button
              danger
              onClick={() => this.deleteFeedback(record.maPhanHoi)}
            >
              Xóa
            </Button>
          </span>
        ),
      },
    ];

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quản lý phản hồi</h1>
        <Table dataSource={feedbacks} columns={columns} rowKey="maPhanHoi" />

        <Modal
          title="Chi tiết phản hồi"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal"
        >
          {currentFeedback && (
            <div className="feedback-detail">
              <p>
                <strong>Tiêu đề:</strong> {currentFeedback.tieude}
              </p>
              <p>
                <strong>Nội dung:</strong> {currentFeedback.noiDung}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {currentFeedback.trangThai === 0
                  ? "Chưa xử lý"
                  : currentFeedback.trangThai === 1
                  ? "Đang xử lý"
                  : "Đã xử lý"}
              </p>
              <p>
                <strong>Người gửi:</strong> {currentFeedback.emailNguoiDung}
              </p>
              <p>
                <strong>Ngày gửi:</strong> {currentFeedback.ngaytao}
              </p>
            </div>
          )}
        </Modal>

        <Modal
          title="Sửa phản hồi"
          visible={editVisible}
          onCancel={this.handleEditCancel}
          footer={null}
        >
          {currentFeedback && (
            <Form
              initialValues={currentFeedback}
              onFinish={this.handleEditSubmit}
              className="space-y-4"
            >
              <Form.Item
                name="trangThai"
                label="Trạng thái"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái!" },
                ]}
              >
                <Select>
                  <Select.Option value={0}>Chưa xử lý</Select.Option>
                  <Select.Option value={1}>Đang xử lý</Select.Option>
                  <Select.Option value={2}>Đã xử lý</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    );
  }
}

export default FeedbackAdmin;
