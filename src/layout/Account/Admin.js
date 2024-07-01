import React, { eEffect, useState } from 'react'

import StoryDetail from '../StoryDetail/StoryDetail';
const menu = [
    {
        path: "profile",
        display: "Hồ sơ",
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
        <div className='admin-main' >
            <div className="main-content">
                <div className="d-flex">
                    <div className="col-3">
                        <ul className="list-group">
                            {/* {
                  menu.map((item, index) => {
                    return <li key={index} className={`list-group__item ${index === active ? 'active' : ''}`} ><Link to={item.path}>{item.display}</Link></li>
                  })
                } */}
                            <StoryDetail></StoryDetail>
                        </ul>

                    </div>
                    <div className="col-9 " style={{ 'minHeight': '500px' }}>
                        {/* <Routes>
                <Route path='profile' element={<Profile userInfo={userInfo}/>}></Route>
                <Route path='change-password' element={<ChangePassword />}></Route>
                <Route path='users' element={<Users dispatch={dispatch}/>}></Route>
                <Route path='tu-truyen/*' element={<TuTruyen userInfo={userInfo}/>}></Route>
                <Route path='dang-truyen' element={<CreateNovel  userInfo={userInfo}  />}></Route>
              </Routes> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


