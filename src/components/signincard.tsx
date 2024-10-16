import github from '../images/github-mark-white.png';
import google from '../images/google.png';
import facebook from '../images/facebook.png';
import { Link } from 'react-router-dom';

const SignInCard = () => {
  return (
    <div className="flex justify-center items-center min-h-[27vh] p-5">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl p-4">
        <form className="card-body">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-3xl text-red-500 mb-2">Sign in</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-slate-100"
              required
            />
          </div>
          <div className="form-control mb-2">
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-slate-100"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover text-black">Forgot password?</a>
            </label>
          </div>

          <div className="form-control mt-2">
            <button className="btn btn-outline btn-error">Login</button>
          </div>

          <div className="flex items-center justify-center my-2">
            <div className="flex-grow h-px bg-black"></div>
            <span className="px-4 text-xl text-red-500">OR</span>
            <div className="flex-grow h-px bg-black"></div>
          </div>

          <div className="flex flex-col space-y-1 mt-1">
            <button className="btn btn-success text-white flex items-center">
              <img src={google} alt={"Google Logo"} className='h-6 w-6 mr-2' />
              Login with Google
            </button>
            <button className="btn btn-info text-white flex items-center">
              <img src={facebook} alt={"Facebook logo"} className='h-6 w-6 mr-2' />
              Login with Facebook
            </button>
            <button className='btn btn-neutral text-white flex items-center'>
              <img src={github} alt={"Github Logo"} className='h-6 w-6 mr-2' />
              Login with Github
            </button>
          </div>

          <div className="flex items-center justify-center my-3">
            <div className="flex-grow h-px bg-black"></div>
          </div>
          <div className="flex items-center justify-center my-3">
            <span className="px-4 text-lg text-black">First Time? &nbsp;
              <Link to='/signup' className="link link-error text-lg">Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInCard;
