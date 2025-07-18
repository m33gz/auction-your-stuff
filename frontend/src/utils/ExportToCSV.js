export function exportToCSV(data, filename) {
    if (!data || data.length === 0) return;
  
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // header row
      ...data.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
      )
    ];
  
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
  
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  }
  