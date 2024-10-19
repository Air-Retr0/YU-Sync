
const SignInCard = () => {
  return (
    <div className="flex justify-center items-center min-h-[27vh]">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-4xl text-red-500">Login</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-slate-100"
              required />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-slate-100"
              required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-outline btn-error">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignInCard;