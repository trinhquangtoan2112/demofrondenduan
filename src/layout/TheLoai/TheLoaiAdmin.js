import React, { Component } from "react";
import { Table, Button, Modal, message, Input } from "antd";
import {
  layDanhSachTheloai,
  themTheLoai,
  xoaTheLoai,
  suaTheLoai,
} from "../../service/actions/TheLoaiAction";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Search } = Input;

class TheLoaiAdmin extends Component {
  state = {
    theloaiList: [],
    loading: false,
    viewModalVisible: false,
    editModalVisible: false,
    addModalVisible: false,
    currentRecord: null,
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
    this.setState({ currentRecord: record, viewModalVisible: true });
  };

  handleEdit = (record) => {
    this.setState({ currentRecord: record, editModalVisible: true });
  };

  handleEditSubmit = async () => {
    const { currentRecord } = this.state;
    try {
      await suaTheLoai(currentRecord);
      this.setState({ editModalVisible: false });
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
          await xoaTheLoai(record.maTheLoai);
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

  handleModalClose = (modal) => {
    this.setState({ [modal]: false, currentRecord: null });
  };

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
      viewModalVisible,
      editModalVisible,
      addModalVisible,
      currentRecord,
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
        width: 90,
        render: (text, record) => (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px", // Khoảng cách giữa các nút
            }}
          >
            <Button
              icon={<EyeOutlined />}
              type="link"
              onClick={() => this.handleView(record)}
            />
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => this.handleEdit(record)}
            />
            {record.soluongtruyen == 0 && (
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => this.handleDelete(record)}
              />
            )}
          </span>
        ),
      },
    ];

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Quản Lý Thể Loại</h2>
        <Search
          placeholder="Tìm kiếm Thể loại"
          onSearch={this.handleSearch}
          onChange={(e) => this.handleSearch(e.target.value)}
          enterButton="Tìm kiếm"
          size="large"
          style={{ marginBottom: 20 }}
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
          dataSource={theloaiList.filter((item) =>
            item.tenTheLoai
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          )}
          loading={loading}
          rowKey="maTheLoai"
        />
        <Modal
          visible={viewModalVisible}
          title="Chi Tiết Thể Loại"
          onCancel={() => this.handleModalClose("viewModalVisible")}
          footer={[
            <Button
              key="close"
              onClick={() => this.handleModalClose("viewModalVisible")}
            >
              Đóng
            </Button>,
          ]}
          width={600}
        >
          {currentRecord && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tên Thể Loại
                </label>
                <p>{currentRecord.tenTheLoai}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mô Tả
                </label>
                <p>{currentRecord.moTa}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Số Lượng Truyện
                </label>
                <p>{currentRecord.soluongtruyen}</p>
              </div>
            </div>
          )}
        </Modal>
        <Modal
          visible={editModalVisible}
          title="Chỉnh Sửa Thể Loại"
          onCancel={() => this.handleModalClose("editModalVisible")}
          footer={[
            <Button
              key="cancel"
              onClick={() => this.handleModalClose("editModalVisible")}
            >
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleEditSubmit}>
              Lưu
            </Button>,
          ]}
          width={600}
        >
          {currentRecord && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tên Thể Loại
                </label>
                <Input
                  value={currentRecord.tenTheLoai}
                  onChange={(e) =>
                    this.setState({
                      currentRecord: {
                        ...currentRecord,
                        tenTheLoai: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mô Tả
                </label>
                <Input
                  value={currentRecord.moTa}
                  onChange={(e) =>
                    this.setState({
                      currentRecord: {
                        ...currentRecord,
                        moTa: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </>
          )}
        </Modal>

        <Modal
          visible={addModalVisible}
          title="Thêm Thể Loại"
          onCancel={() => this.handleModalClose("addModalVisible")}
          footer={[
            <Button
              key="cancel"
              onClick={() => this.handleModalClose("addModalVisible")}
            >
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => this.handleAddSubmit({
                tenTheLoai: this.state.currentRecord.tenTheLoai,
                moTa: this.state.currentRecord.moTa
              })}
            >
              Thêm
            </Button>,
          ]}
          width={600}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên Thể Loại
            </label>
            <Input
              onChange={(e) =>
                this.setState({
                  currentRecord: {
                    ...this.state.currentRecord,
                    tenTheLoai: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mô Tả
            </label>
            <Input
              onChange={(e) =>
                this.setState({
                  currentRecord: {
                    ...this.state.currentRecord,
                    moTa: e.target.value,
                  },
                })
              }
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default TheLoaiAdmin;
