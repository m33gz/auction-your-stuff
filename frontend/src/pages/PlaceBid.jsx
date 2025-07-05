import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

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

    try {
      // Get current item
      const itemRef = doc(db, 'items', itemId);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists()) {
        alert('Item not found.');
        return;
      }

      const itemData = itemSnap.data();
      const currentHighestBid = itemData.highestBid || itemData.startingPrice;

      const numericBid = parseFloat(bidAmount);
      if (isNaN(numericBid) || numericBid <= currentHighestBid) {
        alert(`Your bid must be higher than the current highest bid of $${currentHighestBid}`);
        return;
      }

      // Add bid to subcollection
      await addDoc(collection(db, `items/${itemId}/bids`), {
        bidderId: auth.currentUser.uid,
        bidderName: name,
        shippingAddress: address,
        amount: numericBid,
        timestamp: serverTimestamp()
      });

      // Update highest bid in parent item
      await updateDoc(itemRef, {
        highestBid: numericBid,
        highestBidderId: auth.currentUser.uid
      });

      alert('Bid submitted successfully!');
      navigate(`/items/${itemId}`);
    } catch (err) {
      console.error('Error placing bid:', err);
      alert('An error occurred while submitting your bid.');
    }
  };

  return (
    <div>
      <h2>Place a Bid</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bid Amount:
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Shipping Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

