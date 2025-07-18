import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { exportToCSV } from '../../utils/ExportToCSV';

export default function ActiveListingsReport() {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'items'), where('status', '==', 'active'));
      const snapshot = await getDocs(q);

      const now = Date.now();
      const data = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const item = docSnap.data();
        const sellerSnap = await getDoc(doc(db, 'users', item.sellerId));
        const seller = sellerSnap.exists() ? sellerSnap.data() : {};
        const daysOnSale = Math.floor((now - item.startTime.toMillis()) / (1000 * 60 * 60 * 24));
        return {
          itemId: docSnap.id,
          title: item.title,
          startingPrice: item.startingPrice,
          highestBid: item.highestBid || 'No bids',
          sellerName: seller.fullName || 'N/A',
          sellerEmail: seller.email || 'N/A',
          daysOnSale
        };
      }));

      exportToCSV(data, `active_listings_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (err) {
      console.error('Error generating report:', err);
      alert('Error generating report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Active Listings Report</h2>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate CSV'}
      </button>
    </div>
  );
}

