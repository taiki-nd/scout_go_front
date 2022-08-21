import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/part/Header';
import { Footer } from './components/part/Footer';
import { SignUp } from './components/page/user/signup/SignUp';
import { SignUp2 } from './components/page/user/signup/SignUp2';
import { SignIn } from './components/page/user/signin/SignIn';
import { UserShow } from './components/page/user/show/UserShow';
import { useState, useEffect } from 'react';
import { auth } from './utils/firebase';
import axios from 'axios';

function App() {
  const [uuid, setUuid] = useState("");
  const [id, setId] = useState(Number);
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * getUserShow
   * ユーザーの詳細情報を取得
   */
  useEffect(() => {
    const getUserShow = async () => {
      // signIn状態の確認
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('user signed in');
          setUuid(user.uid);
        } else {
          console.log('user not signed in');
          return <Navigate to='/' />
        }
      })
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
    getUserShow();
  }, [])
  return (
    <>
      <body>
        <BrowserRouter>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup2" element={<SignUp2 />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path={`/user/${id}`} element={<UserShow />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </body>
    </>
  );
}

export default App;
