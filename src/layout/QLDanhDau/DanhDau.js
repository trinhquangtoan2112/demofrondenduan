import React, { Component } from "react";
import { message, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import {
  dsDanhDau,
  XoaDanhDauTruyen,
} from "../../service/actions/DanhDauAction";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default class DanhDau extends Component {
  state = {
    danhDaus: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchDanhDaus();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  fetchDanhDaus = async () => {
    try {
      const response = await dsDanhDau();
      if (response.status === 200) {
        this.setState({ danhDaus: response.data, loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleRemoveBookmark = async (maTruyen) => {
    const maid = {
      maTruyen: maTruyen,
    };
    try {
      await XoaDanhDauTruyen(maid);
      this.fetchDanhDaus(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to remove bookmark. Please try again.");
    }
  };

  render() {
    const { danhDaus, loading } = this.state;

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
                  onClick={() => this.handleRemoveBookmark(data.maTruyen)}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
