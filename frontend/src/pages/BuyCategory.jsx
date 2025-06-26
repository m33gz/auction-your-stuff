import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const BuyCategory = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const q = query(
          collection(db, 'auctions'),
          where('category', '==', category),
          where('status', '==', 'active')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (err) {
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [category]);

  if (loading) return <p>Loading {category} items...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} for Sale</h2>
      {items.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: '250px',
                backgroundColor: '#fafafa'
              }}
            >
              {item.imageUrl && (
                <img src={item.imageUrl} alt="Item" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              )}
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Starting Price:</strong> ${item.startingPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyCategory;
