import '../App.css';
import { Link } from "react-router-dom";

function HeaderInLogin() {
  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem('userID');
      document.location.href = '/'
    }
  }
  const toMain = () => {
      document.location.href = '/'
    }
  return (
    <div className="Header">
        <p className="HeaderText" onClick={toMain}>
          편히가계 관리자 웹사이트
        </p>
        <div className="HeaderRouter">
            <a className="HeaderLink" onClick={onLogout}>로그아웃</a>
            <Link to="/service">
            <p className="HeaderLink">고객센터</p>
            </Link>
            <Link to="/notification">
            <p className="HeaderLink">공지사항</p>
            </Link>
        </div>
    </div>
  );
}

export default HeaderInLogin;