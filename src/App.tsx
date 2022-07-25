
import { Routes, BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import DanhSachVe from "./components/lists/danh-sach-ve";
import './App.css';
import NavBar from './components/navbar/navbar';
import DashBoard from './components/dashboard/dashboard';
import DoiSoatVe from './components/lists/doi-soat-ve';
import DanhSachGoiVe from './components/lists/danh-sach-goi-ve';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>   
          <Route path='/control' element={<DoiSoatVe/>}/>
          <Route path='/pack-list' element={<DanhSachGoiVe/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/list' element={<DanhSachVe/>}/>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
