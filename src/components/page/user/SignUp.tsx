import "./SignUp.css"
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { useState, useCallback, SyntheticEvent } from "react";
import { auth } from "../../../utils/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { errorMessageConstants } from "../../../config/constant";
import { passwordPattern } from "../../../utils/regularExpressions";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [authMessage, setAuthMessage] = useState("")

  /**
   * signUpWithEmail
   * user登録処理
   */
  const signUpWithEmail = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

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

  return (
    <>
      <div className="signup-form">
        <form className="container" onSubmit={signUpWithEmail}>
          <h2>Create Account</h2>
          <p className="hint-text">Sign up with your social media account or email address</p>
          <div className="social-btn text-center">
            <a href="#" className="btn btn-dark btn-lg "><AiFillGithub /> GitHub</a>
            <a href="#" className="btn btn-danger btn-lg"><AiFillGoogleCircle /> Google</a>
          </div>
          <div className="or-seperator"><b>or</b></div>
          {
            authMessage == '' ? 
            <div className="alert alert-light" role="alert">write info below</div> 
            : <div className="alert alert-danger" role="alert">{authMessage}</div>
          }
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
        <div className="text-center">Already have an account? <a href="#">Login here</a></div>
      </div>
    </>
  );
}