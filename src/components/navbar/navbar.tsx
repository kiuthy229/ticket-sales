
const NavBar = () =>{
    return(
    <div>
        <input className='search-top' type="text"/>
          {/* <a className='avatar'><img src='../../../public/avatar.jpg'></img></a> */}
          <div className="menu">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">
                        Trang Chủ
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Quản lý vé
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Đối soát vé
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled"
                        href="/list">Cài đặt</a>
                </li>
            </ul>
          </div>
            
          <div className='rendered-item'></div>
    </div>);
}
export default NavBar;