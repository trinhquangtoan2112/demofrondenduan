import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { message, Modal, Form } from "antd";
import { xoaDanhGia, suaDanhGia } from "../../service/actions/DanhGiaAction";
import anhDaiDienmacdinh from "../../assets/img/avt.png";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const diff = now - new Date(dateString);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} tháng trước`;
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `Vừa xong`;
  }
};

const EditReviewForm = ({ visible, onCancel, onEdit, initialValues }) => {
  const [form] = Form.useForm();
  const [diemDanhGia, setDiemDanhGia] = useState(0); // Default value
  const [noiDung, setNoiDung] = useState("");
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
      setDiemDanhGia(initialValues.diemDanhGia || 0); // Default to 0 if null
      setNoiDung(initialValues.noidung || "");
    }
  }, [visible, initialValues, form]);

  const handleRateSubmit = async () => {
    try {
      const values = await form.validateFields();
      onEdit({
        ...values,
        maDanhGia: initialValues ? initialValues.maDanhGia : null,
        diemDanhGia,
        noidung: noiDung,
      });
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Sửa đánh giá"
      okText="Sửa"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={handleRateSubmit}
      className="edit-review-form-modal"
    >
      <div className="mb-4">
        <span className="text-gray-700">Điểm đánh giá:</span>
        <div className="flex mt-1">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setDiemDanhGia(ratingValue)}
                  className="hidden"
                />
                <i
                  className={`fa-solid fa-star text-3xl cursor-pointer transition transform duration-200 ${
                    ratingValue <= (hover || diemDanhGia)
                      ? "text-yellow-400 scale-125"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setDiemDanhGia(ratingValue)}
                ></i>
              </label>
            );
          })}
        </div>
      </div>
      <label className="block mb-4">
        <span className="text-gray-700">Nội dung:</span>
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2"
        ></textarea>
      </label>
    </Modal>
  );
};

const DSDanhGia = ({ danhSachDanhGia, loading, fetchData }) => {
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [currentDisplayCount, setCurrentDisplayCount] = useState(5);
  const [sortOption, setSortOption] = useState("newest");

  const handleDeleteReview = (maDanhGia) => {
    Modal.confirm({
      title: "Xác nhận xóa đánh giá?",
      icon: <ExclamationCircleOutlined />,
      okText: "Xóa",
      cancelText: "Hủy",
      async onOk() {
        try {
          await xoaDanhGia(maDanhGia);
          await fetchData();
        } catch (error) {
          console.error("Error deleting review:", error);
          message.error(`Failed to delete review: ${error.message}`);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditModalVisible(true);
  };

  const handleEditReview = async (values) => {
    try {
      await suaDanhGia(values);
      await fetchData();
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error editing review:", error);
      message.error(`Failed to edit review: ${error.message}`);
    }
  };

  const handleLoadMore = () => {
    setCurrentDisplayCount((prevCount) => prevCount + 5);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedDanhSachDanhGia = () => {
    const sortedData = [...danhSachDanhGia];
    switch (sortOption) {
      case "newest":
        return sortedData.sort(
          (b, a) => new Date(a.ngaycapnhat) - new Date(b.ngaycapnhat)
        );
      case "oldest":
        return sortedData.sort(
          (a, b) => new Date(a.ngaycapnhat) - new Date(b.ngaycapnhat)
        );
      case "rating":
        return sortedData.sort((b, a) => a.diemDanhGia - b.diemDanhGia);
      default:
        return sortedData;
    }
  };

  const paginatedReviews = sortedDanhSachDanhGia().slice(
    0,
    currentDisplayCount
  );

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Danh sách đánh giá
        </h3>

        <div className="mb-4 flex items-center">
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="block w-full rounded-md border-[#ff7300] shadow-sm focus:ring focus:ring-[#ff7300] focus:ring-opacity-50 border-2"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="rating">Xếp hạng</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {paginatedReviews.length === 0 ? (
              <div className="text-center">Chưa có đánh giá nào</div>
            ) : (
              paginatedReviews.map((review) => (
                <div
                  key={review.maDanhGia}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col"
                >
                  <div className="flex items-start mb-4">
                    <img
                      src={review.anhDaiDien || anhDaiDienmacdinh}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full mr-3 shadow-md"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-lg">{review.tenNguoiDung}</p>
                      <p className="text-gray-500 text-sm">
                        {formatTimeAgo(review.ngaycapnhat)}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="flex space-x-2">
                        {review.checkCuaToi && (
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => handleEditClick(review)}
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                        )}
                        {(userInfo?.maQuyen === 1 || review.checkCuaToi) && (
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteReview(review.maDanhGia)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star ${
                          index < review.diemDanhGia
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p>{review.noidung}</p>
                </div>
              ))
            )}

            {currentDisplayCount < danhSachDanhGia.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="w-full hover:bg-[#e66700] bg-[#ff7300] text-white font-bold py-2 px-4 rounded"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </>
        )}

        <EditReviewForm
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onEdit={handleEditReview}
          initialValues={editingReview}
        />
      </div>
    </div>
  );
};

export default DSDanhGia;
