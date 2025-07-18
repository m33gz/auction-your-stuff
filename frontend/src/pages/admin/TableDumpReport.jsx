import React, { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { exportToCSV } from '../../utils/ExportToCSV'; // ✅ using your helper

const collections = ['users', 'items', 'bids']; // Add other collection names as needed

export default function TableDumpReport() {
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!selectedTable) return alert('Please select a collection');
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, selectedTable));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      exportToCSV(data, `dump_${selectedTable}_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (err) {
      console.error('Error exporting table:', err);
      alert('Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Full Table Dump Report</h2>
      <div>
        <label>Select Collection: </label>
        <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
          <option value="">-- Choose --</option>
          {collections.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>
      <button onClick={handleExport} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Exporting...' : 'Export to CSV'}
      </button>
    </div>
  );
}
