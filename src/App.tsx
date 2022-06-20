import React from 'react';
import logo from './logo.svg';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import DanhSachVe from "./components/danh-sach-ve/danh-sach-ve";
import CapNhatVe from './components/tao-ve/cap-nhat-ve';
import './App.css';
import TaoVe from './components/tao-ve/tao-ve';
import NavBar from './components/navbar/navbar';
import PieChart from './components/piechart-goigiadinh';
import LineChart from './components/linechart';
import DashBoard from './components/dashboard';
import DoiSoatVe from './components/danh-sach-ve/doi-soat-ve';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Router>
        <Routes>
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
