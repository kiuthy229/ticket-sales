import avatar from '../../images/avatar1.png';
import bell from '../../images/fi_bell.png';
import mail from '../../images/fi_mail.png';
import webicon from '../../images/insight.png'
import home from '../../images/home.png';
import manage from '../../images/manage.png';
import control from '../../images/control.png';
import settings from '../../images/settings.png';
import { NavLink, Link } from 'react-router-dom';

const NavBar = (props: any) =>{
    const { location } = props;
    return(
    <div>
        
        <div className='search-top' >
            <input type="text" placeholder='Search'/>
        </div>

        <div className='top-icon'>
            <img style={{width:'24px', height:'24px'}} src={mail}/>
            <img style={{width:'24px', height:'24px'}} src={bell}/>
            <img style={{width:'32px', height:'32px'}} src={avatar} />
        </div>
          {/* <a className='avatar'><img src='../../../public/avatar.jpg'></img></a> */}
          <div className="menu">
            <div className='web-icon'>
                <img style={{width:'130px', height:'55px'}} src={webicon}/>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink className="nav-link home" to="/dashboard">
                    <img src={home}/>
                        Trang Chủ
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link manage" to="/list">
                    <img src={manage}/>
                        Quản lý vé
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link control" to="/control">
                    <img src={control}/>
                        Đối soát vé
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link settings" to="/pack-list">
                    <img src={settings}/>
                    Cài đặt</NavLink>
                    <NavLink className='nav-child' to="/pack-list">Gói dịch vụ</NavLink>
                </li>
                
                
                
            </ul>

          </div>


            
    </div>);
}
export default NavBar;