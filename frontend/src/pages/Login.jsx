import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginAttempts >= 3) {
      alert("Too many failed attempts. Redirecting to home.");
      navigate('/');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      setError('');
      navigate('/buy');
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      setError("Incorrect username/password");

      if (loginAttempts + 1 >= 3) {
        alert("Too many failed attempts. Redirecting to home.");
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
