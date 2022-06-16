import React from 'react';
import logo from './logo.svg';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import DanhSachVe from "./components/danh-sach-ve/danh-sach-ve";
import CapNhatVe from './components/tao-ve/cap-nhat-ve';
import './App.css';
import TaoVe from './components/tao-ve/tao-ve';
import NavBar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Routes>
          <Route path='/create' element={<TaoVe/>}/>
          <Route path='/update' element={<CapNhatVe/>}/>
          <Route path='/list' element={
            <DanhSachVe/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
