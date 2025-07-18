import React from 'react';
import BoughtItemsReport from './BoughtItemsReport';
import ActiveListingsReport from './ActiveListingsReport';
import TableDumpReport from './TableDumpReport';

export default function AdminReports() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Reports</h1>
      <BoughtItemsReport />
      <ActiveListingsReport />
      <TableDumpReport />
    </div>
  );
}
