"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

const SpreadsheetUploader: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      setJsonData(data);
      setFileName(file.name);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Spreadsheet to JSON Converter</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && (
        <p>
          Uploaded File: <strong>{fileName}</strong>
        </p>
      )}
      {jsonData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Converted JSON Data:</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SpreadsheetUploader;
