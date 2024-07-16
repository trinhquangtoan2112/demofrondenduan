import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { message, Modal, Form } from "antd";
import { layDSDanhGia, xoaDanhGia, DsDanhGiaChuaDangNhap, suaDanhGia } from "../../service/actions/DanhGiaAction";
import { useParams } from "react-router-dom";
import anhDaiDienmacdinh from "../../assets/img/avt.png";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const EditReviewForm = ({ visible, onCancel, onEdit, initialValues }) => {
  const [form] = Form.useForm();
  const [diemDanhGia, setDiemDanhGia] = useState(initialValues.diemDanhGia || 0);
  const [noiDung, setNoiDung] = useState(initialValues.noidung || '');
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
      setDiemDanhGia(initialValues.diemDanhGia);
      setNoiDung(initialValues.noidung);
    }
  }, [visible, initialValues, form]);

  const handleRateSubmit = async () => {
    try {
      const values = await form.validateFields();
      onEdit({
        ...values,
        maDanhGia: initialValues.maDanhGia,
        diemDanhGia,
        noidung: noiDung,
      });
    } catch (info) {
      console.log('Validate Failed:', info);
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
                      ratingValue <= (hover || diemDanhGia) ? "text-yellow-400 scale-125" : "text-gray-300"
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

const DSDanhGia = () => {
  const { id } = useParams();
  const [danhSachDanhGia, setDanhSachDanhGia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userInfo) {
          response = await layDSDanhGia({ maTruyen: id });
        } else {
          response = await DsDanhGiaChuaDangNhap({ maTruyen: id });
        }
        setDanhSachDanhGia(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        message.error(`Failed to fetch reviews: ${error.message}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, userInfo]);

  const handleDeleteReview = async (maDanhGia) => {
    confirm({
      title: "Xác nhận xóa đánh giá?",
      icon: <ExclamationCircleOutlined />,
      okText: "Xóa",
      cancelText: "Hủy",
      async onOk() {
        try {
          await xoaDanhGia(maDanhGia);
          const response = await layDSDanhGia({ maTruyen: id });
          setDanhSachDanhGia(response.data);
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
      const response = await layDSDanhGia({ maTruyen: id });
      setDanhSachDanhGia(response.data);
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error editing review:", error);
      message.error(`Failed to edit review: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ds-danh-gia p-6 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Danh sách đánh giá</h3>
      <ul>
        {danhSachDanhGia.length === 0 ? (
          <li className="text-gray-600">
            Chưa có đánh giá nào cho truyện này.
          </li>
        ) : (
          danhSachDanhGia.map((danhGia) => (
            <li
              key={danhGia.maDanhGia}
              className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <div className="flex items-center mb-1">
                  <img
                    src={danhGia.anhDaiDien || anhDaiDienmacdinh}
                    alt="Avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = anhDaiDienmacdinh;
                    }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <span className="font-semibold">{danhGia.tenNguoiDung}</span>:{" "}
                  {danhGia.noidung}
                </div>
                <div className="text-gray-600">
                  Điểm đánh giá: {danhGia.diemDanhGia}{" "}
                  <i className="fa-solid fa-star text-yellow-400"></i> - Ngày:{" "}
                  {formatDate(danhGia.ngaycapnhat)}
                </div>
              </div>
              <div className="flex space-x-2">
                {(danhGia.checkCuaToi === true) && (
                  <span
                    className="cursor-pointer"
                    onClick={() => handleEditClick(danhGia)}
                  >
                    <i className="fa-solid fa-edit text-blue-500"></i>
                  </span>
                )}
                {(userInfo?.maQuyen === 1 || danhGia.checkCuaToi === true) && (
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDeleteReview(danhGia.maDanhGia)}
                  >
                    <i className="fa-solid fa-trash-alt text-red-500"></i>
                  </span>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      {editingReview && (
        <EditReviewForm
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onEdit={handleEditReview}
          initialValues={editingReview}
        />
      )}
    </div>
  );
};

export default DSDanhGia;
