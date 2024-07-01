import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import logo from '../assets/img/logo.png';
import Modal, { ModalContent } from './Modal';
import Auth from './Auth';
import Comment from './Comment';
import Grid from './Grid';
import { useSelector } from 'react-redux';


export default function HeaderFile() {
    const { user, auth } = useSelector(state => state.UserReducer);
    console.log(user)
    return (
        <>
            <nav className="header">
                <div className="header__wrap">
                    <div className='collapse'>
                        <button className='navbar-nav__collapse'><i className="fa-solid fa-bars"></i></button>
                        <div className="navbar__items__expand" >
                            <ul className='navbar-nav__list__expand'>
                                <a to='/'>
                                    <li className='text-bold'>
                                        Thể loại
                                    </li>
                                </a>
                                <a to='/truyen'>
                                    <li className='text-bold'>Bảng xếp hạng</li>
                                </a>
                                <a to={'/'}>
                                    <li>Đăng truyện</li>
                                </a>
                                {
                                    true ? <a to='/profile'>
                                        <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>

                                    </a> :
                                        <>
                                            <a ><li>Đăng nhập</li></a>
                                            <a ><li>Đăng ký</li></a>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="logo">
                        <a className="" to='/'><img src={logo} alt="" /></a>
                    </div>
                    <div className="navbar-nav">

                        <ul className='navbar-nav__list'>
                            <a to='/'>
                                <li className='text-bold'>
                                    Thể loại
                                </li>
                            </a>
                            <a to='/truyen'>
                                <li className='text-bold'>Bảng xếp hạng</li>
                            </a>
                        </ul>
                        <div className='navbar-nav__list__search'>
                            <div className='form-group'>
                                <input placeholder='Tìm truyện'></input>
                                <button ><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                        <ul className='navbar-nav__list navbar-nav__list--right'>
                            <a to={""}>
                                <li><i style={{ marginRight: 4 + 'px' }} className="fa-regular fa-circle-up"></i> Đăng truyện</li>
                            </a>
                            {
                                user ? <div className='navbar-nav__profile'>
                                    <div
                                        //  onClick={handleDropdownProfile}
                                        className="navbar-nav__profile__name">
                                        {/* {user.image ?
                                            <div className='navbar-nav__avatar'><img src={user.image} alt="" /></div>
                                            : <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>
                                        }
                                        <a>{user.name || user.tenhienthi || user.username}</a> */}
                                    </div>
                                    {/* <div ref={profileDropdownRef} tabIndex={"1"} onBlur={hideProfileDropdown} className="navbar-nav__profile__menu">
                                        <ul>
                                            {
                                                menu[user?.roles[0] || 'USER'].map((item, i) => {
                                                    return <li key={i}><a to={item.path}>{item.display}</a></li>
                                                }
                                                )
                                            }
                                            <li ></li>
                                        </ul>
                                    </div> */}
                                    <a
                                    //  onClick={onClickLogout}
                                    >
                                        Đăng xuất</a>
                                </div>
                                    :
                                    <>
                                        <a ><li>Đăng nhập</li></a>
                                        <a ><li>Đăng ký</li></a>
                                    </>
                            }

                        </ul>
                    </div>
                </div>
                {auth.active && user == false ? <Modal active={auth.active}>
                    <ModalContent  >
                        <Auth choose={auth.login} user={user}></Auth>
                    </ModalContent>
                </Modal> : <></>}

            </nav>


        </>
    )
}

