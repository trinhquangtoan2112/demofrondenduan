import ChangePassword from "../layout/Account/ChangePassword";
import Profile from "../layout/Account/Profile";
import User from "../layout/Account/User";
import Active from "../layout/Actiive/Active";
import Chapter from "../layout/Chapter/Chapter";
import Home from "../layout/Home/Home";
import HomePage from "../layout/HomePage";
import Admin from './../layout/Account/Admin';
import Feedback from './../layout/Feedback/Feedback';
import FeedbackAdmin from '../layout/Feedback/FeedbackAdmin';

import ButDanh from '../layout/Butdanh/ButDanh';
import ButDanhAdmin from '../layout/Butdanh/ButDanhAdmin';
import TheLoaiAdmin from '../layout/TheLoai/TheLoaiAdmin';

import TuTruyen, { AddChapter, EditChapter, EditNovel, ListButDanh, ListChap, StoryCreate } from './../layout/Account/TuTruyen';
import CreateNovel from './../layout/Account/CreateNovel';
import StoryDetail from "../layout/StoryDetail/StoryDetail";



const ROUTES = [
    {
        index: 1,
        path: 'UserDetail',
        element: <Profile></Profile>,
        auth: true,
        roles: [],

    },
    {
        index: 2,
        path: '',
        element: <HomePage></HomePage>,
        auth: true,
        roles: [],

    },
    {
        index: 3,
        path: 'authenAccount',
        element: <Active></Active>,
        auth: true,
        roles: [],

    },
    {
        index: 4,
        path: 'ChangePassword',
        element: <ChangePassword></ChangePassword>,
        auth: true,
        roles: [],

    },
    {
        index: 5,
        path: '',
        element: <User></User>,
        auth: false,
        roles: [],

    },
    {
        index: 6,
        path: "truyen/:name/:maChuong",
        element: <Chapter></Chapter>,
        auth: true,
        roles: [],
    },
    {
        index: 7,
        path: "Feedback",
        element: <Feedback></Feedback>,
        auth: true,
        roles: [],
    },
    {
        index: 8,
        path: "FeedbackAdmin",
        element: <FeedbackAdmin></FeedbackAdmin>,
        auth: false,
        roles: [],
    },
    {
        index: 9,
        path: "DangTruyen/:idButDanh",
        element: <CreateNovel></CreateNovel>,
        auth: true,
        roles: [],
    },
    {

        index: 19,
        path: "ButDanhAdmin",
        element: <ButDanhAdmin></ButDanhAdmin>,
        auth: false,
        roles: [],
    }  ,
    {
        index: 18,
        path: "TheLoaiAdmin",
        element: <TheLoaiAdmin></TheLoaiAdmin>,
        auth: false,
        roles: [],
    },  
{
        index: 10,
        path: "CapNhapTruyen/:id",
        element: <EditNovel></EditNovel>,
        auth: true,
        roles: [],
    },
    {
        index: 11,
        path: "truyen/:id",
        element: <StoryDetail></StoryDetail>,
        auth: true,
        roles: [],
    },
    {
        index: 12,
        path: "QuanLyTruyen/:id",
        element: <TuTruyen></TuTruyen>,
        auth: true,
        roles: [],
    },
    {
        index: 13,
        path: "QuanLyChuong/:idChuong",
        element: <ListChap></ListChap>,
        auth: true,
        roles: [],
    },
    {
        index: 14,
        path: "ChinhSuaChuong/:idChuong",
        element: <EditChapter></EditChapter>,
        auth: true,
        roles: [],
    },
    {
        index: 15,
        path: "ThemTruyen/:idChuong",
        element: <AddChapter></AddChapter>,
        auth: true,
        roles: [],
    },
    {
        index: 16,
        path: "ButDanh",
        element: <ButDanh></ButDanh>,
        auth: true,
        roles: [],
    },
    {
        index: 17,
        path: "ThemButDanh/:idNguoiDung",
        element: <ListButDanh></ListButDanh>,
        auth: true,
        roles: [],
    }

];

export default ROUTES;