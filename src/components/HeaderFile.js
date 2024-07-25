import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  hienDangKy1,
  hienDangNhap,
  logOutFromAccount,
} from "../store/reducer/UserReducer";

import logo from "../assets/img/logo.png";
import Modal, { ModalContent } from "./Modal";
import Auth from "./Auth";
import Comment from "./Comment";
import Grid from "./Grid";
import anhDaiDienmacdinh from "../assets/img/avt.png";
import { layDanhSachTheLoaiAction } from "../service/actions/TheLoaiAction";
import UserMenuModal from "./UserMenuModal";

export default function HeaderFile() {
  const { user, auth, userInfo } = useSelector((state) => state.UserReducer);
  const [auth1, setAuth] = useState(false);
  const [search, setSearch] = useState(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTheLoai = async () => {
    const result = await layDanhSachTheLoaiAction(dispatch);
  };
  const searching = () => {
    navigate(`/searchlist/${search}`, { state: search });
  };
  useEffect(() => {
    setAuth(auth);
    getTheLoai();
  }, [auth]);

  const onClickLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("TOKEN");
    dispatch(logOutFromAccount());
    navigate("/");
  };

  const hienDangNha = () => {
    dispatch(hienDangNhap());
  };

  const hienDangKy = () => {
    dispatch(hienDangKy1());
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
};

  return (
    <>
      <nav className="header">
        <div className="header__wrap">
          <div className="collapse">
            <button className="navbar-nav__collapse">
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="navbar__items__expand">
              <ul className="navbar-nav__list__expand">
                <Link to={"/"}>
                  <li>Đăng truyện</li>
                </Link>
                {user ? (
                  <Link to="/userDetail">
                    <i
                      style={{ marginRight: "4px" }}
                      className="fa-solid fa-user"
                    ></i>
                  </Link>
                ) : (
                  <>
                    <a onClick={hienDangNha}>
                      <li>Đăng nhập</li>
                    </a>
                    <a onClick={hienDangKy}>
                      <li>Đăng ký</li>
                    </a>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="logo">
            <Link className="" to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="navbar-nav">
            <ul className="navbar-nav__list">
            </ul>
            <div className="navbar-nav__list__search">
              <div className="form-group">
                <input
                  placeholder="Tìm truyện"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // Perform the action you want on Enter key press
                      searching();
                    }
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    searching();
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            <ul className="navbar-nav__list navbar-nav__list--right">
              {user ? (
                <div className="navbar-nav__profile d-flex items-center">
                  {userInfo?.daXoa ? null : (
                    <div className="navbar-nav__profile__name cursor-pointer">
                      {userInfo.anhDaiDien !== "string" &&
                      userInfo.anhDaiDien !== null ? (
                        <div onClick={toggleUserMenu} className="navbar-nav__avatar">
                          <img
                            src={userInfo.anhDaiDien}
                            alt={`${userInfo.email} picture`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = anhDaiDienmacdinh;
                            }}
                          />
                        </div>
                      ) : (
                        <div onClick={toggleUserMenu} >
                          <i
                            style={{ marginRight: "4px" }}
                            className="fa-solid fa-user"
                          ></i>
                        </div>
                      )}
                      <a>{user.name || user.tenhienthi || user.username}</a>
                    </div>
                  )}

                  <a onClick={onClickLogout}>Đăng xuất</a>
                </div>
              ) : (
                <>
                  <a onClick={hienDangNha}>
                    <li>Đăng nhập</li>
                  </a>
                  <a onClick={hienDangKy}>
                    <li>Đăng ký</li>
                  </a>
                </>
              )}
            </ul>
          </div>
        </div>
        {auth1.active && !user ? (
          <Modal active={auth1.active}>
            <ModalContent>
              <Auth choose={auth1.login} user={user}></Auth>
            </ModalContent>
          </Modal>
        ) : (
          <></>
        )}
        <UserMenuModal
          isOpen={isUserMenuOpen}
          userInfo={userInfo}
          onClose={toggleUserMenu}
        />
      </nav>
    </>
  );
}
