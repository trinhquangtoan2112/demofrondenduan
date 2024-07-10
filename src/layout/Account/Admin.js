import React, { eEffect, useState } from 'react'

import StoryDetail from '../StoryDetail/StoryDetail';
import { Link, Outlet } from 'react-router-dom';
import HeaderFile from '../../components/HeaderFile';
const menu = [
    {
        path: "",
        display: "Quản lý thành viên",
        icon: ""
    },
    {
        path: "change-password",
        display: "Đổi mật khẩu",
        icon: ""
    },
    {
        path: "users",
        display: "Thành viên",
        icon: ""
    },
    {
        path: "add-user",
        display: "Thêm thành viên",
        icon: ""
    },
    {
        path: "tu-truyen/reading",
        display: "Tủ truyện",
        icon: ""
    },
    {
        path: "dang-truyen",
        display: "Đăng truyện",
        icon: ""
    },
    {
        path: "FeedbackAdmin",
        display: "Phản hồi",
        icon: ""
    },
]
export default function Admin() {
    // const user = useSelector(state => state.auth.login?.user);
    const [userInfo, setUserInfo] = useState(null);
    // const { pathname } = useLocation();
    // const dispatch = useDispatch();
    // const active = menu.findIndex(e => e.path === pathname.split('/')[2]);

    // useEffect(() => {
    //   const getUser = async () => {
    //     const res = getData(await apiMain.getUserInfo(user, dispatch, loginSuccess));
    //     setUserInfo(res.userInfo)
    //   }
    //   getUser()
    // }, [])



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
        </>
    )
}


