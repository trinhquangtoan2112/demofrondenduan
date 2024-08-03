import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/reducer/TienIchReducer";

const UserMenuModal = ({ isOpen, onClose, userInfo }) => {
  const { nenToi } = useSelector(state => state.TienIchReducer);
  const dispatch = useDispatch()
  console.log(nenToi)
  const handleDangTruyenClick = () => {
    if (userInfo.trangThai !== 1) {
      message.warning("Hãy xác thực tài khoản để có thể đăng truyện");
    }
  };
  const handleChangeTheme = () => {
    dispatch(setTheme())
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full sm:w-80 h-full border border-gray-300 rounded-lg shadow-lg p-6 relative z-20 flex flex-col  user-name">
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
          style={{ fontWeight: "800", padding: "5px" }}
        >
          &times;
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            src={userInfo?.anhDaiDien || "/path/to/default/avatar.png"}
            className="w-10 h-10 rounded-full mr-5"
          />
          <p className="text-lg font-semibold ">{userInfo?.tenNguoiDung}</p>
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
          <li className="mb-4">
            {userInfo.trangThai == 1 ? (
              <Link to="/tacgia/butdanh" onClick={onClose}>
                Đăng Truyện
              </Link>
            ) : (
              <a onClick={handleDangTruyenClick}>
                Đăng Truyện
              </a>
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
          <div className="flex flex-row items-center w-4/12 justify-between">
            <label className="switch d-flex flex-row ">

              <input type="checkbox" onClick={handleChangeTheme}
                checked={nenToi} />
              <span className="slider round" />



            </label>
            {nenToi ? <i className="fa fa-moon" /> : <i className="fa fa-sun" />}
            {/*  */}




          </div>


        </ul>
      </div>
    </div>
  );
};

export default UserMenuModal;
