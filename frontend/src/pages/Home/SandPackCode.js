import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import React from "react";
function SandPackCode({ htmlCode, setSandpackWidth, setShowBottomSheet }) {
  const [selectSection, setSelectSection] = React.useState("preview");
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="  items-center select-none   rounded-t-md border-t-[1px]  border-opacity-20 py-2 flex md:border-b-[1px] md:border-opacity-10 border-white justify-between px-5 text-white  bg-black">
        <div className=" flex gap-1 items-center">
          {window.innerWidth >= 768 ? (
            <div
              onClick={() => setSandpackWidth(100)}
              className=" p-2 hover:bg-white hover:bg-opacity-10  rounded-md cursor-pointer"
            >
              <img className={` opacity-80  w-[10px]  rotate-180 `} src="/left.png" />
            </div>
          ) : (
            <div
              onClick={() => setShowBottomSheet(false)}
              className=" p-2 hover:bg-white hover:bg-opacity-10  rounded-md cursor-pointer"
            >
              <img
                className={` opacity-80  w-[10px] -rotate-90 `}
                src="/left.png"
              />
            </div>
          )}

          <div className=" bg-whit text-sm  bg-opacity-10  py-[2px] rounded flex gap-1  ">
            <div
              onClick={() => setSelectSection("code")}
              className={`${
                selectSection == "code"
                  ? "bg-white  bg-opacity-10"
                  : "hover:bg-white hover:bg-opacity-10"
              }  cursor-pointer flex gap-1 rounded-lg px-3 py-1  items-center transition-all justify-center opacity-80  `}
            >
              <img className="  w-[12px] h-[12px]  " src="/code.png" />
              Code
            </div>
            <div
              onClick={() => setSelectSection("preview")}
              className={`${
                selectSection == "preview"
                  ? "bg-white  bg-opacity-10"
                  : "hover:bg-white hover:bg-opacity-10 "
              }  cursor-pointer flex gap-1 rounded-lg px-3 py-1 items-center transition-all justify-center opacity-80  `}
            >
              <img className="  w-[12px] h-[12px]  " src="/preview.png" />
              Preview
            </div>
          </div>
        </div>
        <div className=" flex  pb-[3px]  px-[10px] py-[4px] font-medium text-sm bg-white text-black   cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md ">
          Deploy
        </div>
      </div>

      <SandpackProvider
        template="static"
        theme={"dark"}
        files={{
          "/index.html": {
            code: htmlCode,
          },
        }}
      >
        <SandpackLayout>
          {selectSection == "code" ? (
            <>
              <SandpackCodeEditor
                style={{ height: window.innerWidth >= 768 ? "95vh" : "80vh" }}
                files={{
                  "/index.html": {
                    code: htmlCode,
                  },
                }}
                showRunButton={false}
              />
            </>
          ) : (
            <>
              <SandpackPreview
                showNavigator={true}
                fullScreen={true}
                showOpenInCodeSandbox={false}
                style={{ height: window.innerWidth >= 768 ? "95vh" : "80vh" }}
                files={{
                  "/index.html": {
                    code: htmlCode,
                  },
                }}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default SandPackCode;
