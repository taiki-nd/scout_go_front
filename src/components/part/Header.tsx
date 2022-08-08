import { signOut } from 'firebase/auth'
import './Header.css'
import { NavLink } from 'react-router-dom';
import { auth } from '../../utils/firebase';

export const Header = () => {
  const clickLogout = async () => {
    signOut(auth).then(() => {
      console.log("ログアウトしました");
    })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  }

  return (
    <>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 text-center">
            <a className="fs-1 text-dark" href="/">ScoutGo</a>
          </div>
        </div>
      </header>
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <NavLink to="/" className="p-2 link-secondary">MyPage</NavLink>
          <NavLink to="/" className="p-2 link-secondary">Activities</NavLink>
          <NavLink to="/" className="p-2 link-secondary">ScoutedList</NavLink>
          <NavLink to="/" className="p-2 link-secondary">Form</NavLink>
          <NavLink className="p-2 link-secondary" to="/signin" onClick={clickLogout}>SignOut</NavLink>
        </nav>
      </div>
    </>
  );
}