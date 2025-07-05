import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function CategoryItems() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const categoryName = category.replace(/-/g, ' ');
      const q = query(collection(db, 'items'), where('categoryId', '==', categoryName));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, [category]);

  return (
    <div>
      <h2>{category.replace(/-/g, ' ')}</h2>
      {items.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <strong>{item.title}</strong> — ${item.startingPrice} <br />
              <Link to={`/items/${item.id}`}>View Item</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

