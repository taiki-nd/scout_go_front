import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { auth } from "../../../../utils/firebase";
import { useCallback } from 'react';
import { SyntheticEvent } from 'react';

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [signInStatus, setSignInStatus] = useState(false);

  // signIn状態の確認
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user signed in');
        setSignInStatus(true);
      } else {
        console.log('user not signed in');
      }
    })
  }, [])

  /**
   * signIpWithEmail
   * userサインイン処理
   */
  const signInWithEmail = (event: any) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('ログイン成功:', user.user.uid)
      })
      .catch((error) => {
        console.error(error)
      })
  };

  /**
   * signInWithGitHub
   * userサインイン処理
   */
  const SignInWithGitHub = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log('signIn with github')

    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  }, [])

  /**
   * signInWithGoogle
   * userサインイン処理
   */
  const SignInWithGoogle = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log('signIn with google')

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, [])

  if (signInStatus === true) {
    return (
      <Navigate to='/' />
    );
  }

  return (
    <>
      <div className="signup-form">
        <form className="container" onSubmit={signInWithEmail}>
          <h2>SignIn</h2>
          <div className="text-center">アカウントがない場合はこちら</div>
          <div className="text-center"><Link to="/signup">SignUp</Link></div>
          <p className="hint-text">Sign in with your social media account or email address</p>
          {
            authMessage === ''
              ? <div></div>
              : <div className="alert alert-danger" role="alert">{authMessage}</div>
          }
          <div className="social-btn text-center">
            <div className="btn btn-dark btn-lg" onClick={SignInWithGitHub}><AiFillGithub /> GitHub</div>
            <div className="btn btn-danger btn-lg" onClick={SignInWithGoogle}><AiFillGoogleCircle /> Google</div>
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
            <button type="submit" className="btn btn-success btn-lg btn-block signup-btn">Sign In</button>
          </div>
        </form>
      </div>
    </>
  );
}