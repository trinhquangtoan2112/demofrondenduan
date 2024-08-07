import React, { eEffect, useState } from 'react'

import StoryDetail from '../StoryDetail/StoryDetail';
import { Link, Outlet } from 'react-router-dom';
import HeaderFile from '../../components/HeaderFile';
import Footer from '../../components/Footer';
const menu = [
    {
        path: "ButDanh",
        display: "Bút Danh",
        icon: ""
    },
    {
        path: "QuanLyTruyenCuaMinh", 
        display: "Quản lý truyện",
        icon: ""
    },
    {
        path: "QuanLyBanThao",
        display: "Quản lý bản thảo",
        icon: ""
    },
    {
        path: "LayDoanhThuTruyen",
        display: "Xem thống kê truyện truyện",
        icon: ""
    },

]
export default function Tacgia() {

    return (
        <>
            <HeaderFile></HeaderFile>
            <div className="main">
                <div>

                    <div className='admin-main' >
                        <div className="main-content">
                            <div className="d-flex">
                                <div className="col-2">
                                    <ul className="list-group">
                                        {
                                            menu.map((item, index) => {
                                                return <li key={index} className={`list-group__item `} ><Link to={item.path}>{item.display}</Link></li>
                                            })
                                        }

                                    </ul>

                                </div>
                                <div className="col-10 " style={{ 'minHeight': '500px' }}>
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer></Footer>
        </>
    )
}


