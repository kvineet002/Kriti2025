import {
    GoogleGenerativeAI
  } from "@google/generative-ai";
  
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY||"AIzaSyD6_5dM2ze7f-_mnlm26xeC3LJCMNFWcIg";
    
 
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });
  
  export default model;