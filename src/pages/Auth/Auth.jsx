import React, { useState } from 'react';
import { loginUser, registerUser } from '../../api/api';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user)); // ✅ Store user
          window.location.href = '#/';
        } else {
          setError(res.message || 'Login failed. Please check credentials.');
        }
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        const res = await registerUser(username, email, password);

        if (res?.error) {
          setError(res.error);
        } else {
          const successMessage = res?.message || 'Registration successful!';
          setMessage(successMessage + ' Redirecting to login...');

          setTimeout(() => {
            window.location.href = '/Auth';
          }, 2000);
        }
      }
    } catch (err) {
      setError(err.message || err.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-600 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-extrabold text-center mb-4">
          {isLogin ? '👋 Welcome Back to Guardify' : '🚀 Join Guardify Today'}
        </h2>

        <p className="text-center text-indigo-200 text-sm mb-6">
          {isLogin
            ? 'Securely access your dashboard with your credentials.'
            : 'Create an account to protect your digital world.'}
        </p>

        {error && <div className="text-red-300 mb-3 text-sm text-center">{error}</div>}
        {message && <div className="text-green-300 mb-3 text-sm text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative group">
              <FaUser className="absolute left-3 top-3.5 text-gray-300" />
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none"
                required
              />
            </div>
          )}

          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-300" />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-3 top-3.5 text-gray-300" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 py-2 w-full bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-gray-300 cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {!isLogin && (
            <div className="relative group">
              <FaLock className="absolute left-3 top-3.5 text-gray-300" />
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 py-2 w-full bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300"
                required
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3.5 text-gray-300 cursor-pointer"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 transition font-semibold text-white"
            disabled={loading || !isValidEmail(email)}
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div
          className="text-center mt-5 text-sm text-indigo-100 cursor-pointer hover:underline"
          onClick={toggleMode}
        >
          {isLogin
            ? "Don't have an account? Register now"
            : 'Already a member? Log in'}
        </div>
      </div>
    </div>
  );
}
