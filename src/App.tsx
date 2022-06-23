import React from 'react';
import logo from './logo.svg';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import DanhSachVe from "./components/danh-sach-ve/danh-sach-ve";
import CapNhatVe from './components/CRUD-filter/cap-nhat-ve';
import './App.css';
import TaoVe from './components/CRUD-filter/tao-ve';
import NavBar from './components/navbar/navbar';
import PieChart from './components/piechart-goigiadinh';
import LineChart from './components/linechart';
import DashBoard from './components/dashboard';
import DoiSoatVe from './components/danh-sach-ve/doi-soat-ve';
import LocVe from './components/CRUD-filter/loc-ve';

function App() {
  
  return (
    <div className="App">
      <NavBar></NavBar>
      <Router>
        <Routes>
          <Route path='/filter' element={<LocVe/>}/>
          <Route path='/control' element={<DoiSoatVe/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/linechart' element={<LineChart/>}/>
          <Route path='/piechart' element={<PieChart/>}/>
          <Route path='/create' element={<TaoVe/>}/>
          <Route path='/update' element={<CapNhatVe/>}/>
          <Route path='/list' element={<DanhSachVe/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
