import "./SignUp.css"
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai'

export const SignUp = () => {
  return (
    <>
      <div className="signup-form">
        <form className="container">
          <h2>Create Account</h2>
          <p className="hint-text">Sign up with your social media account or email address</p>
          <div className="social-btn text-center">
            <a href="#" className="btn btn-dark btn-lg "><AiFillGithub /> GitHub</a>
            <a href="#" className="btn btn-danger btn-lg"><AiFillGoogleCircle /> Google</a>
          </div>
          <div className="or-seperator"><b>or</b></div>
          <div className="form-group">
            <input type="email" className="form-control input-lg" name="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control input-lg" name="confirm_password" placeholder="Confirm Password" />
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