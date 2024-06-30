import { Route, Routes } from 'react-router-dom';
import Homelayout from '../layout/HomeLayout/Homelayout';
import ROUTES from './routes';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homelayout />} >
                {ROUTES.map((route, index) => {
                    return <Route key={index} path={route.path} element={route.element} />;
                })}
            </Route>
            {/* {ROUTES.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
            })} */}
        </Routes>
    );
};

export default AppRoutes;