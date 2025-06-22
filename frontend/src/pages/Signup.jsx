import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase'; // assumes you exported `db` from firebase config
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Save additional user info in Firestore
      await setDoc(doc(db, 'users', uid), {
        email,
        username,
        realName,
        shippingAddress,
        createdAt: new Date()
      });

      console.log("Account created successfully");
      navigate('/buy');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container signup-center">
        <h1 className="signup-title">Create Account to start Connecting!</h1>
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
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Real Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={realName}
              onChange={e => setRealName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <input
              type="text"
              placeholder="123 Street, City, State"
              value={shippingAddress}
              onChange={e => setShippingAddress(e.target.value)}
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
