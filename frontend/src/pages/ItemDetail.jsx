import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'items', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchItem();
  }, [itemId]);

  if (!item) return <p>Loading item...</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '400px' }} />
      <p><strong>Price:</strong> ${item.startingPrice}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Status:</strong> {item.status}</p>
      <p><strong>Highest Bid:</strong> ${item.highestBid || 'None yet'}</p>
      <p><strong>Start Time:</strong> {item.startTime?.toDate().toLocaleString()}</p>
      <p><strong>End Time:</strong> {item.endTime?.toDate().toLocaleString()}</p>

      <Link to={`/items/${item.id}/bids`}>
        <button style={{ marginTop: '20px' }}>Place a Bid</button>
      </Link>
    </div>
  );
}

