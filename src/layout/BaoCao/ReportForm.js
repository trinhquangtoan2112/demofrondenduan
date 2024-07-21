import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { themBaocao } from "../../service/actions/BaoCaoAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ReportForm = ({ visible, onCancel, maThucThe, LoaiBaoCao }) => {
  const [form] = Form.useForm();

  const handleReportSubmit = async () => {
    try {
      const values = await form.validateFields();
      await themBaocao({
        ...values,
        loaibaocao: LoaiBaoCao,
        maThucThe,
      });
      form.resetFields(); // Reset form fields after successful submission
      onCancel();
    } catch (error) {
      console.error("Failed to submit report:", error);
      message.error(`Failed to submit report: ${error.message}`);
    }
  };

  const getTitle = (LoaiBaoCao) => {
    switch (LoaiBaoCao) {
      case 1:
        return "Báo cáo đánh giá";
      case 2:
        return "Báo cáo bình luận";
      case 3:
        return "Báo cáo phản hồi bình luận";
      case 4:
        return "Báo cáo truyện";
      case 5:
        return "Báo cáo chương truyện";
      default:
        return "Báo cáo";
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title={getTitle(LoaiBaoCao)}
        okText="Gửi báo cáo"
        cancelText="Hủy"
        onCancel={onCancel}
        onOk={handleReportSubmit}
        centered
        footer={[
          <Button
            key="cancel"
            onClick={onCancel}
            className="button-cancel"
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="button-submit"
            onClick={handleReportSubmit}
          >
            <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
            Gửi báo cáo
          </Button>,
        ]}
        className="modal-container"
      >
        <div className="modal-content">
          <p className="description">
            Nếu bạn thấy nội dung này vi phạm các quy định của chúng tôi, hãy sử dụng form bên dưới để báo cáo.
          </p>
          <Form form={form} layout="vertical" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Form.Item
              name="tieude"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề báo cáo" }]}
              className="form-item"
            >
              <Input
                placeholder="Nhập tiêu đề báo cáo"
                className="input-field"
              />
            </Form.Item>
            <Form.Item
              name="noidung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung báo cáo" }]}
              className="form-item"
            >
              <Input.TextArea
                rows={4}
                placeholder="Nhập nội dung báo cáo"
                className="input-field textarea-field"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <style jsx>{`
        .modal-container {
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .modal-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .description {
          color: #4a4a4a;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .form-item {
          width: 100%;
        }
        .input-field {
          border-radius: 4px;
          border: 1px solid #d3d3d3;
          padding: 12px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input-field:focus {
          border-color: #ff7300;
          box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.2);
        }
        .textarea-field:focus {
          border-color: #ff7300;
          box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.2);
        }
        .button-cancel {
          color: #4a4a4a;
          background-color: transparent;
          border: none;
          transition: color 0.3s, background-color 0.3s;
        }
        .button-cancel:hover {
          color: #6c757d;
        }
        .button-submit {
          background-color: #ff7300;
          border: none;
          color: white;
          transition: background-color 0.3s;
        }
        .button-submit:hover {
          background-color: #e66700;
        }
      `}</style>
    </>
  );
};

export default ReportForm;
