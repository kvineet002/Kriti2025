import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { ChromePicker } from "react-color";
import Select from "react-select";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [font, setFont] = useState("Arial");

  const fontOptions = [
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Courier New", label: "Courier New" },
    { value: "Verdana", label: "Verdana" },
    { value: "Georgia", label: "Georgia" },
  ];

  // Parse HTML and extract components
  useEffect(() => {
    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const elements = Array.from(doc.body.children);

      // Generate component list with consistent IDs
      const componentList = elements.map((el) => {
        const id =
          el.id ||
          el.tagName.toLowerCase() +
            "-" +
            Math.random().toString(36).substring(7);
        if (!el.id) el.id = id; // Assign ID to the element if it doesn't have one
        return {
          id,
          tag: el.tagName.toLowerCase(),
          styles: {},
        };
      });

      setComponents(componentList);
    }
  }, [html]);

  // Update live preview whenever HTML, CSS, or JS changes
  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  // Update live preview
  const updatePreview = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${css}
            ${generateDynamicCSS()}
          </style>
        </head>
        <body>
          ${html}
          ${js ? `<script>${js}</script>` : ""}
        </body>
      </html>
    `;
    setSrcDoc(combinedCode);
  };

  // Generate dynamic CSS for components
  const generateDynamicCSS = () => {
    return components
      .map((comp) => {
        const styles = Object.entries(comp.styles)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ");
        return `#${comp.id} { ${styles} }`;
      })
      .join("\n");
  };

  // Handle file upload
  const handleFileUpload = (event, setter) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target.result);
      reader.readAsText(file);
    }
  };

  // Handle color change
  const handleColorChange = (color) => {
    setColor(color.hex);
    if (selectedComponent) {
      const updatedComponents = components.map((comp) =>
        comp.id === selectedComponent.id
          ? { ...comp, styles: { ...comp.styles, color: color.hex } }
          : comp
      );
      setComponents(updatedComponents);
    }
  };

  // Handle font change
  const handleFontChange = (selectedOption) => {
    setFont(selectedOption.value);
    if (selectedComponent) {
      const updatedComponents = components.map((comp) =>
        comp.id === selectedComponent.id
          ? {
              ...comp,
              styles: { ...comp.styles, fontFamily: selectedOption.value },
            }
          : comp
      );
      setComponents(updatedComponents);
    }
  };

  // Handle download
  const handleDownload = (content, fileName, fileType) => {
    const blob = new Blob([content], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", height: "100vh", color: "white" }}>
      {/* File Upload Section */}
      <div
        style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <h3>Upload Files</h3>
        <div>
          <label>HTML File:</label>
          <input type="file" onChange={(e) => handleFileUpload(e, setHtml)} />
        </div>
        <div>
          <label>CSS File:</label>
          <input type="file" onChange={(e) => handleFileUpload(e, setCss)} />
        </div>
        <div>
          <label>JS File (optional):</label>
          <input type="file" onChange={(e) => handleFileUpload(e, setJs)} />
        </div>
      </div>

      {/* Code Editors Section */}
      <div
        style={{ width: "30%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <h3>HTML</h3>
        <CodeMirror
          value={html}
          options={{
            mode: "htmlmixed",
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => setHtml(value)}
        />
        <h3>CSS</h3>
        <CodeMirror
          value={css}
          options={{
            mode: "css",
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => setCss(value)}
        />
        <h3>JavaScript</h3>
        <CodeMirror
          value={js}
          options={{
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => setJs(value)}
        />
      </div>

      {/* Customization Section */}
      <div
        style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <h3>Customize Components</h3>
        <div>
          <label>Select Component:</label>
          <select
            onChange={(e) =>
              setSelectedComponent(
                components.find((comp) => comp.id === e.target.value)
              )
            }
          >
            <option value="">Select a component</option>
            {components.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.tag} ({comp.id})
              </option>
            ))}
          </select>
        </div>
        {selectedComponent && (
          <>
            <div style={{ marginTop: "10px" }}>
              <label>Color:</label>
              <ChromePicker
                color={color}
                onChangeComplete={handleColorChange}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Font:</label>
              <Select
                options={fontOptions}
                value={fontOptions.find((opt) => opt.value === font)}
                onChange={handleFontChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Live Preview Section */}
      <div style={{ width: "30%", padding: "10px" }}>
        <h3>Live Preview</h3>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          style={{ width: "100%", height: "80%", border: "1px solid #ccc" }}
        />
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => handleDownload(html, "index.html", "text/html")}
          >
            Download HTML
          </button>
          <button onClick={() => handleDownload(css, "styles.css", "text/css")}>
            Download CSS
          </button>
          <button
            onClick={() => handleDownload(js, "script.js", "text/javascript")}
          >
            Download JS
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
