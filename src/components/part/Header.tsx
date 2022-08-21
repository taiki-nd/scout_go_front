import { useState ,useEffect } from "react";
import { signOut } from 'firebase/auth'
import './Header.css'
import { NavLink } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import axios from "axios";

export const Header = () => {
  const [signInStatus, setSignInStatus] = useState(false);
  const [uuid, setUuid] = useState("");
  const [id, setId] = useState(Number);
  const [errorMessage, setErrorMessage] = useState("");

  // signIn状態の確認
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user signed in');
        setSignInStatus(true);
        setUuid(user.uid);
      } else {
        console.log('user not signed in');
      }
    })
    const getId = async () => {
      try {
        console.log('uuid', uuid);
        const { data } = await axios.get('/get_user_from_uuid', {
          params: {
            uuid: uuid
          }
        });
        console.log(data);
        setId(data.data.id);
      } catch (e: any) {
        console.error('error:', e.message);
        setErrorMessage("通信障害が発生しました。")
      }
    }
    getId();
  }, [signInStatus])

  /**
   * clickSignout
   * サインアウト処理
   */
  const clickSignout = async () => {
    signOut(auth).then(() => {
      console.log("ログアウトしました");
      setSignInStatus(false);
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
          <NavLink to={`/users/${id}`} className="p-2 link-secondary">MyPage</NavLink>
          <NavLink to="/" className="p-2 link-secondary">Activities</NavLink>
          {
            signInStatus
            ? <NavLink to="/" className="p-2 link-secondary">ScoutedList</NavLink>
            : <></>
          }
          <NavLink to="/" className="p-2 link-secondary">Form</NavLink>
          {
            signInStatus
            ? <NavLink className="p-2 link-secondary" to="/signin" onClick={clickSignout}>SignOut</NavLink>
            : <NavLink className="p-2 link-secondary" to="/signin">SignIn/SignUp</NavLink>
          }
        </nav>
      </div>
    </>
  );
}