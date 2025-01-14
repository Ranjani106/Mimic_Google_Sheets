import { downloadData } from './utilsDOM.js';
import { Excel } from './excel.js';

// Utility to generate Excel-style column headers (A, B, ..., Z, AA, AB, ...)
function getColumnAddress(index) {
    let address = "";
    while (index >= 0) {
        address = String.fromCharCode((index % 26) + 65) + address;
        index = Math.floor(index / 26) - 1;
    }
    return address;
}

// Function to generate column headers dynamically
function generateColumnHeaders(columns) {
    const headerRow = document.getElementById('column-header');
    headerRow.innerHTML = ""; // Clear any existing headers

    for (let col = 0; col < columns; col++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'column-header-cell';
        headerCell.textContent = getColumnAddress(col); // A, B, ..., Z, AA, etc.
        headerRow.appendChild(headerCell);
    }
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const rows = 50;
    const cols = 27;

    // Initialize the spreadsheet
    const excel = new Excel(rows, cols, 'spreadsheet-container');
    excel.render();
    console.log('Excel rendered');

    // Generate column headers
    generateColumnHeaders(cols);

    // Save JSON functionality
    const saveJsonBtn = document.getElementById('save-json');
    if (saveJsonBtn) {
        saveJsonBtn.addEventListener('click', () => {
            const data = excel.save('json');
            downloadData('json', 'spreadsheet.json', data);
        });
    } else {
        console.error("Button with id 'save-json' not found");
    }

    // Save CSV functionality
    const saveCsvBtn = document.getElementById('save-csv');
    if (saveCsvBtn) {
        saveCsvBtn.addEventListener('click', () => {
            const data = excel.save('csv');
            downloadData('csv', 'spreadsheet.csv', data);
        });
    } else {
        console.error("Button with id 'save-csv' not found");
    }

    // Toolbar operations
    const boldBtn = document.getElementById('bold-btn');
    if (boldBtn) {
        boldBtn.addEventListener('click', () => {
            const selectedCell = document.querySelector('.selected');
            if (selectedCell) {
                selectedCell.style.fontWeight = selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
            } else {
                alert('No cell selected!');
            }
        });
    }

    const italicBtn = document.getElementById('italic-btn');
    if (italicBtn) {
        italicBtn.addEventListener('click', () => {
            const selectedCell = document.querySelector('.selected');
            if (selectedCell) {
                selectedCell.style.fontStyle = selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
            } else {
                alert('No cell selected!');
            }
        });
    }

    // Sum functionality
    const sumBtn = document.getElementById('sum-btn');
    if (sumBtn) {
        sumBtn.addEventListener('click', () => {
            const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
            let sum = 0;

            bodyCells.forEach(cell => {
                const content = cell.textContent.trim();
                const value = parseFloat(content);
                if (!isNaN(value)) {
                    sum += value;
                }
            });

            alert(`Sum: ${sum}`);
        });
    }

    // Average functionality
    const averageBtn = document.getElementById('average-btn');
    if (averageBtn) {
        averageBtn.addEventListener('click', () => {
            const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
            let total = 0, count = 0;

            bodyCells.forEach(cell => {
                const value = parseFloat(cell.textContent.trim());
                if (!isNaN(value)) {
                    total += value;
                    count++;
                }
            });

            const average = count > 0 ? total / count : 0;
            alert(`Average: ${average}`);
        });
    }

    // Min functionality
    const minBtn = document.getElementById('min-btn');
    if (minBtn) {
        minBtn.addEventListener('click', () => {
            const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
            const values = Array.from(bodyCells).map(cell => parseFloat(cell.textContent.trim())).filter(v => !isNaN(v));
            alert(`Min: ${Math.min(...values)}`);
        });
    }

    // Max functionality
    const maxBtn = document.getElementById('max-btn');
    if (maxBtn) {
        maxBtn.addEventListener('click', () => {
            const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
            const values = Array.from(bodyCells).map(cell => parseFloat(cell.textContent.trim())).filter(v => !isNaN(v));
            alert(`Max: ${Math.max(...values)}`);
        });
    }

    // Count functionality
    document.getElementById('count-btn').addEventListener('click', () => {
        const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
        let count = 0;

        bodyCells.forEach(cell => {
            const content = cell.textContent.trim();
            const value = parseFloat(content);
            if (!isNaN(value)) {
                count++;
            }
        });

        alert(`Count: ${count}`);
    });

    // Trim functionality
    document.getElementById('trim-btn').addEventListener('click', () => {
        const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');

        bodyCells.forEach(cell => {
            cell.textContent = cell.textContent.trim();
        });
    });

    // Uppercase functionality
    document.getElementById('upper-btn').addEventListener('click', () => {
        const selectedCell = document.querySelector('.selected');
        if (selectedCell) {
            selectedCell.textContent = selectedCell.textContent.toUpperCase();
        } else {
            alert('No cell selected!');
        }
    });

    // Lowercase functionality
    document.getElementById('lower-btn').addEventListener('click', () => {
        const selectedCell = document.querySelector('.selected');
        if (selectedCell) {
            selectedCell.textContent = selectedCell.textContent.toLowerCase();
        } else {
            alert('No cell selected!');
        }
    });

    // Remove Duplicates functionality
             document.getElementById('remove-duplicates-btn').addEventListener('click', () => {
                    const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');
                    const rowCount = 30; // Number of rows in the spreadsheet
                    const colCount = 27; // Number of columns in the spreadsheet
                
                    // Step 1: Collect all cell values across the entire grid
                    const seenValues = new Set();
                    const duplicates = [];
                
                    bodyCells.forEach((cell, index) => {
                        const cellValue = cell.textContent.trim();
                        if (seenValues.has(cellValue) && cellValue !== "") {
                            duplicates.push(index); // Mark duplicate cells
                        } else {
                            seenValues.add(cellValue); // Add value to seen set
                        }
                    });
                
                    // Step 2: Remove duplicate values (if any)
                    duplicates.forEach(index => {
                        bodyCells[index].textContent = ""; // Clear duplicate cell
                    });
                
                    // Alert if duplicates were removed
                    if (duplicates.length > 0) {
                        alert('Duplicate values removed!');
                    } else {
                        alert('No duplicates found.');
                    }
                });

    // Find and Replace functionality
    document.getElementById('find-replace-btn').addEventListener('click', () => {
        const findText = prompt("Enter text to find:");
        const replaceText = prompt("Enter text to replace with:");

        const bodyCells = document.querySelectorAll('#spreadsheet-body .spreadsheet-cell');

        bodyCells.forEach(cell => {
            if (cell.textContent.includes(findText)) {
                cell.textContent = cell.textContent.replace(findText, replaceText);
            }
        });
    });

    // Font family change
    const fontFamilySelect = document.getElementById('font-family');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', (event) => {
            const cells = document.querySelectorAll('.spreadsheet-cell');
            cells.forEach(cell => {
                cell.style.fontFamily = event.target.value;
            });
        });
    }

    // Font size change
    const fontSizeSelect = document.getElementById('font-size');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (event) => {
            const cells = document.querySelectorAll('.spreadsheet-cell');
            cells.forEach(cell => {
                cell.style.fontSize = event.target.value;
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateChart(); // This will trigger the chart update as soon as the page loads
    });
    
    
    // Selecting cells
    const bodyCells = document.querySelectorAll('.spreadsheet-cell');
    bodyCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const previouslySelectedCell = document.querySelector('.selected');
            if (previouslySelectedCell) {
                previouslySelectedCell.classList.remove('selected');
            }
            cell.classList.add('selected');
        });
    });

});
