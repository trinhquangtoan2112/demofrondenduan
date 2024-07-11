import React, { Component } from "react";
import { Table, Button, Modal, message, Input, Form } from "antd";
import {
  layDanhSachTheloai,
  themTheLoai,
  xoaTheLoai,
  suaTheLoai,
} from "../../service/actions/TheLoaiAction";

const { Search } = Input;

class TheLoaiAdmin extends Component {
  state = {
    theloaiList: [],
    loading: false,
    modalVisible: false,
    currentRecord: null,
    addModalVisible: false,
    searchText: "", 
  };

  componentDidMount() {
    this.fetchTheloaiList();
  }

  fetchTheloaiList = async () => {
    this.setState({ loading: true });
    try {
      const data = await layDanhSachTheloai();
      this.setState({ theloaiList: data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      message.error("Lấy danh sách thất bại");
    }
  };

  handleView = (record) => {
    this.setState({ currentRecord: record, modalVisible: true });
  };

  handleEdit = (record) => {
    this.setState({ currentRecord: record, modalVisible: true });
  };

  handleEditSubmit = async (values) => {
    try {
      const updatedRecord = {
        ...this.state.currentRecord,
        ...values,
      };
      await suaTheLoai(updatedRecord);
      this.setState({ modalVisible: false });
      this.fetchTheloaiList(); // Refresh the list
    } catch (error) {
      message.error("Cập nhật thể loại thất bại");
    }
  };

  handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc chắn muốn xóa thể loại ${record.tenTheLoai} không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await xoaTheLoai(record.maTheLoai); // Add token here
          message.success("Xóa thể loại thành công");
          this.fetchTheloaiList(); // Refresh the list
        } catch (error) {
          message.error("Xóa thể loại thất bại");
        }
      },
    });
  };

  handleAdd = () => {
    this.setState({ addModalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false, currentRecord: null });
  };

  handleAddModalClose = () => {
    this.setState({ addModalVisible: false });
  };

    // Hàm cập nhật giá trị tìm kiếm
    handleSearch = (value) => {
      this.setState({ searchText: value });
    };

  handleAddSubmit = async (values) => {
    try {
      await themTheLoai(values);
      this.setState({ addModalVisible: false });
      this.fetchTheloaiList(); // Refresh the list
    } catch (error) {
      message.error("Thêm thể loại thất bại");
    }
  };

  render() {
    const {
      theloaiList,
      loading,
      modalVisible,
      currentRecord,
      addModalVisible,
    } = this.state;

    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Thể Loại",
        dataIndex: "tenTheLoai",
        key: "tenTheLoai",
        sorter: (a, b) => a.tenTheLoai.localeCompare(b.tenTheLoai),
      },
      {
        title: "Số Lượng Truyện",
        dataIndex: "soluongtruyen",
        key: "soluongtruyen",
        sorter: (a, b) => a.soluongtruyen - b.soluongtruyen,
      },
      {
        title: "Hành động",
        key: "action",
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={() => this.handleView(record)}>
              Xem
            </Button>
            <Button type="default" onClick={() => this.handleEdit(record)}>
              Sửa
            </Button>
            {record.soluongtruyen == 0 && (
            <Button danger onClick={() => this.handleDelete(record)}>
              Xóa
            </Button>
            )}
          </span>
        ),
      },
    ];

    return (
      <div>
        <h2>Quản Lý Thể Loại</h2>
        <Search
          placeholder="Tìm kiếm Thể loại"
          onSearch={this.handleSearch}
          onChange={(e) => this.handleSearch(e.target.value)} // Cập nhật giá trị tìm kiếm khi người dùng nhập
          enterButton="Tìm kiếm" // Thêm văn bản cho nút tìm kiếm
          size="large" // Tăng kích thước của input và nút tìm kiếm
          style={{ marginBottom: 20}} // Điều chỉnh chiều rộng của thanh tìm kiếm
        />
        <Button
          type="primary"
          onClick={this.handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm Thể Loại
        </Button>
        <Table
          columns={columns}
          dataSource={theloaiList}
          loading={loading}
          rowKey="maTheLoai"
        />
        <Modal
          visible={modalVisible}
          title="Chi Tiết Thể Loại"
          onCancel={this.handleModalClose}
          footer={[
            <Button key="close" onClick={this.handleModalClose}>
              Đóng
            </Button>,
          ]}
        >
          {currentRecord && (
            <div>
              <p>Tên Thể Loại: {currentRecord.tenTheLoai}</p>
              <p>Mô Tả: {currentRecord.moTa}</p>
              <p>Số Lượng Truyện: {currentRecord.soluongtruyen}</p>
            </div>
          )}
        </Modal>
        <Modal
          visible={addModalVisible}
          title="Thêm Thể Loại"
          onCancel={this.handleAddModalClose}
          footer={null}
        >
          <Form onFinish={this.handleAddSubmit}>
            <Form.Item
              label="Tên Thể Loại"
              name="tenTheLoai"
              rules={[
                { required: true, message: "Vui lòng nhập tên thể loại" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô Tả"
              name="moTa"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={modalVisible}
          title="Chỉnh Sửa Thể Loại"
          onCancel={this.handleModalClose}
          footer={[
            <Button key="cancel" onClick={this.handleModalClose}>
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              form="editForm"
              htmlType="submit"
            >
              Lưu
            </Button>,
          ]}
        >
          {currentRecord && (
            <Form
              id="editForm"
              initialValues={{
                tenTheLoai: currentRecord.tenTheLoai,
                moTa: currentRecord.moTa,
              }}
              onFinish={this.handleEditSubmit}
            >
              <Form.Item
                label="Tên Thể Loại"
                name="tenTheLoai"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thể loại" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mô Tả"
                name="moTa"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    );
  }
}

export default TheLoaiAdmin;
