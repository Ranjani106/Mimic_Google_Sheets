/**
 * Download data as a file.
 * @param {string} fileType - File type ('json' or 'csv').
 * @param {string} fileName - Name of the file.
 * @param {string} data - Data to save.
 */
export function downloadData(fileType, fileName, data) {
    const blob = new Blob([data], { type: fileType === 'csv' ? 'text/csv' : 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
