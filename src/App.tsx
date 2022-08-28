import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/part/Header';
import { Footer } from './components/part/Footer';
import { SignUp } from './components/page/user/signup/SignUp';
import { SignUp2 } from './components/page/user/signup/SignUp2';
import { SignIn } from './components/page/user/signin/SignIn';
import { UserMyPage } from './components/page/user/show/UserMyPage';
import { UserMyPageEdit } from './components/page/user/show/UserMyPageEdit';

function App() {
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
              <Route path="/mypage/:id" element={<UserMyPage />} />
              <Route path="/mypage/:id/edit" element={<UserMyPageEdit />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </body>
    </>
  );
}

export default App;
