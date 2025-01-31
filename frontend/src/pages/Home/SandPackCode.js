import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import React from "react";
function SandPackCode({ htmlCode }) {
  const [selectSection, setSelectSection] = React.useState("preview");
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="  items-center select-none   rounded-t-md   py-2  flex border-b-[1px] border-opacity-10 border-b-white justify-between px-10 text-white  bg-black">
        <div>
          <div className="text-lg hidden md:flex font-bold">{"<<"}</div>
        </div>
        <div className=" flex gap-4">
          <div
            onClick={() => setSelectSection("code")}
            className={`${
              selectSection == "code"
                ? "bg-white bg-opacity-10"
                : "hover:bg-white hover:bg-opacity-10"
            }  cursor-pointer rounded-md`}
          >
            code
          </div>
          <div
            onClick={() => setSelectSection("preview")}
            className={`${
              selectSection == "preview"
                ? "bg-white bg-opacity-10"
                : "hover:bg-white hover:bg-opacity-10 "
            }  cursor-pointer rounded-md px-2`}
          >
            preview
          </div>
        </div>
        <div className=" flex font-extralight  pb-[3px]  px-[6px] py-[1px]  cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md ">
          •••
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
                style={{ height: window.innerWidth >= 768 ? "90vh" : "85vh" }}
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
                style={{ height: window.innerWidth >= 768 ? "90vh" : "85vh" }}
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
