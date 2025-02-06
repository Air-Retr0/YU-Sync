import React, { useState } from 'react'
import { signUpUser } from '../../utils/auth'


const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault() // this fixes automatic page refresh, and doesn't abuse my poor api
    const profile = await signUpUser(email, password, username)
    if (profile) {
      setMessage(`Profile Created: ${JSON.stringify(profile)}`)
    } else {
      setMessage('Sign-up failed. Please try again.')
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSignUp}>
          <div className="form-control">
            <div className="text-center text-xl text-red-500">
              <h2>Sign Up</h2>
            </div>
            <label className="label"></label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered bg-gray-50 placeholder-slate-400 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"></label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered bg-gray-50 placeholder-slate-400 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label"></label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="input input-bordered bg-gray-50 placeholder-slate-400 pr-12 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-black hover:text-gray-600 text-sm"
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-outline btn-error">
              Sign Up
            </button>
          </div>
          <div className='text-sm text-black mt-2'>
            <label htmlFor="forgot-password-modal" className="cursor-pointer text-left">
              Forgot password?
            </label>
          </div>
          <div className='text-sm text-black'>
            <label className='cursor-pointer text-right'>
              Sign In
            </label>
          </div>

          <div className="divider text-red-500">OR</div>

          {message && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          )}
        </form>
      </div>

      <input type="checkbox" id="forgot-password-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="text-lg font-bold text-red-500">Forgot your password?</h3>
          <p className="py-4 text-black">Please enter your email address to receive password reset instructions.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full placeholder-white bg-slate-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="modal-action">
            <label htmlFor="forgot-password-modal" className="btn btn-ghost border-transparent bg-transparent text-black mr-4">Close</label>
            <button className="btn  btn-ghost border-transparent bg-transparent text-black" onClick={() => alert('Password reset instructions sent.')}>
              Send Reset Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
