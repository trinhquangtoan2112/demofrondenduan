import SearchComponents from "../compoment/ContentCompoment/SearchComponents";
import SectionTypeComponents from "../compoment/ContentCompoment/SectionTypeComponents";
import HomePage from "../pages/HomePages/HomePage";
import ReadingPages from "../pages/ReadingPages/ReadingPages";
import UserPage from "../pages/UserPage/UserPage";

const ROUTES = [
    {
        index: true,
        path: '',
        element: <HomePage></HomePage>,
        auth: true,
        roles: []
    },
    {
        index: true,
        path: '/reading/*',
        element: <ReadingPages></ReadingPages>,
        auth: false,
        roles: []
    },
    {
        index: true,
        path: 'searching',
        element: <SearchComponents></SearchComponents>,
        auth: false,
        roles: []
    },
    {
        index: true,
        path: '/detail',
        element: <UserPage></UserPage>,
        auth: false,
        roles: []
    },
    {
        index: true,
        path: '/content/:section',
        element: <SectionTypeComponents></SectionTypeComponents>,
        auth: false,
        roles: []
    },

];

export default ROUTES;