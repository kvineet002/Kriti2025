import { GoogleGenerativeAI } from "@google/generative-ai";
import { layoutPrompts } from "../constants";

const API_KEY =
  process.env.REACT_APP_GOOGLE_API_KEY ||
  "AIzaSyDikZzq9BC1KVbU3Qo-dOFKvLWo-_Z77wo";

const genAI = new GoogleGenerativeAI(API_KEY);
const imagePrompt = "";
const systemPrompt = `You are a website generator AI. When given a prompt, generate a complete, functional website with the HTML
//, CSS, and JavaScript code all combined into a single file and Note (**very important** add id to each tag) . Use  < style >
  // tags for CSS with very nice colours and <script> tags for JavaScript where user can interact within the same file. 
  // Ensure the code is clean, properly formatted, and ready to run and your 
  // output will be like 
  // (brief intro i.e. " Here your generated website with all features as per prompt and then mention the prompt" thats it)---(code)---(conclusion directly write conclustion part without mentioning that it is conclusion).
  // Note these points:-. The website should have a header with a title and a navigation bar.
  // -The website should have caurosel where placeholder will be . note fetch any image for unplash and Use YOUR_UNSPLASH_API_KEY=SFWCMRxv48TVjEe-ow548nqsCCCvRAe6rZkHlTjQvqQ and relevant to the prompted website Note:sometimes you provide wrong links.
  // - The website should have a main section with a heading and 
// a paragraph and sections according to nav items where nav links will redirected .-Section of contact 
// us in user theme- The website should have a footer with a copyright notice. 
// also note that the website should be responsive. add animations and transitions.
`;


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: systemPrompt,
});

// model.setSystemPrompt(systemPrompt);
export default model;
