import React, { Component } from "react";
import { Table, Button, message, Modal } from "antd";
import {
  layDanhSachBaoCao,
  suaBaoCao,
  xoaBaoCao,
} from "../../service/actions/BaoCaoAction";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default class BaoCaoAdmin extends Component {
  state = {
    baoCaos: [],
    filteredBaoCaos: [],
    selectedBaoCao: null,
    loading: false,
    modalVisible: false,
    activeType: 1, // Default active report type
  };

  componentDidMount() {
    this.fetchBaoCaos();
  }

  fetchBaoCaos = async () => {
    this.setState({ loading: true });
    try {
      const response = await layDanhSachBaoCao();
      if (response.status === 200) {
        const baoCaos = response.data;
        const filteredBaoCaos = baoCaos.filter((bc) => bc.loaibaocao === 1);
        this.setState({
          baoCaos,
          filteredBaoCaos,
          loading: false,
        });
      } else {

        this.setState({ loading: false });
      }
    } catch (error) {

      this.setState({ loading: false });
    }
  };

  filterByType = (type) => {
    const { baoCaos } = this.state;
    const filteredBaoCaos = baoCaos.filter((bc) => bc.loaibaocao === type);
    this.setState({
      filteredBaoCaos,
      activeType: type, // Set active report type
    });
  };

  showModal = (record) => {
    this.setState({
      selectedBaoCao: record,
      modalVisible: true,
    });
  };

  handleEdit = async (record) => {
    Modal.confirm({
      title: "Xác nhận xử lý báo cáo",
      content: "Xác nhận đã xử lý báo cáo này?",
      onOk: async () => {
        try {
          const response = await suaBaoCao({
            maBaoCao: record.maBaoCao,
            trangthai: record.trangthai === 0 ? 1 : 0, // Toggle between trạng thái 0 and 1
          });
          if (response.status === 200) {
            this.fetchBaoCaos(); // Refresh the list after update
          } else {
            message.error(`Cập nhật báo cáo thất bại: ${response.message}`);
          }
        } catch (error) {
          message.error(
            `Cập nhật báo cáo thất bại: ${error.response?.data?.message || error.message
            }`
          );
        }
      },
    });
  };

  handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa báo cáo",
      content: "Bạn có chắc chắn muốn xóa báo cáo này?",
      onOk: async () => {
        try {
          const response = await xoaBaoCao(record.maBaoCao);
          if (response.status === 200) {
            this.fetchBaoCaos(); // Refresh the list after deletion
          } else {
            message.error(`Xóa báo cáo thất bại: ${response.message}`);
          }
        } catch (error) {
          message.error(
            `Xóa báo cáo thất bại: ${error.response?.data?.message || error.message
            }`
          );
        }
      },
    });
  };

  handleOk = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      filteredBaoCaos,
      loading,
      selectedBaoCao,
      modalVisible,
      activeType,
    } = this.state;

    // Hàm để định dạng ngày
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1
        }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    };

    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Tiêu Đề",
        dataIndex: "tieude",
        key: "tieude",
      },
      {
        title: "Trạng Thái",
        dataIndex: "trangthai",
        key: "trangthai",
        render: (text) => (text === 0 ? "Chưa Xử Lý" : "Đã Xử Lý"),
        sorter: (a, b) => a.trangthai - b.trangthai,
      },
      {
        title: "Người Báo Cáo",
        dataIndex: "nguoiBaoCao",
        key: "nguoiBaoCao",
      },
      {
        title: "Ngày gửi",
        dataIndex: "ngaytao",
        key: "ngaytao",
        render: (text) => formatDate(text),
        sorter: (a, b) => new Date(a.ngaytao) - new Date(b.ngaytao),
      },
      {
        title: "Hành Động",
        key: "action",
        width: 70,
        render: (text, record) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px", // Khoảng cách giữa các nút
            }}
          >
            <Button
              onClick={() => this.showModal(record)}
              icon={<EyeOutlined />}
              type="text"
              style={{ margin: 0 }}
            />
            {record.trangthai !== 1 && (
              <Button
                onClick={() => this.handleEdit(record)}
                icon={<EditOutlined />}
                type="text"
                style={{ margin: 0 }}
              />
            )}
            <Button
              onClick={() => this.handleDelete(record)}
              icon={<DeleteOutlined />}
              type="text"
              danger
              style={{ margin: 0 }}
            />
          </div>
        ),
      },
    ];

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quản lý Báo Cáo</h1>
        <div className="mb-4">
          {[
            { type: 1, label: "Báo cáo đánh giá" },
            { type: 2, label: "Báo cáo bình luận" },
            { type: 3, label: "Báo cáo phản hồi bình luận" },
            { type: 4, label: "Báo cáo truyện" },
            { type: 5, label: "Báo cáo chương truyện" },
          ].map((btn) => (
            <Button
              key={btn.type}
              onClick={() => this.filterByType(btn.type)}
              className={`mr-2 ${activeType === btn.type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
                }`}
            >
              {btn.label}
            </Button>
          ))}
        </div>
        <Table
          columns={columns}
          dataSource={filteredBaoCaos}
          loading={loading}
          rowKey="maBaoCao"
          pagination={{ pageSize: 10 }}
        />
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Chi Tiết Báo Cáo</h2>
              {selectedBaoCao && (
                <div>
                  <p>
                    <strong>Tiêu Đề:</strong> {selectedBaoCao.tieude}
                  </p>
                  <p>
                    <strong>Nội Dung:</strong> {selectedBaoCao.noidung}
                  </p>
                  <p>
                    <strong>Trạng Thái:</strong>{" "}
                    {selectedBaoCao.trangthai === 0 ? "Chưa Xử Lý" : "Đã Xử Lý"}
                  </p>
                  <p>
                    <strong>Nội Dung Bị Báo Cáo:</strong>{" "}
                    {selectedBaoCao.noiDungBibaocao}
                  </p>
                  <p>
                    <strong>Người Báo Cáo:</strong> {selectedBaoCao.nguoiBaoCao}
                  </p>
                  <p>
                    <strong>Ngày gửi:</strong> {formatDate(selectedBaoCao.ngaytao)}
                  </p>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={this.handleCancel} className="mr-2">
                  Đóng
                </Button>
                <Button type="primary" onClick={this.handleOk}>
                  OK
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
