import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';

export default function PlaceBid() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert('You must be logged in to place a bid.');
      return;
    }

    await addDoc(collection(db, `items/${itemId}/bids`), {
      bidderId: auth.currentUser.uid,
      bidderName: name,
      shippingAddress: address,
      amount: parseFloat(bidAmount),
      timestamp: serverTimestamp()
    });

    alert('Bid submitted!');
    navigate(`/items/${itemId}`);
  };

  return (
    <div>
      <h2>Place a Bid</h2>
      <form onSubmit={handleSubmit}>
        <label>Bid Amount: <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} required /></label><br />
        <label>Name: <input type="text" value={name} onChange={e => setName(e.target.value)} required /></label><br />
        <label>Shipping Address: <textarea value={address} onChange={e => setAddress(e.target.value)} required /></label><br />
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}
