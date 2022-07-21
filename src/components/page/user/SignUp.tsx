import "./SignUp.css"
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'
import { useState, useCallback, SyntheticEvent } from "react";
import { auth } from "../../../utils/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordState, setPasswordState] = useState(true);

  const submit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.log("password does not match")
      setPasswordState(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log('res: ', res);
      } catch (e) {
        console.error(e);
      }
    }

  }, [email, password, passwordConfirm]);

  return (
    <>
      <div className="signup-form">
        <form className="container" onSubmit={submit}>
          <h2>Create Account</h2>
          <p className="hint-text">Sign up with your social media account or email address</p>
          <div className="social-btn text-center">
            <a href="#" className="btn btn-dark btn-lg "><AiFillGithub /> GitHub</a>
            <a href="#" className="btn btn-danger btn-lg"><AiFillGoogleCircle /> Google</a>
          </div>
          <div className="or-seperator"><b>or</b></div>
          {
            passwordState ? 
            <div className="alert alert-light" role="alert">write info below</div> 
            : <div className="alert alert-danger" role="alert">password does not match</div>
          }
          <div className="form-group">
            <input type="email" className="form-control input-lg" name="email" placeholder="Email Address" required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="password" placeholder="Password" required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="confirm_password" placeholder="Confirm Password" required
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