import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../../components/Home/loading";

function SandPackCode({
  htmlCode,
  setSandpackWidth,
  setShowBottomSheet,
  setIsUpdate,
  triggerBottomSheet,
}) {
  const [selectSection, setSelectSection] = useState("code");
  const codeContainerRef = useRef(null);
  const [lastHtmlCode, setLastHtmlCode] = useState(""); // Store previous code
  const [isUpdating, setIsUpdating] = useState(true);
  const updateTimeout = useRef(null);
  const [loading, setLoading] = useState(false);
  const id = useParams().id;

  // Handle code updates and switching logic
  useEffect(() => {
    if (htmlCode === "") {
      setSelectSection("code");
      console.log("Empty code starting");
      setShowBottomSheet(true);
      setIsUpdating(true);
      return;
    }

    if (htmlCode !== lastHtmlCode) {
      setIsUpdating(true);
      setIsUpdate(true);
      setSandpackWidth(50);
      setLastHtmlCode(htmlCode);
      // Clear existing timeout when new code comes in
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
      updateTimeout.current = setTimeout(() => {
        setIsUpdating(false);
        setSelectSection("preview");
      }, 1000); // Increase delay to wait for code chunks to settle
    }
  }, [htmlCode, setIsUpdate]);

  // Auto-scroll functionality
  useEffect(() => {
    // Automatically scroll down if still updating the code
    if (isUpdating && codeContainerRef.current) {
      codeContainerRef.current.scrollTop =
        codeContainerRef.current.scrollHeight;
    }
  }, [htmlCode]);

  useEffect(() => {
    setShowBottomSheet(true);
  }, [htmlCode]);

  const navigate = useNavigate();

  const handleDeploy = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://deploy-test-production-1630.up.railway.app/deploy`,
        {
          html: htmlCode,
        }
      );
      console.log(response);
      window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomize = () => {
    navigate(`/customize/${id}`, { state: { htmlCode } });
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
    <div className="h-full w-full overflow-hidden no-tap">
      <div className="items-center select-none rounded-t-md border-t-[1px] border-opacity-20 py-2 flex md:border-b-[1px] md:border-opacity-10 border-white justify-between md:px-5 px-3 text-white bg-black">
        <div className="flex gap- items-center">
          {window.innerWidth >= 768 ? (
            <div
              onClick={() => setSandpackWidth(100)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-md cursor-pointer"
            >
              <img
                className={`opacity-80 w-[10px] rotate-180`}
                src="/left.png"
              />
            </div>
          ) : (
            <div
              onClick={() => setShowBottomSheet(false)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-md cursor-pointer"
            >
              <img
                className={`opacity-80 w-[10px] -rotate-90`}
                src="/left.png"
              />
            </div>
          )}

          <div className=" text-xs md:text-sm bg-opacity-10 py-[2px] rounded flex gap-1">
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
           
          </div>
        </div>
        <div className=" flex gap-2 items-center">
        <div
              className={`hover:bg-white hover:bg-opacity-10 text-xs md:text-sm myborder cursor-pointer flex gap-1 rounded-lg px-3 py-1 items-center transition-all justify-center opacity-80`}
              onClick={handleCustomize}
            >
              <img className="w-[12px] h-[12px] invert" src="/customize.svg" />
              Customize
            </div>
        <div
          onClick={handleDeploy}
          className="flex pb-[3px] px-[10px] py-[4px] font-medium text-xs md:text-sm bg-white text-black cursor-pointer hover:bg-white hover:bg-opacity-80 rounded-md"
        >
          {loading ? "Deploying..." : "Deploy"}
        </div>
        </div>
      </div>

      <SandpackProvider
        key={selectSection}
        template="static"
        theme={"dark"}
        files={{
          "/index.html": { code: htmlCode },
        }}
      >
        <SandpackLayout>
          {selectSection === "code" ? (
            <div
              ref={codeContainerRef}
              className="no-scrollbar bg-[#151515] pt-2"
              style={{
                height: window.innerWidth >= 768 ? "95vh" : "80vh",
                overflowY: "auto", // Enable scrolling
                width: "100%",
                opacity: isUpdating ? 1 : 0.8,
                transition: "opacity 0.3s",
              }}
            >
              <div
                onClick={handleCopy}
                className="text-white w-fit ml-1 text-opacity-70 text-sm px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md"
              >
                {copySuccess}
              </div>

              <SandpackCodeEditor
                showRunButton={false}
                readOnly={true} // Non-editable
              />
            </div>
          ) : (
            <SandpackPreview
              showNavigator={true}
              fullScreen={true}
              showOpenInCodeSandbox={false}
              style={{
                height: window.innerWidth >= 768 ? "95vh" : "80vh",
              }}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default SandPackCode;
