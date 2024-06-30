import logo from './logo.svg';
import './App.css';
import "./scss/_index.scss"
import { useSelector } from 'react-redux';
import HeaderFile from './components/HeaderFile';
import Comment from './components/Comment';
import Home from './layout/Home/Home';
import Account from './layout/Account/Account';
import AddUser from './layout/Account/AddUser';
import Admin from './layout/Account/Admin';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/RoutesIndex';


function App() {

  return (
    <BrowserRouter>

      <HeaderFile></HeaderFile>
      <Admin></Admin>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
