import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Home from '../layout/Home/Home';
import { useSelector } from 'react-redux';
import HomeAdmin from '../layout/Home/HomeAdmin';
import Admin from '../layout/Account/Admin';
const AppRoutes = () => {
    const { user, auth, userInfo } = useSelector(state => state.UserReducer);

    return (
        <Routes>
            <Route path='/' element={<Home />} >
                {ROUTES.filter(item => item.auth).map((route, index) => {
                    return <Route key={index} path={route.path} element={route.element} />;
                })}


            </Route>
            <Route path='/admin' element={<Admin />} >
                {userInfo.maQuyen === 1 &&
                    ROUTES.filter(item => !item.auth).map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))
                }

            </Route>
            {/* {ROUTES.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
            })} */}
        </Routes>
    );
};

export default AppRoutes;