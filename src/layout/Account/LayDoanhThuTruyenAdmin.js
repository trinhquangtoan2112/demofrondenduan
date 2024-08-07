import React, { useState, useEffect } from "react";
import { Table, Input, Space, message } from "antd";
import { xemDoanhThuTruyenAdmin } from "../../service/actions/TruyenAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LayDoanhThuTruyenAdmin = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      message.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập.");
      navigate("/");
    }  else {
      fetchData();
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      const response = await xemDoanhThuTruyenAdmin();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      message.error("Có lỗi xảy ra khi lấy dữ liệu.");
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    if (keyword) {
      const filtered = data.filter((item) =>
        item.tenTruyen.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên Truyện",
      dataIndex: "tenTruyen",
      key: "tenTruyen",
    },
    {
      title: "Bút Danh",
      dataIndex: "tenButDanh",
      key: "tenButDanh",
    },
    {
      title: "Thể Loại",
      dataIndex: "tenTheLoai",
      key: "tenTheLoai",
    },
    {
      title: "Lượt Đọc",
      dataIndex: "luotdoc",
      key: "luotdoc",
    },
    {
      title: "Lượt Mua Bằng Xu",
      dataIndex: "luotmuabangXu",
      key: "luotmuabangXu",
    },
    {
      title: "Lượt Mua Bằng Chìa Khóa",
      dataIndex: "luotmuabangchiakhoa",
      key: "luotmuabangchiakhoa",
    },
    {
      title: "Số Đề Cử",
      dataIndex: "sodecu",
      key: "sodecu",
    },
    {
      title: "Tổng số xu nhận được",
      dataIndex: "tongdoanhthuthuve",
      key: "tongdoanhthuthuve",
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Input
          placeholder="Tìm kiếm theo tên truyện"
          value={searchKeyword}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="maTruyen"
          scroll={{ x: "max-content" }}
        />
      </Space>
    </div>
  );
};

export default LayDoanhThuTruyenAdmin;
