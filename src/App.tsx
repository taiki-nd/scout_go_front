import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './components/page/user/signup/SignUp';
import { SignUp2 } from './components/page/user/signup/SignUp2';

function App() {
  return (
    <>
      <body>
        <BrowserRouter>
          <main className="container">
            {
              //header, menu
            }

            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup2" element={<SignUp2 />} />
            </Routes>

            {
              // footer
            }
          </main>
        </BrowserRouter>
      </body>
    </>
  );
}

export default App;
