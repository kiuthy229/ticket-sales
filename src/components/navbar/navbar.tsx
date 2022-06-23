import avatar from '../../images/avatar1.png';
import bell from '../../images/fi_bell.png';
import mail from '../../images/fi_mail.png';
import webicon from '../../images/insight.png'
const NavBar = () =>{
    //const avatar = require('../../../public/avatar1.png');
    return(
    <div>
        
        <div className='search-top' >
            <input type="text" placeholder='Search'/>
        </div>

        <div className='top-icon'>
            <img src={mail}/>
            <img src={bell}/>
            <img src={avatar} />
        </div>
          {/* <a className='avatar'><img src='../../../public/avatar.jpg'></img></a> */}
          <div className="menu">
            <div className='web-icon'>
                <img src={webicon}/>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">
                        Trang Chủ
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/list">
                        Quản lý vé
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/control">
                        Đối soát vé
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled"
                        href="#">Cài đặt</a>
                </li>
            </ul>
          </div>


            
    </div>);
}
export default NavBar;