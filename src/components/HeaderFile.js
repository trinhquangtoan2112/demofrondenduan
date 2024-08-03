import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

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
  const [search, setSearch] = useState("");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTheLoai = async () => {
    const result = await layDanhSachTheLoaiAction(dispatch);
  };

  const searching = () => {
    const trimmedSearch = search ? search.trim() : "";
    if (trimmedSearch) {
      navigate(`/searchlist/${trimmedSearch}`, { state: trimmedSearch });
    } else {
      message.success("Hãy nhập thông tin tìm kiếm");
    }
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
    console.log(124421)
    dispatch(hienDangNhap());
  };

  const hienDangKy = () => {
    dispatch(hienDangKy1());
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setSearch(value);
  };

  return (
    <>
      <nav className="header block sm:hidden ">
        <div className="header__wrap">
          <div className="logo w-1/12">
            <Link className="" to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="navbar-nav ">

            <div className="navbar-nav__list__search">
              <div className="form-group">
                <input
                  placeholder="Tìm truyện"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searching();
                    }
                  }}
                  onChange={handleInputChange}
                ></input>
                <button
                  onClick={searching}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>


          </div>
          <div className="w-2/12 text-right flex flex-row justify-between">
            <button className='navbar-nav__collapse fs-14 ' onClick={toggleUserMenu}><i className="fa-solid fa-bars"></i></button>
            {user ?
              <button className='navbar-nav__collapse fs-14 ' onClick={onClickLogout}>
                <i className="fa fa-sign-in-alt"></i>
              </button>
              : <button className='navbar-nav__collapse fs-14 ' onClick={hienDangNha}><i className="fa fa-user" />
              </button>
            }
            {/* <ul className="navbar-nav__list navbar-nav__list--right">
              {user ? (
                <div className="navbar-nav__profile d-flex items-center">
                  {userInfo?.daXoa ? null : (
                    <div
                      className="navbar-nav__profile__name cursor-pointer"
                    >
                      {userInfo.anhDaiDien !== "string" &&
                        userInfo.anhDaiDien !== null ? (
                        <div
                          style={{ marginRight: '10px' }}
                          onClick={toggleUserMenu}
                          className="navbar-nav__avatar"
                        >
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
                        <div onClick={toggleUserMenu}>
                          <i
                            style={{ marginRight: "4px" }}
                            className="fa-solid fa-user"
                          ></i>
                        </div>
                      )}
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
            </ul> */}
            <UserMenuModal
              isOpen={isUserMenuOpen}
              userInfo={userInfo}
              onClose={toggleUserMenu}
            />
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
      <nav className="header hidden sm:block">
        <div className="header__wrap">
          <div className="collapse">
            <button className="navbar-nav__collapse">
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="navbar__items__expand">
              <ul className="navbar-nav__list__expand">
                <a onClick={hienDangNha}>
                  <li>Đăng nhập</li>
                </a>
                <a onClick={hienDangKy}>
                  <li>Đăng ký</li>
                </a>
              </ul>
            </div>
          </div>

          <div className="logo">
            <Link className="" to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="navbar-nav">
            <ul className="navbar-nav__list"></ul>
            <div className="navbar-nav__list__search">
              <div className="form-group">
                <input
                  placeholder="Tìm truyện"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searching();
                    }
                  }}
                  onChange={handleInputChange}
                ></input>
                <button
                  onClick={searching}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            <ul className="navbar-nav__list navbar-nav__list--right">
              {user ? (
                <div className="navbar-nav__profile d-flex items-center">
                  {userInfo?.daXoa ? null : (
                    <div
                      className="navbar-nav__profile__name cursor-pointer"
                    >
                      {userInfo.anhDaiDien !== "string" &&
                        userInfo.anhDaiDien !== null ? (
                        <div
                          style={{ marginRight: '10px' }}
                          onClick={toggleUserMenu}
                          className="navbar-nav__avatar"
                        >
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
                        <div onClick={toggleUserMenu}>
                          <i
                            style={{ marginRight: "4px" }}
                            className="fa-solid fa-user"
                          ></i>
                        </div>
                      )}
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
