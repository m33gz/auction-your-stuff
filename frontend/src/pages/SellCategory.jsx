import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import './SellCategory.css';

export default function SellCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      let imageUrl = '';

      // ✅ Upload image if provided
      if (imageFile) {
        const imageRef = ref(storage, `auction_images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // ✅ Define start and end time (7 days from now)
      const startTime = Timestamp.now();
      const endTime = Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

      // ✅ Create a new document reference with an auto ID
      const itemRef = doc(collection(db, 'items'));
      const itemId = itemRef.id;

      // ✅ Save item using setDoc so we can use itemId
      await setDoc(itemRef, {
        title,
        description,
        startingPrice: parseFloat(startingPrice),
        imageUrl,
        sellerId: user.uid,
        categoryId: category,
        createdAt: startTime,
        startTime,
        endTime,
        status: 'active'
      });

      alert('Item listed successfully!');
      navigate(`/buy/items/${itemId}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="sell-container">
      <h2>Sell in: {category}</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <div>
          <label>Item Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Rolex Watch"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g., Brand new condition, 4 years old"
            required
            rows={4}
          />
        </div>
        <div>
          <label>Starting Price ($):</label>
          <input
            type="number"
            value={startingPrice}
            onChange={e => setStartingPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'List Item'}
        </button>
      </form>
    </div>
  );
}



