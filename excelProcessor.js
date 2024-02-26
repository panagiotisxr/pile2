function handleFileUpload() {
    console.log("handleFileUpload function called");
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first!');
        return false; // File not selected
    } else {
        console.log("File selected, starting to read...");
        
        // Proceed with file processing
        // You can add more validations here (e.g., file size, type)
        
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log("File read successfully, processing data...");
            
            const data = e.target.result;
            
            try {
                const workbook = XLSX.read(data, {type: 'binary'});
                console.log("Workbook read successfully");
                
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});
                console.log("Sheet data processed");
                
                //processSheetData(sheetData);
                console.log("Simulating processing of sheet data. Remove this log and uncomment processSheetData(sheetData) to proceed.");

                document.getElementById('uploadStatus').innerHTML = "File uploaded successfully!";
            } catch (error) {
                console.error("Error processing file", error);
                document.getElementById('uploadStatus').innerHTML = "Error processing file. See console for details.";
            }
        };
        
        reader.onerror = function() {
            console.error("Error reading file");
            document.getElementById('uploadStatus').innerHTML = "Error reading file.";
        };
        
        reader.readAsBinaryString(file);
        
        return true; // File selected
    }
}





function processSheetData(sheetData) {
    // Start with an empty string for the HTML content
    let htmlContent = '<table><tr><th>Layer Height</th><th>Effective Cohesion [c\']</th><th>Effective Friction Angle [φ\']</th><th>Unit Weight of Soil [γ]</th></tr>';

    // Assuming the first row is headers and data starts from the second row
    for (let i = 1; i < sheetData.length; i++) {
        const row = sheetData[i];
        const layerHeight = row[0]; // Column A
        const effectiveCohesion = row[1]; // Column B
        const effectiveFrictionAngle = row[2]; // Column C
        const unitWeightOfSoil = row[3]; // Column D

        // Add a row to the HTML content
        htmlContent += `<tr><td>${layerHeight}</td><td>${effectiveCohesion}</td><td>${effectiveFrictionAngle}</td><td>${unitWeightOfSoil}</td></tr>`;
    }

    // Close the table tag
    htmlContent += '</table>';

    // Set the innerHTML of the uploadResults div to the generated HTML content
    document.getElementById('uploadResults').innerHTML = htmlContent;
}


function handleFileUpload() {
    const fileInput = document.getElementById('excelFile');
    if (fileInput.files.length === 0) {
        alert('Please select a file first!');
        return false; // File not selected
    } else {
        // Proceed with file processing
        // You can add more validations here (e.g., file size, type)
        return true; // File selected
    }
}

