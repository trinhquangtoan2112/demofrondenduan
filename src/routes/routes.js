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
        path: "ButDanh",
        element: <ButDanh></ButDanh>,
        auth: true,
        roles: [],
    },
    {
        index: 9,
        path: "ButDanhAdmin",
        element: <ButDanhAdmin></ButDanhAdmin>,
        auth: false,
        roles: [],
    }  
];

export default ROUTES;