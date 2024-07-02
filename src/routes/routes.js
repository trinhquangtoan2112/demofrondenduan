import ChangePassword from "../layout/Account/ChangePassword";
import Profile from "../layout/Account/Profile";
import Active from "../layout/Actiive/Active";
import Home from "../layout/Home/Home";
import HomePage from "../layout/HomePage";
import Admin from './../layout/Account/Admin';


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
        path: 'QuanLy',
        element: <Admin></Admin>,
        auth: false,
        roles: [],

    },
];

export default ROUTES;