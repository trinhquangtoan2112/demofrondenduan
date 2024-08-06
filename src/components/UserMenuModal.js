import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { themGiaodich } from "../service/actions/GiaoDichAction";
import { setTheme } from "../store/reducer/TienIchReducer";

const UserMenuModal = ({ isOpen, onClose, userInfo }) => {
  const { nenToi } = useSelector(state => state.TienIchReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDangTruyenClick = () => {
    if (userInfo.trangThai !== 1) {
      message.warning("Hãy xác thực tài khoản để có thể đăng truyện");
    }
  };

  const handleDiemDanhClick = () => {
    Modal.confirm({
      title: "Xác nhận điểm danh",
      content: "Điểm danh để nhận được những phần quà hấp dẫn",
      okText: "Điểm danh",
      cancelText: "Hủy",
      onOk: async () => {
        setLoading(true);
        try {
          const response = await themGiaodich({
            maChuongTruyen: 22, // hoặc giá trị tương ứng
            loaiGiaoDich: 6, // Hoặc giá trị tương ứng
            loaiTien: userInfo.vip ? 5 : 6, // Tai khoản vip thì loại tiền = 5, còn lại thì = 6
            soTien: 0, // Hoặc giá trị tương ứng
          });

          if (response.status === 201) {
            const messageText = userInfo.vip
              ? "Bạn nhận được 1 chìa khóa và 2 phiếu đề cử"
              : "Bạn nhận được 1 chìa khóa và 1 phiếu đề cử";
            message.success(messageText);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
          message.error("Lỗi khi điểm danh");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleChangeTheme = () => {
    dispatch(setTheme());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full sm:w-80 max-w-sm h-full border border-gray-300 rounded-lg shadow-lg p-6 relative z-20 flex flex-col">
        <button
          className="absolute top-4 right-4 text-xl font-bold p-2"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center mb-4">
          <img
            src={userInfo?.anhDaiDien || "/path/to/default/avatar.png"}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <p className="text-lg font-semibold">{userInfo?.tenNguoiDung}</p>
        </div>

        {/* Navigation Links */}
        <ul className="list-none p-0">
          {userInfo.maQuyen === 1 && (
            <li className="mb-4">
              <Link to="/admin/quanlynguoidung" onClick={onClose}>
                Quản lý
              </Link>
            </li>
          )}
          <li className="mb-4">
            <Link to="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/UserDetail" onClick={onClose}>
              Tài khoản của tôi
            </Link>
          </li>
          {userInfo && (
            <li className="mb-4">
              <button
                onClick={handleDiemDanhClick}
                disabled={loading}
                className="w-full text-white py-2 px-4 rounded hover:bg-[#e66700] bg-[#ff7300] transition"
              >
                {loading ? "Đang xử lý..." : "Điểm danh"}
              </button>
            </li>
          )}
          <li className="mb-4">
            <Link to="/LichSuGiaoDich" onClick={onClose}>
              Lịch sử giao dịch
            </Link>
          </li>
          <li className="mb-4">
            {userInfo.trangThai == 1 ? (
              <Link to="/tacgia/butdanh" onClick={onClose}>
                Đăng Truyện
              </Link>
            ) : (
              <button onClick={handleDangTruyenClick} className="text-[#ff7300] hover:underline ">
                Đăng Truyện
              </button>
            )}
          </li>
          <li className="mb-4">
            <Link to="/LichSuDoc" onClick={onClose}>
              Lịch sử đọc
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/Danhdau" onClick={onClose}>
              Truyện đã lưu
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/Feedback" onClick={onClose}>
              Phản hồi
            </Link>
          </li>
          <div className="flex items-center mt-4">
            <label className="switch flex items-center">
              <input
                type="checkbox"
                onChange={handleChangeTheme}
                checked={nenToi}
                aria-label="Toggle Theme"
              />
              <span className="slider round" />
            </label>
            <span className="ml-2">
              {nenToi ? <i className="fa fa-moon" /> : <i className="fa fa-sun" />}
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserMenuModal;
