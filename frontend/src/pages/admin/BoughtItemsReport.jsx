import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';
import { exportToCSV } from '../../utils/ExportToCSV';

const categories = ['electronics', 'jewelry', 'antiques', 'watches', 'home-garden', 'automobiles'];

export default function BoughtItemsReport() {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!category || !date) return alert('Please select category and date');

    setLoading(true);
    try {
      const selectedDate = new Date(date);
      const start = Timestamp.fromDate(new Date(selectedDate.setHours(0, 0, 0, 0)));
      const end = Timestamp.fromDate(new Date(selectedDate.setHours(23, 59, 59, 999)));

      const q = query(
        collection(db, 'items'),
        where('categoryId', '==', category),
        where('soldDate', '>=', start),
        where('soldDate', '<=', end)
      );

      const snapshot = await getDocs(q);

      const data = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const item = docSnap.data();
        const buyerRef = doc(db, 'users', item.buyerId);
        const buyerSnap = await getDoc(buyerRef);
        const buyer = buyerSnap.exists() ? buyerSnap.data() : {};
        return {
          itemId: docSnap.id,
          title: item.title,
          soldPrice: item.soldPrice,
          soldDate: item.soldDate.toDate().toLocaleString(),
          buyerName: buyer.fullName || 'N/A',
          buyerEmail: buyer.email || 'N/A',
          buyerPhone: buyer.phone || 'N/A'
        };
      }));

      exportToCSV(data, `bought_items_${category}_${date}.csv`);
    } catch (err) {
      console.error('Failed to generate report:', err);
      alert('Error generating report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Bought Items Report</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate CSV'}
      </button>
    </div>
  );
}

