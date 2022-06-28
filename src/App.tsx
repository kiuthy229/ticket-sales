import React from 'react';
import logo from './logo.svg';
import { Routes, BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import DanhSachVe from "./components/lists/danh-sach-ve";
import CapNhatVe from './components/features/cap-nhat-ve';
import './App.css';
import TaoVe from './components/features/tao-ve';
import NavBar from './components/navbar/navbar';
import PieChart from './components/dashboard/piechart';
import LineChart from './components/dashboard/linechart';
import DashBoard from './components/dashboard/dashboard';
import DoiSoatVe from './components/lists/doi-soat-ve';
import LocVe from './components/features/loc-ve';
import DanhSachGoiVe from './components/lists/danh-sach-goi-ve';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>

          <Route path='/filter' element={<LocVe/>}/>
          <Route path='/control' element={<DoiSoatVe/>}/>
          <Route path='/pack-list' element={<DanhSachGoiVe/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/linechart' element={<LineChart/>}/>
          <Route path='/piechart' element={<PieChart/>}/>
          <Route path='/create' element={<TaoVe/>}/>
          <Route path='/update' element={<CapNhatVe/>}/>
          <Route path='/list' element={<DanhSachVe/>}/>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
