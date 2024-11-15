import React, { useState } from 'react'
import { signUpUser } from '../utils/auth'

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const profile = await signUpUser(email, password, username)
    if (profile) {
      setMessage(`Profile Created: ${JSON.stringify(profile)}`)
    } else {
      setMessage('Sign-up failed. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSignUp}>
          <div className="form-control">
            <div className="text-center text-xl text-red-500">
              <h2>Sign Up</h2>
            </div>
            <label className="label">
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered bg-gray-50 placeholder-slate-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered bg-gray-50 placeholder-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered bg-gray-50 placeholder-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          { /* <span className='label-text text-xs text-'>Forgot password?</span> */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-outline btn-error">
              Sign Up
            </button>
          </div>
          {message && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SignUpForm