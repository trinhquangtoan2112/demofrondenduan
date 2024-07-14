import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import {
  themButDanh,
  layDanhSachButDanh,
  suaButDanh,
} from "../../service/actions/ButDanhAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Search } = Input;

const ButDanh = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [butDanhList, setButDanhList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // Nếu người dùng chưa đăng nhập, hiển thị thông báo và điều hướng đến trang đăng nhập
      message.warning(
        "Bạn chưa đăng nhập. Vui lòng đăng nhập để tạo bút danh."
      );
      navigate("/");
    } else if (userInfo.trangThai !== true) {
      message.warning(
        "Bạn chưa xác thực tài khoản. Vui lòng xác thực để để tạo bút danh."
      );
      navigate("/");
    } else {
      fetchData();
    }
  }, [userInfo, navigate]);

  const fetchData = async () => { 
    try {
      const data = await layDanhSachButDanh();
      setButDanhList(data);
    } catch (error) {
      console.error("Failed to fetch pseudonyms:", error);
    }
  };

  const handleThemButDanh = async (values) => {
    await themButDanh(values);
    setIsModalVisible(false);
    form.resetFields();
    fetchData();
  };

  const handleSuaButDanh = async (values) => {
    try {
      await suaButDanh(values);
      setIsModalVisible(false);
      form.resetFields();
      setIsEdit(false);
      fetchData();
    } catch (error) {
      console.error("Failed to edit pseudonym:", error);
      message.error(
        `Sửa thất bại: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setIsEdit(true);
    setSelectedId(record.id);
    form.setFieldsValue({
      tenButDanh: record.tenButDanh,
      maButDanh: record.maButDanh,
    });
  };

  const handleAddClick = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          id: selectedId,
          maButDanh: values.maButDanh,
        };
        if (isEdit) {
          handleSuaButDanh(data);
        } else {
          handleThemButDanh(data);
        }
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsEdit(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const getFilteredData = () => {
    if (!searchText) return butDanhList;
    return butDanhList.filter((item) =>
      item.tenButDanh.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên bút danh",
      dataIndex: "tenButDanh",
      key: "tenButDanh",
      sorter: (a, b) => a.tenButDanh.localeCompare(b.tenButDanh),
      render: (text, record, index) => (
        <Link to={`/QuanLyTruyen/${record.maButDanh}`}>
          {record.tenButDanh}
        </Link>
      ),
    },
    {
      title: "Số Truyện",
      dataIndex: "soLuongTruyen",
      key: "soLuongTruyen",
      sorter: (a, b) => a.soLuongTruyen - b.soLuongTruyen,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.soLuongTruyen == 0 && (
            <Button type="primary" onClick={() => handleEdit(record)}>
              Sửa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddClick}
        style={{ marginBottom: 16 }}
      >
        Thêm bút danh
      </Button>
      <Search
        placeholder="Tìm kiếm bút danh"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        enterButton="Tìm kiếm"
        size="large"
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={getFilteredData()}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isEdit ? "Sửa bút danh" : "Thêm bút danh"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ padding: "20px" }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Form.Item
            label="Tên bút danh"
            name="tenButDanh"
            rules={[{ required: true, message: "Vui lòng nhập tên bút danh!" }]}
            style={{ width: "100%" }}
          >
            <Input
              style={{ padding: "8px", borderRadius: "4px", width: "100%" }}
            />
          </Form.Item>
          {isEdit && (
            <Form.Item
              label="Mã bút danh"
              name="maButDanh"
              style={{ display: "none" }}
            >
              <Input
                style={{ padding: "8px", borderRadius: "4px", width: "100%" }}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ButDanh;
