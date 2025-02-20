import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import uploadImage from "../../utils/ImageUpload.js";
import axios from "axios";
import { updateElementStyles, colorToHex } from "../../utils/HTMLFunctions.js";


const sampleHtml = `
  <h1 style="color: white;">Preview is loading</h1>
`;

const CustomizePage = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [filteredStyles, setFilteredStyles] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectSection, setSelectSection] = useState("preview");
  const iframeRef = useRef(null);
  const [innerText, setInnerText] = useState("");
  const location = useLocation();
  const htmlCode = location.state?.htmlCode || sampleHtml;

  const changeStackRef = useRef([]);
  const [stackSize, setStackSize] = useState(1);

  const [html, setHtml] = useState(() => {
    const storedHtml = localStorage.getItem("customizedHtml") || htmlCode || sampleHtml;
    changeStackRef.current = [storedHtml]; // Initialize stack
    return storedHtml;
  }); 

  useEffect(() => {
    if (changeStackRef.current[changeStackRef.current.length - 1] !== html) {
      changeStackRef.current.push(html);
      setStackSize(changeStackRef.current.length); // Force re-render when stack changes
    }
    localStorage.setItem("customizedHtml", html);
  }, [html]);

  const relevantStyles = [
    "background-color",
    "color",
    "font-size",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "padding-bottom",
    "border-right-width",
    "border-left-width",
    "border-top-width",
    "border-bottom-width",
    "border-radius",
    "border-color",
    "height",
    "width",
    "font-family",
    "font-weight",
  ];

  const fileInputRef = useRef(null);

  //inject click listener
  const injectClickListener = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const iframeDocument = iframe.contentDocument;
      let lastSelectedElement = null;

      iframeDocument.body.addEventListener("click", (e) => {
        e.preventDefault();

        const clickedElement = e.target;
        lastSelectedElement = clickedElement;
        setSelectedElement(clickedElement.tagName);
        setSelectedElementId(clickedElement.id);

        const computedStyles = window.getComputedStyle(clickedElement);
        const filtered = {};

        relevantStyles.forEach((style) => {
          filtered[style] = computedStyles.getPropertyValue(style) || "none";
        });

        setFilteredStyles(filtered);

        if (clickedElement.innerText !== undefined) {
          setInnerText(clickedElement.innerText);
        } else {
          setInnerText("");
        }
      });
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = injectClickListener;
    }
  }, [html]);

  const handleStyleChange = (key, value) => {
    const updatedStyles = { ...filteredStyles, [key]: value };
    setFilteredStyles(updatedStyles);

    if (selectedElementId) {
      const updatedHtml = updateElementStyles(
        html,
        selectedElementId,
        updatedStyles
      );
      setHtml(updatedHtml);
      localStorage.setItem("customizedHtml", updatedHtml);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setInnerText(newText);

    if (selectedElementId) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const elementToUpdate = doc.getElementById(selectedElementId);
      if (elementToUpdate) {
        elementToUpdate.innerText = newText;
        const updatedHtml = doc.documentElement.outerHTML;
        setHtml(updatedHtml);
        localStorage.setItem("customizedHtml", updatedHtml);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && selectedElementId) {
      try {
        const uploadedImageUrl = await uploadImage(file);
        if (uploadedImageUrl) {
          const updatedHtml = updateElementStyles(
            html,
            selectedElementId,
            {},
            uploadedImageUrl
          );
          setHtml(updatedHtml); // Update HTML state
          localStorage.setItem("customizedHtml", updatedHtml);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeploy = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
       `${process.env.REACT_APP_DEPLOY_URL}/deploy`,
        {
          html: html,
        }
      );
      console.log(response);
      localStorage.removeItem("customizedHtml");
      window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = () => {
    if (changeStackRef.current.length > 1) {
      changeStackRef.current.pop(); // Remove current state
      const previousHtml = changeStackRef.current[changeStackRef.current.length - 1];
      setHtml(previousHtml);
      setStackSize(changeStackRef.current.length); // Update state to force re-render
      localStorage.setItem("customizedHtml", previousHtml);
    }
  };
  
    const [copySuccess, setCopySuccess] = useState("Copy code");
    const handleCopy = () => {
      navigator.clipboard.writeText(htmlCode);
      setCopySuccess("Copied!");
      setTimeout(() => {
        setCopySuccess("Copy code");
      }, 4000);
    };
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch text-white text-opacity-70 w-full h-screen md:gap-4">
      {/* Iframe Preview */}
      <div className=" w-full h-1/2 md:h-full md:w-[70%] flex flex-col items-center justify-center bg-black shadow-lg">
        <div className="flex justify-between items-center w-full p-4 bg-black">
          <div className=" text-sm bg-opacity-10 py-[2px] rounded flex gap-1">
            <div
              onClick={() => setSelectSection("code")}
              className={`${
                selectSection === "code"
                  ? "bg-white bg-opacity-10"
                  : "hover:bg-white hover:bg-opacity-10"
              } cursor-pointer flex gap-1 rounded-lg px-3 py-1 items-center transition-all justify-center opacity-80`}
            >
              <img className="w-[12px] h-[12px]" src="/code.png" />
              Code
            </div>
            <div
              onClick={() => setSelectSection("preview")}
              className={`${
                selectSection === "preview"
                  ? "bg-white bg-opacity-10"
                  : "hover:bg-white hover:bg-opacity-10 "
              } cursor-pointer flex gap-1 rounded-lg px-3 py-1 items-center transition-all justify-center opacity-80`}
            >
              <img className="w-[12px] h-[12px]" src="/preview.png" />
              Preview
            </div>
            {stackSize>1 && <div
              onClick={handleUndo}
              className={`hover:bg-white hover:bg-opacity-10 cursor-pointer flex gap-1 rounded-lg px-3 py-1 items-center transition-all justify-center opacity-80`}
            >
              <img className="w-[12px] h-[12px] invert opacity-80" src="/undo.svg" />
              Undo
            </div>}
          </div>
          <div
            onClick={handleDeploy}
            className="flex pb-[3px] px-[10px] py-[4px] font-medium text-sm bg-white text-black cursor-pointer hover:bg-white hover:bg-opacity-80 rounded-md"
          >
            {loading ? "Deploying..." : "Deploy"}
          </div>
        </div>

        {selectSection === "preview" && (
          <div className=" w-full h-full p-2 rounded-md ">
          <iframe
            title="HTML Preview"
            sandbox="allow-same-origin"
            className="w-full h-full no-scrollbar  "
            srcDoc={html}
            ref={iframeRef}
          /></div>
        )}
        {selectSection === "code" && (
          <div div className=" flex w-full h-full flex-col">
             <div
             onClick={handleCopy}
             className="text-white bg-black  w-full flex items-center gap-1 w-fit text-opacity-70 text-sm px-4 py-4 cursor-pointer hover:bg-white hover:bg-opacity-10 "
           >
               <img className=" w-4" src="/copy-white.png" />
             {copySuccess}
           </div>

          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-full  bg-white bg-opacity-5  no-scrollbar text-white p-4 resize-none outline-none focus:outline-none focus:ring-0"
          />
</div>
        )}
      </div>

      {/* Customization Tab */}
      <div className=" w-full h-1/2 md:h-full md:w-[30%] flex flex-col gap-3 md:p-4 p-2  md:py-8 shadow-lg">
      { !selectedElement? ( <div className=" h-full w-full flex items-center bg-white bg-opacity-5  px-3 text-center rounded-md justify-center text-white text-opacity-70">
          Select any element on the left to customize it.
        </div>):
      (  <div className=" text-black w-full rounded-lg shadow-inner  overflow-scroll no-scrollbar">
          <div className="overflow-scroll flex flex-col bg-white bg-opacity-5  text-white text-opacity-70 rounded-lg p-3 no-scrollbar">
            {selectedElement === "IMG" && (
              <div className="flex gap-2 overflow-hidden py-3 w-full items-center">
                <h3 className="font-light text-sm">Change Image:</h3>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className=""
                />
              </div>
            )}

            {/* Inner Text */}
            {selectedElement && innerText && (
              <div className="flex flex-col gap-2 py-4">
                <div className="font-medium text-base">Content</div>
                <textarea
                  type="text"
                  value={innerText}
                  onChange={handleTextChange}
                  className="p-2  rounded-md resize-none outline-none focus:outline-none focus:ring-0 bg-white bg-opacity-5"
                />
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>
            {/* Color */}
            {selectedElement && (
              <div className="flex gap-2 py-4 items-center">
                <div className="font-light text-sm">Color </div>
                <input
                  type="color"
                  value={colorToHex(filteredStyles["color"])}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className={`outline-none focus:outline-none bg-transparent   bg-["${colorToHex(
                    filteredStyles["color"]
                  )}"] focus:ring-0 border-none `}
                />
                <div className="bg-white bg-opacity-5 text-white px-5 py-2 text-sm rounded-md">
                  {filteredStyles["color"]}
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Bg-color */}
            {selectedElement && (
              <div className="flex gap-2 items-center py-4">
                <div className="font-light text-sm">Background</div>
                <input
                  type="color"
                  value={filteredStyles["background-color"]}
                  onChange={(e) =>
                    handleStyleChange("background-color", e.target.value)
                  }
                  className="outline-none bg-transparent  focus:outline-none focus:ring-0 border-none"
                />
                <div className="bg-white bg-opacity-5 text-white px-5 py-2 text-sm rounded-md">
                  {filteredStyles["background-color"]}
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Font-Family */}
            {selectedElement && (
              <div className="flex gap-2 py-4 items-center">
                <div className="font-light text-sm">Font Family </div>
                <select
                  value={filteredStyles["font-family"]}
                  onChange={(e) =>
                    handleStyleChange("font-family", e.target.value)
                  }
                  className="bg-white bg-opacity-10   outline-none px-2 py-1 text-white rounded-md"
                >
                  {[
                    "Arial",
                    "Helvetica",
                    "sans-serif",
                    "Verdana",
                    "Courier",
                  ].map((value) => (
                    <option key={value} value={value} className="text-black">
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Font-weight */}
            {selectedElement && (
              <div className="flex gap-2 py-4 items-center">
                <div className="font-light text-sm">Font Weight </div>
                <select
                  value={filteredStyles["font-weight"]}
                  onChange={(e) =>
                    handleStyleChange("font-weight", e.target.value)
                  }
                  className="bg-white bg-opacity-10  outline-none px-2 py-1 text-white rounded-md"
                >
                  {["normal", "bold", "bolder", "lighter"].map((value) => (
                    <option key={value} value={value} className="text-black">
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Font-size */}
            {selectedElement && (
              <div className="flex items-center  gap-3 py-4">
                <div className="font-light text-sm">Font-Size </div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["font-size"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) - 1;
                    handleStyleChange("font-size", newHeight + "px");
                  }}
                  className="cursor-pointer flex items-center justify-center select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/minus.png" alt="-" className="w-4 opacity-60" />
                </div>
                <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                  <input
                    type="text"
                    value={filteredStyles["font-size"]?.replace("px", "")}
                    onChange={(e) =>
                      handleStyleChange("font-size", e.target.value)
                    }
                    className="bg-black outline-none px-2 w-12 text-white "
                  />
                  <div>px</div>
                </div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["font-size"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) + 1;
                    handleStyleChange("font-size", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/plus.png" alt="+" className="w-4 opacity-60" />
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/*Height*/}
            {
              <div className="flex gap-3 py-4 items-center">
                <div className="font-light text-sm">Height </div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["height"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) - 1;
                    handleStyleChange("height", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/minus.png" alt="-" className="w-4 opacity-60" />
                </div>
                <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                  <input
                    type="text"
                    value={filteredStyles["height"]?.replace("px", "")}
                    onChange={(e) =>
                      handleStyleChange("height", e.target.value)
                    }
                    className="bg-black outline-none px-2 w-12 text-white "
                  />
                  <div>px</div>
                </div>

                <div
                  onClick={() => {
                    const currHeight = filteredStyles["height"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) + 1;
                    handleStyleChange("height", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/plus.png" alt="+" className="w-4 opacity-60" />
                </div>
              </div>
            }
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/*Width*/}
            {selectedElement && (
              <div className="flex gap-3 items-center py-4">
                <div className="font-light text-sm">Width </div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["width"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) - 1;
                    handleStyleChange("width", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/minus.png" alt="-" className="w-4 opacity-60" />
                </div>
                <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                  <input
                    type="text"
                    value={filteredStyles["width"]?.replace("px", "")}
                    onChange={(e) => handleStyleChange("width", e.target.value)}
                    className="bg-black outline-none px-2 w-12 text-white "
                  />
                  <div>px</div>
                </div>

                <div
                  onClick={() => {
                    const currHeight = filteredStyles["width"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) + 1;
                    handleStyleChange("width", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/plus.png" alt="+" className="w-4 opacity-60" />
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Margin */}
            {selectedElement && (
              <div className="flex gap-3 py-4 overflow-x-scroll no-scrollbar items-center">
                <div className="font-light text-sm whitespace-nowrap">
                  Margin
                </div>
                <div className=" flex flex-col gap-2">
                  <div className="flex  gap-3 items-center text-white">
                    <div className="font-light text-sm">T</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="margin-top"
                        value={filteredStyles["margin-top"].replace("px", "")}
                        className="bg-black outline-none px-2 w-12 text-white "
                        onChange={(e) =>
                          handleStyleChange("margin-top", e.target.value + "px")
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                  <div className="flex  gap-3 items-center text-white">
                    <div className="font-light text-sm">L</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="margin-left"
                        value={filteredStyles["margin-left"].replace("px", "")}
                        className="bg-black outline-none px-2 w-12 text-white "
                        onChange={(e) =>
                          handleStyleChange(
                            "margin-left",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-2">
                  <div className="flex  gap-3 items-center text-white">
                    <div className="font-light text-sm">B</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="margin-bottom"
                        value={filteredStyles["margin-bottom"].replace(
                          "px",
                          ""
                        )}
                        className="bg-black outline-none px-2 w-12 text-white "
                        onChange={(e) =>
                          handleStyleChange(
                            "margin-bottom",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                  <div className="flex  gap-3 items-center text-white">
                    <div className="font-light text-sm">R</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="margin-right"
                        value={filteredStyles["margin-right"].replace("px", "")}
                        className="bg-black outline-none px-2 w-12 text-white "
                        onChange={(e) =>
                          handleStyleChange(
                            "margin-right",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/*Padding */}
            {selectedElement && (
              <div className="flex gap-3 py-4 overflow-x-scroll no-scrollbar items-center">
                <div className="font-light text-sm whitespace-nowrap">
                  Padding
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center text-white">
                    <div className="font-light text-sm">T</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="padding-top"
                        value={filteredStyles["padding-top"].replace("px", "")}
                        className="bg-black outline-none px-2 w-12 text-white"
                        onChange={(e) =>
                          handleStyleChange(
                            "padding-top",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center text-white">
                    <div className="font-light text-sm">L</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="padding-left"
                        value={filteredStyles["padding-left"].replace("px", "")}
                        className="bg-black outline-none px-2 w-12 text-white"
                        onChange={(e) =>
                          handleStyleChange(
                            "padding-left",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center text-white">
                    <div className="font-light text-sm">B</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="padding-bottom"
                        value={filteredStyles["padding-bottom"].replace(
                          "px",
                          ""
                        )}
                        className="bg-black outline-none px-2 w-12 text-white"
                        onChange={(e) =>
                          handleStyleChange(
                            "padding-bottom",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center text-white">
                    <div className="font-light text-sm">R</div>
                    <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                      <input
                        type="text"
                        name="padding-right"
                        value={filteredStyles["padding-right"].replace(
                          "px",
                          ""
                        )}
                        className="bg-black outline-none px-2 w-12 text-white"
                        onChange={(e) =>
                          handleStyleChange(
                            "padding-right",
                            e.target.value + "px"
                          )
                        }
                      />
                      <div>px</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>
            {/*Border Color*/}
            {selectedElement && (
              <div className="flex gap-2 py-4 items-center">
                <div className="font-light text-sm">Border Color </div>
                <input
                  type="color"
                  value={colorToHex(filteredStyles["border-color"])}
                  onChange={(e) =>
                    handleStyleChange("border-color", e.target.value)
                  }
                  className="outline-none focus:outline-none bg-transparent focus:ring-0 border-none"
                />
                <div className="bg-white bg-opacity-5 text-white px-5 py-2 text-sm rounded-md">
                  {filteredStyles["border-color"]}
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {/* Border */}
            {selectedElement && (
  <div className="flex gap-3 py-4 overflow-x-scroll no-scrollbar items-center">
    <div className="font-light text-sm whitespace-nowrap">Border</div>
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center text-white">
        <div className="font-light text-sm">T</div>
        <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
          <input
            type="text"
            name="border-top-width"
            value={filteredStyles["border-top-width"].replace("px", "")}
            className="bg-black outline-none px-2 w-12 text-white"
            onChange={(e) => handleStyleChange("border-top-width", e.target.value + "px")}
          />
          <div>px</div>
        </div>
      </div>
      <div className="flex gap-3 items-center text-white">
        <div className="font-light text-sm">L</div>
        <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
          <input
            type="text"
            name="border-left-width"
            value={filteredStyles["border-left-width"].replace("px", "")}
            className="bg-black outline-none px-2 w-12 text-white"
            onChange={(e) => handleStyleChange("border-left-width", e.target.value + "px")}
          />
          <div>px</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center text-white">
        <div className="font-light text-sm">B</div>
        <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
          <input
            type="text"
            name="border-bottom-width"
            value={filteredStyles["border-bottom-width"].replace("px", "")}
            className="bg-black outline-none px-2 w-12 text-white"
            onChange={(e) => handleStyleChange("border-bottom-width", e.target.value + "px")}
          />
          <div>px</div>
        </div>
      </div>
      <div className="flex gap-3 items-center text-white">
        <div className="font-light text-sm">R</div>
        <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
          <input
            type="text"
            name="border-right-width"
            value={filteredStyles["border-right-width"].replace("px", "")}
            className="bg-black outline-none px-2 w-12 text-white"
            onChange={(e) => handleStyleChange("border-right-width", e.target.value + "px")}
          />
          <div>px</div>
        </div>
      </div>
    </div>
  </div>
)}

            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

            {selectedElement && (
              <div className="flex gap-3 py-4 items-center">
                <div className="font-light text-sm">Border Radius</div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["border-radius"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) - 1;
                    handleStyleChange("border-radius", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/minus.png" alt="-" className="w-4 opacity-60" />
                </div>
                <div className="flex gap-1 bg-white bg-opacity-10 justify-center items-center p-1 pr-2 rounded-md">
                  <input
                    type="text"
                    value={filteredStyles["border-radius"]?.replace("px", "")}
                    onChange={(e) =>
                      handleStyleChange("border-radius", e.target.value)
                    }
                    className="bg-black outline-none px-2 w-12 text-white "
                  />
                  <div>px</div>
                </div>
                <div
                  onClick={() => {
                    const currHeight = filteredStyles["border-radius"];
                    const newHeight =
                      parseFloat(currHeight.replace("px", "")) + 1;
                    handleStyleChange("border-radius", newHeight + "px");
                  }}
                  className="flex justify-center items-center cursor-pointer select-none h-8 text-center w-8 text-lg hover:bg-white hover:bg-opacity-10 rounded-md"
                >
                  <img src="/plus.png" alt="+" className="w-4 opacity-60" />
                </div>
              </div>
            )}
            <div className=" h-[1px] w-full  border-white border-opacity-10 my-1 border-dashed border-b-[1px]"></div>

           
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default CustomizePage;
