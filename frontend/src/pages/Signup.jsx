import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
      <div className="signup-wrapper">
      <div className="signup-container signup-center">
      <h1 className ="signup-title">Create Account to start Connecting!</h1>
      {error && <p style={{ color: 'black' }}>{error}</p>}

      <form onSubmit={handleSignup} className="signup-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        </div> 
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
  );
}