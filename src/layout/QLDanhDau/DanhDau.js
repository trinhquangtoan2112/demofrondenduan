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
      navigate('/')
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
    <div>
      <h1>Danh Sách Truyện Đã Đánh Dấu</h1>
      {danhDaus.map((data) => (
        <div className="story-card" key={data.maTruyen}>
          <div className="story-card__img-wrap">
            <img src={data.anhBia} alt={data.tenTruyen} />
          </div>
          <div className="story-card__content">
            <Link to={`../truyen/${data.maTruyen}`}>
              <h2 className="story-card__title">{data.tenTruyen}</h2>
              <div className="story-card__description">
                {parse(data.moTa)}
              </div>
            </Link>
            <div className="story-card__info">
              <span className="story-card__author">
                Tác giả: {data.tenButDanh}
              </span>
              <span className="story-card__date">
                Ngày đánh dấu: {formatDate(data.ngaytao)}
              </span>
              <span
                className="story-card__type border border-primary color-primary fs-12"
                style={{ padding: "4px" }}
              >
                {data.tenTheLoai}
              </span>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveBookmark(data.maTruyen)}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DanhDau;