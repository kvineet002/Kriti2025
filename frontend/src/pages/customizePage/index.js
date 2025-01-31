import React, { useState, useRef, useEffect } from "react";
import uploadImage from "../../utils/ImageUpload.js"
import { sampleHtml } from "../../constants.js";

const updateElementStyles = (htmlString, elementId, newStyles, newSrc = null) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elementToUpdate = doc.getElementById(elementId);

  if (elementToUpdate) {
    if (newSrc && elementToUpdate.tagName === "IMG") {
      elementToUpdate.src = newSrc;
    } else {
      Object.entries(newStyles).forEach(([key, value]) => {
        elementToUpdate.style[key] = value;
      });
    }
  }

  return doc.documentElement.outerHTML;
};

const CustomizePage = () => {
  const [html, setHtml] = useState(sampleHtml);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [filteredStyles, setFilteredStyles] = useState({});
  const iframeRef = useRef(null);

  const relevantStyles = [
    "background-color",
    "color",
    "font-size",
    "margin",
    "padding",
    "border",
    "height",
    "width",
  ];

  const injectClickListener = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const iframeDocument = iframe.contentDocument;
      let lastSelectedElement = null;

      iframeDocument.body.addEventListener("click", (e) => {
        e.preventDefault();

        if (lastSelectedElement) {
          lastSelectedElement.style.outline = "";
        }

        const clickedElement = e.target;
        lastSelectedElement = clickedElement;
        clickedElement.style.outline = "2px solid #ff5722";

        setSelectedElement(clickedElement.tagName);
        setSelectedElementId(clickedElement.id);

        const computedStyles = window.getComputedStyle(clickedElement);
        const filtered = {};

        relevantStyles.forEach((style) => {
          filtered[style] = computedStyles.getPropertyValue(style) || "none";
        });

        setFilteredStyles(filtered);
      });
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = injectClickListener;
    }
  }, []);

  const handleStyleChange = (key, value) => {
    const updatedStyles = { ...filteredStyles, [key]: value };
    setFilteredStyles(updatedStyles);

    if (selectedElementId) {
      const updatedHtml = updateElementStyles(html, selectedElementId, updatedStyles);
      setHtml(updatedHtml);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && selectedElementId) {
        try {
            const uploadedImageUrl = await uploadImage(file);
            if (uploadedImageUrl) {
                const updatedHtml = updateElementStyles(html, selectedElementId, {}, uploadedImageUrl);
                setHtml(updatedHtml);
                console.log("Image uploaded successfully...",uploadedImageUrl); 
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
};


  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch text-white p-6 w-full h-screen gap-4">
      {/* Customization Tab */}
      <div className="border-2 w-full md:w-2/5 flex flex-col gap-3 p-4 bg-[#1e1e1e] rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Customization Tab</h1>
        <div className="bg-white text-black w-full p-3 rounded-lg shadow-inner">
          <h2 className="font-bold">Selected Component:</h2>
          <p>Component Type: {selectedElement || "None"}</p>
          <p>Element ID: {selectedElementId || "None"}</p>

          {/* Image Upload Section */}
          {selectedElement === "IMG" && (
            <div className="mt-4">
              <h3 className="font-bold">Change Image:</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}

          <h3 className="font-bold mt-4">Relevant Styles:</h3>
          <div className="overflow-y-scroll h-48 bg-slate-200 p-3 rounded-lg">
            {Object.entries(filteredStyles).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <strong className="capitalize">{key}:</strong>
                {key.includes("color") ? (
                  <input
                    type="color"
                    value={value || "#000000"}
                    onChange={(e) => handleStyleChange(key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border p-1 rounded w-full"
                    value={value}
                    onChange={(e) => handleStyleChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe Preview */}
      <div className="border-2 w-full md:w-3/5 flex items-center justify-center bg-white rounded-lg shadow-lg">

        <iframe
          title="HTML Preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full rounded-lg"
          srcDoc={html}
          ref={iframeRef}
      />

      </div>
    </div>
  );
};

export default CustomizePage;