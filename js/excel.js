// Function to generate Excel-style column headers (A, B, ..., Z, AA, AB, ...)
export function getColumnAddress(index) {
    let address = "";
    while (index >= 0) {
        address = String.fromCharCode((index % 26) + 65) + address;
        index = Math.floor(index / 26) - 1;
    }
    return address;
}

export class Excel {
    constructor(rows, cols, containerId) {
        this.rows = rows;
        this.cols = cols;
        this.containerId = containerId;
    }

    render() {
        const container = document.getElementById(this.containerId);
        const columnHeader = document.getElementById("column-header");
        const rowHeader = document.getElementById("row-header");
        const body = document.getElementById("spreadsheet-body");

        // Clear existing content
        columnHeader.innerHTML = "";
        rowHeader.innerHTML = "";
        body.innerHTML = "";

        columnHeader.style.gridTemplateColumns = `repeat(${this.cols}, 100px)`;
        rowHeader.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;
        body.style.gridTemplateColumns = `repeat(${this.cols}, 100px)`;
        body.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;

        // Render column headers
        for (let col = 0; col < this.cols; col++) {
            const colHeaderCell = document.createElement("div");
            colHeaderCell.className = "column-header-cell cell";
            colHeaderCell.textContent = getColumnAddress(col); // Use getColumnAddress
            columnHeader.appendChild(colHeaderCell);
        }

        // Render row headers
        for (let row = 0; row < this.rows; row++) {
            const rowHeaderCell = document.createElement("div");
            rowHeaderCell.className = "row-header-cell cell";
            rowHeaderCell.textContent = row + 1;
            rowHeader.appendChild(rowHeaderCell);
        }

        // Render grid cells
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement("div");
                cell.className = "spreadsheet-cell cell";
                cell.contentEditable = true;
                body.appendChild(cell);
            }
        }

        // Adjust grid layout dynamically
        body.style.gridTemplateColumns = `repeat(${this.cols}, 100px)`; // Adjust for column width
        body.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;     // Adjust for row height

        columnHeader.style.gridTemplateColumns = `repeat(${this.cols}, 100px)`; // Match column width in headers
        rowHeader.style.gridTemplateRows = `repeat(${this.rows}, 30px)`;
    }

    // Save method - can be implemented for CSV, JSON, or other formats
    save(format) {
        const bodyCells = document.querySelectorAll('.spreadsheet-cell');
        let data = [];

        bodyCells.forEach((cell, index) => {
            const row = Math.floor(index / this.cols);
            const col = index % this.cols;
            if (!data[row]) data[row] = [];
            data[row][col] = cell.textContent.trim();
        });

        if (format === 'json') {
            return JSON.stringify(data);
        } else if (format === 'csv') {
            return data.map(row => row.join(',')).join('\n');
        }
    }
}

