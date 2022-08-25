import "./SignUp.css"
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { auth } from "../../../../utils/firebase";
import { signInWithPopup, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { errorMessageConstants } from "../../../../config/constant";
import { passwordPattern } from "../../../../utils/regularExpressions";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(['scout_go_uuid']);

  /**
   * signUpWithEmail
   * user登録処理
   */
  const signUpWithEmail = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log('signUp with Email');

    // passwordの確認
    if (password !== passwordConfirm) {
      setAuthMessage(errorMessageConstants.passwordMatchingError);
    } else if (!password.match(passwordPattern) || !passwordConfirm.match(password)) {
      console.log(password.match(passwordPattern))
      setAuthMessage(errorMessageConstants.passwordPatternError)
    } else {
      // firebaseへのuser登録
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log('res: ', res);
        setCookie("scout_go_uuid", res.user.uid);
      } catch (e :any) {
        console.error('firebase error code:', e.code);
        switch (e.code) {
          case 'auth/email-already-in-use':
            setAuthMessage(errorMessageConstants.firebaseEmailExistError);
            break;
          case 'auth/invalid-email':
            setAuthMessage(errorMessageConstants.firebaseInvalidEmailError);
            break;
        }
      }
    }
  }, [email, password, passwordConfirm]);

  /**
   * signUpWithGitHub
   * user登録処理
   */
  const signUpWithGitHub = useCallback(async () => {
    console.log('signUp with GitHub');
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('user: ', user);
      setCookie("scout_go_uuid", user.uid);
    }).catch((error) => {
      const errorCode = error.code;
      console.log('error code: ', errorCode)
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
  }, [])

  /**
   * signUpWithGoogle
   * user登録処理
   */
  const SignUpWithGoogle = useCallback(async () => {
    console.log('signUp with Google');
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('user: ', user);
      setCookie("scout_go_uuid", user.uid);
    }).catch((error) => {
      const errorCode = error.code;
      console.log('error code: ', errorCode)
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }, [])

  if (Object.keys(cookies).length !== 0) {
    return (
      <Navigate to='/signup2' />
    );
  }

  return (
    <>
      <div className="signup-form">
        <form className="container" onSubmit={signUpWithEmail}>
          <h2>Create Account</h2>
          <div className="text-center">アカウントがある場合はこちら</div>
          <h3 className="text-center"><Link to="/signin">SignIn</Link></h3>
          <p className="hint-text">Sign up with your social media account or email address</p>
          {
            authMessage === '' 
            ? <div></div> 
            : <div className="alert alert-danger" role="alert">{authMessage}</div>
          }
          <div className="social-btn text-center">
            <div className="btn btn-dark btn-lg" onClick={signUpWithGitHub}><AiFillGithub /> GitHub</div>
            <div className="btn btn-danger btn-lg" onClick={SignUpWithGoogle}><AiFillGoogleCircle /> Google</div>
          </div>
          <div className="or-seperator"><b>or</b></div>
          <div className="form-group">
            <input type="email" className="form-control input-lg" name="email" placeholder="Email Address" required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="password" placeholder="Password"
              required pattern="(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,}" title="半角英大文字・半角英小文字・半角数字いれずれも必ず含む6文字以上"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="confirm_password" placeholder="Confirm Password" required
              pattern="(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,}" title="半角英大文字・半角英小文字・半角数字いれずれも必ず含む6文字以上"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block signup-btn">Sign Up</button>
          </div>
        </form>
        <div className="text-center">Already have an account? <Link to="/signin">Login here</Link></div>
      </div>
    </>
  );
}