
import './App.css';
import "./scss/_index.scss"
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/RoutesIndex';


function App() {

  return (
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
