import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './components/page/user/signup/SignUp';

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
