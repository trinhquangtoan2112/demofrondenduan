import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Home from '../layout/Home/Home';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} >
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