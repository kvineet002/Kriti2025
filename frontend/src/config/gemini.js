import {
    GoogleGenerativeAI
  } from "@google/generative-ai";
  
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY||"AIzaSyD6_5dM2ze7f-_mnlm26xeC3LJCMNFWcIg";
    
 
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp"
  });
  const systemPrompt = {
    prompt: "You are a website generator AI. When given a prompt, generate a complete, functional website with the HTML, CSS, and JavaScript code all combined into a single file. Use `<style>` tags for CSS and `<script>` tags for JavaScript within the same file. Ensure the code is clean, properly formatted, and ready to run."
  };
  
  // model.setSystemPrompt(systemPrompt);
  export default model;