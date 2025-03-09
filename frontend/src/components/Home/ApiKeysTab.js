import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "./loading";

function ApiKeysTab({ email }) {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKey, setNewKey] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Load saved keys from local storage on mount
  useEffect(() => {
    const savedKeys = JSON.parse(localStorage.getItem("apiKeys")) || [];
    setApiKeys(savedKeys);
  }, []);

  // Function to add a new key
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleVerify = async () => {
    if (newKey.trim()) {
      try {
        setLoading(true);
        const genAI = new GoogleGenerativeAI(newKey);
        const systemPrompt = `You are ai who returns only "Yes Verified".`;
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });
        const result = await model.generateContent("return output");
        const output = result.response.text();
        setLoading(false);
        //check if api key is already added
        if (apiKeys.includes(newKey)) {
          setShowInput(false); // Hide input field}
          setNewKey(""); // Clear input field
          return;
        }

        const updatedKeys = [...apiKeys, newKey];
        setApiKeys(updatedKeys);
        localStorage.setItem("apiKeys", JSON.stringify(updatedKeys)); // Save to local storage
        setNewKey(""); // Clear input field
        setShowInput(false); // Hide input field}
      } catch (error) {
        console.error("Error adding key:", error);
        setError(true);
        setLoading(false);
      }
    }
  };

  // Function to delete a key
  const handleDelete = (keyToDelete) => {
    const updatedKeys = apiKeys.filter((key) => key !== keyToDelete);
    setApiKeys(updatedKeys);
    localStorage.setItem("apiKeys", JSON.stringify(updatedKeys)); // Update local storage
  };

  return (
    <motion.div
      key="apiKeys"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className=" overflow-scroll no-scrollbar"
    >
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <div className="flex md:w-[80%] w-[95%] flex-col gap-4 text-white">
          <div>
            <div className="font-semibold">Your Gemini API Keys</div>
            <div className="opacity-70 text-sm">
              This will help you to get more control over your output.
            </div>
          </div>

          {/* Display Added Keys */}
          {apiKeys.length > 0 &&
            apiKeys.map((key, index) => (
              <motion.div
                key={index}
                className="flex md:flex-row flex-col gap-2"
              >
                <input
                  type="text"
                  value={key}
                  className="w-full bg-white bg-opacity-5 outline-none rounded-md px-3 py-2 myborder text-xs"
                  readOnly
                />
                <div className="flex gap-2">
                  <div className="bg-green-400 bg-opacity-20 gap-1 text-green-300 w-full md:w-min border-green-300 border-[1px] border-opacity-30 font-semibold rounded-md px-5 py-2 flex items-center justify-center text-xs">
                    <img src="/verified.png" className="w-4 h-4" /> Verified
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(key)}
                    className="bg-red-400 bg-opacity-20 hover:opacity-80 text-red-300 w-8 flex-shrink-0 border-red-300 border-[1px] border-opacity-30 font-semibold rounded-md px-2 py-2 cursor-pointer flex items-center justify-center text-xs"
                  >
                    <img src="/deletee.png" className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

          {/* Animate New Input Field */}
          <AnimatePresence>
            {showInput && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex md:flex-row flex-col gap-2"
              >
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full bg-white bg-opacity-5 placeholder:text-white placeholder:text-opacity-30 outline-none rounded-md px-3 py-2 myborder text-xs"
                  placeholder="Enter your key here"
                />
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="bg-white transition-all text-black font-semibold rounded-md  md:w-24 md:p-0 h-8 cursor-pointer flex items-center justify-center myborder text-xs"
                >
                  {loading ? (
                    <div className="">
                      <Loader w={18} h={18} />
                    </div>
                  ) : error ? (
                    <div className=" flex items-center justify-center gap-2">
                      <img src="/retry.png" className="w-3" alt="" />
                      Retry
                    </div>
                  ) : (
                    "Verify"
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add a New Key Button */}
          <motion.div
            onClick={() => {
              setError(false);
              setShowInput(true);
            }}
            className="bg-white bg-opacity-5 rounded-md px-6 py-2 gap-2 cursor-pointer flex items-center justify-center myborder text-xs"
          >
            <img src="/add.png" className="w-4 h-4" alt="" />
            <div className="text-xs">Add a New Key</div>
          </motion.div>

          <div className=" flex-col gap-3 flex">
            <div className="font-semibold">Note:</div>
            <div className="bg-yellow-300 bg-opacity-20  gap-2 text-yellow-200 w-fit border-yellow-200 border-[1px] border-opacity-30 font-semibold rounded-md px-2 py-2 cursor-pointer flex items-center justify-center text-xs">
              <img src="/info.png" className="w-4 h-4" />
              Your API keys will be stored securely in your browser's local
              storage.
            </div>
            <div className=" w-full bg-opacity-5 rounded-md  text-sm">
              Gemini API keys are used to authenticate your requests to the
              Gemini API. You can generate your API key from the Gemini Console.
              <br />
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 my-2  w-fit hover:underline flex gap-2 items-center"
              >
                Click here to generate your API key
                <img src="/open-url.png" className="w-3 h-3" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ApiKeysTab;
