import React, { useState, useEffect } from "react";
import { message, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import { dsDanhDau, XoaDanhDauTruyen } from "../../service/actions/DanhDauAction";
import { useSelector } from "react-redux";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DanhDau = () => {
  const [danhDaus, setDanhDaus] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      message.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập để vào trang.");
      navigate('/');
    } else {
      fetchData();
    }
  }, [userInfo]);

  const fetchData = async () => {
    try {
      const response = await dsDanhDau();
      if (response.status === 200) {
        setDanhDaus(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleRemoveBookmark = async (maTruyen) => {
    const maid = {
      maTruyen: maTruyen,
    };
    try {
      await XoaDanhDauTruyen(maid);
      fetchData(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to remove bookmark. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!danhDaus || danhDaus.length === 0) {
    return <div>Không có truyện nào được đánh dấu.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Danh Sách Truyện Đã Đánh Dấu</h1>
      <div className="bg-yellow-50 p-4 rounded-lg shadow-lg">
        {danhDaus.map((data) => (
          <div key={data.maTruyen} className=" mb-4 p-4 border-b border-gray-200 last:border-0">
            <Link to={`../truyen/${data.maTruyen}`} className="flex items-center space-x-4 w-3/4">
              <div className="w-1/4 flex-shrink-0">
                <div className="relative" style={{ paddingTop: '133.33%' }}> {/* 3:4 aspect ratio */}
                  <img src={data.anhBia || "https://docln.net/img/nocover.jpg"} alt={data.tenTruyen} className="absolute top-0 left-0 w-full h-full object-cover rounded" />
                </div>
              </div>
              <div className="w-3/4">
                <h2 className="font-semibold truncate">{data.tenTruyen}</h2>
                <div className="text-sm text-gray-700 line-clamp-2">{parse(data.moTa)}</div>
              </div>
            </Link>
            <div className="flex items-center justify-between space-x-2">
              <span className="text-sm text-gray-700">Tác giả: {data.tenButDanh}</span>
              <span className="text-sm text-gray-700">Ngày đánh dấu: {formatDate(data.ngaytao)}</span>
              <span className="border border-primary text-primary px-2 py-1 text-sm rounded">{data.tenTheLoai}</span>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveBookmark(data.maTruyen)}
                danger
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanhDau;
