import React, { Component } from "react";
import { Table, Button, Modal, message, Input } from "antd";
import {
  KhoaButDanh,
  layButDanhCuaAdmin,
  XoaButDanhCuaAdmin,
} from "../../service/actions/ButDanhAction";
import { LockOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

export default class ButDanhAdmin extends Component {
  state = {
    butDanhs: [],
    loading: false,
    deleteModalVisible: false,
    lockModalVisible: false,
    selectedButDanh: null,
    searchText: "", // Thêm biến searchText vào state
  };

  componentDidMount() {
    this.fetchButDanhs();
  }

  fetchButDanhs = async () => {
    this.setState({ loading: true });
    try {
      const butDanhs = await layButDanhCuaAdmin();
      this.setState({ butDanhs, loading: false });
    } catch (error) {
      message.error(
        `Lấy danh sách thất bại: ${
          error.response?.data?.message || error.message
        }`
      );
      this.setState({ loading: false });
    }
  };

  // Hàm cập nhật giá trị tìm kiếm
  handleSearch = (value) => {
    this.setState({ searchText: value });
  };

  // Hàm lọc dữ liệu dựa trên giá trị tìm kiếm
  getFilteredData = () => {
    const { butDanhs, searchText } = this.state;
    if (!searchText) return butDanhs;
    return butDanhs.filter((item) =>
      item.tenButDanh.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  render() {
    const { loading, deleteModalVisible, lockModalVisible } = this.state;

    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Tên Bút Danh",
        dataIndex: "tenButDanh",
        key: "tenButDanh",
        sorter: (a, b) => a.tenButDanh.localeCompare(b.tenButDanh), // Sắp xếp theo tên bút danh
      },
      {
        title: "Sở Hữu",
        dataIndex: "emailNguoiDung",
        key: "emailNguoiDung",
      },
      {
        title: "Trạng Thái",
        dataIndex: "trangthai",
        key: "trangthai",
        render: (text) => (text === 1 ? "Đã Khóa" : "Hoạt Động"),
        sorter: (a, b) => a.trangthai - b.trangthai,
      },
      {
        title: "Số Truyện",
        dataIndex: "soLuongTruyen",
        key: "soLuongTruyen",
        sorter: (a, b) => a.soLuongTruyen - b.soLuongTruyen,
      },
      {
        title: "Ngày Tạo",
        dataIndex: "ngaytao",
        key: "ngaytao",
        render: (text) => {
          const date = new Date(text);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          return formattedDate;
        },
        sorter: (a, b) => new Date(a.ngaytao) - new Date(b.ngaytao),
      },
      {
        title: "Hành Động",
        key: "action",
        width: 70,
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {record.trangthai !== 1 && (
              <Button
                type="text"
                icon={<LockOutlined />}
                onClick={() => this.showLockModal(record.maButDanh)}
              />
            )}
            {record.soLuongTruyen === 0 && (
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => this.showDeleteModal(record.maButDanh)}
                danger
              />
            )}
          </div>
        ),
      },
    ];

    return (
      <div>
        <h1>Quản lý Bút Danh</h1>
        <Search
          placeholder="Tìm kiếm bút danh"
          onSearch={this.handleSearch}
          onChange={(e) => this.handleSearch(e.target.value)} // Cập nhật giá trị tìm kiếm khi người dùng nhập
          enterButton="Tìm kiếm" // Thêm văn bản cho nút tìm kiếm
          size="large" // Tăng kích thước của input và nút tìm kiếm
          style={{ marginBottom: 20}} // Điều chỉnh chiều rộng của thanh tìm kiếm
        />
        <Table
          columns={columns}
          dataSource={this.getFilteredData()}
          loading={loading}
          rowKey="maButDanh"
          pagination={{ pageSize: 10 }} // Thêm phân trang, 10 dòng mỗi trang
        />

        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận xóa bút danh"
          visible={deleteModalVisible}
          onOk={this.handleDeleteConfirm}
          onCancel={this.handleDeleteCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa bút danh này?</p>
        </Modal>

        {/* Lock Confirmation Modal */}
        <Modal
          title="Xác nhận khóa bút danh"
          visible={lockModalVisible}
          onOk={this.handleLockConfirm}
          onCancel={this.handleLockCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn khóa bút danh này?</p>
        </Modal>
      </div>
    );
  }

  showLockModal = (maButDanh) => {
    this.setState({
      selectedButDanh: maButDanh,
      lockModalVisible: true,
    });
  };

  handleLockConfirm = async () => {
    const { selectedButDanh } = this.state;
    try {
      await KhoaButDanh({ MaButDanh: selectedButDanh });
      this.fetchButDanhs();
      this.setState({ lockModalVisible: false });
    } catch (error) {
      message.error(
        `Khóa bút danh thất bại: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  handleLockCancel = () => {
    this.setState({ lockModalVisible: false });
  };

  showDeleteModal = (maButDanh) => {
    this.setState({
      selectedButDanh: maButDanh,
      deleteModalVisible: true,
    });
  };

  handleDeleteConfirm = async () => {
    const { selectedButDanh } = this.state;
    try {
      await XoaButDanhCuaAdmin({ MaButDanh: selectedButDanh });
      this.fetchButDanhs();
      this.setState({ deleteModalVisible: false });
    } catch (error) {
      message.error(
        `Xóa bút danh thất bại: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  handleDeleteCancel = () => {
    this.setState({ deleteModalVisible: false });
  };
}
