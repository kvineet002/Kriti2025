#  Welcome to ogaTa.ai  

An AI-powered platform that generates websites from user prompts using **Gemini AI**. Users can select pre-existing layouts and color palettes, preview the generated code and website, customize styles, and deploy their websites—all within a seamless interface.  

##  Features  

### 🔹 **Website Generation with AI**  
- Users provide a prompt to generate a website using **Gemini AI**.  
- Websites are enriched with images from **Pexels API**.  
- Users can **reprompt** in the same chat to generate different versions and access all versions.  

### 🔹 **Authentication & User Management**  
- **Google & GitHub OAuth** authentication via **Passport.js**.  
- **JWT Authorization** for secure access.  

### 🔹 **Layouts & Customization**  
- Users can **select layouts & color palettes** before prompting AI.  
- After generation, users can **preview the code & website** before deployment.  
- A **customization page** allows users to:  
  - Modify styles dynamically (DOM updates instantly).  
  - Upload images (stored in **Supabase Storage** with a generated URL).  
  - Undo styling changes (persistent across refresh).  

### 🔹 **Chat History & Sharing**  
- Users can delete or store generated websites in their **chat history**.  
- Users can **mark chats as favorites** for quick access.  
- Chats can be **shared publicly** via a link, allowing non-logged-in users to view.  

### 🔹 **Deployment Options**  
- Users can **deploy the website** and get a shareable link.  
- Websites are deployed on **Railway Server**.  
- Customization changes can be **saved and deployed** directly from the customization page.  

## 🛠️ Tech Stack  

### **Frontend:**  
- **React.js** – For building the interactive user interface.  
- **Tailwind CSS** – For styling and responsive design.  
- **Sandpack** – For live preview of the generated website and code editor.  

### **Backend:**  
- **Express.js** – A Node.js framework used to handle API requests and server-side logic.  
- **Gemini AI** – The AI model used for generating websites from user prompts.  

### **Authentication & Authorization:**  
- **Passport.js** – Handles user authentication using **Google OAuth** and **GitHub OAuth**.  
- **JWT (JSON Web Token)** – Provides secure authorization and session management.  

### **Storage & Image Management:**  
- **Supabase Storage** – Used to store user-uploaded images for generated websites.  
- **Pexels API** – Fetches high-quality images to enhance AI-generated websites.  

### **Deployment:**  
- **Vercel** – Deploys the main **ogaTa.ai** website.  
- **Railway Server** – Deploys the user-generated websites.

-  
## 🚀 How to Run This Website  

Follow these steps to set up and run **ogaTa.ai** on your local machine.  

---
clone the repository
cd repo_name
cd frontend
npm install
cd backend 
npm install
cd surge 
npm install

make env file in both backend and frontend

## backend env
``` 
MONGODB_URI=mongodb+srv://auth-admin:t2YuYPDKGPIztKib@cluster0.s875rof.mongodb.net/Kriti2025(Dihing)-test
ACCESS_TOKEN_SECRET=secret
GOOGLE_CLIENT_ID=781675542290-h3oghumbhbujhb7a46ouglrmlhg0ajei.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23liAYe2GvEle9ryQJ
GITHUB_CLIENT_SECRET=7079802dfbaaf31e89ed89ea8a936a2517017e3f
REDIRECT_URL=http://localhost:3000/redirect
CALLBACK_URL=http://localhost:3003/auth/google/callback
GITHUB_CALLBACK_URL=http://localhost:3003/auth/github/callback
```
## frontend env
``` 
REACT_APP_API_URL=http://localhost:3003
# REACT_APP_API_URL=https://api-kriti2025.vercel.app
REACT_APP_SUPABASE_URL = https://loscqunwjczxithcfshm.supabase.co
REACT_APP_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvc2NxdW53amN6eGl0aGNmc2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTU5MzQsImV4cCI6MjA1MzgzMTkzNH0.Y8rWSpboBLx-de3QMKWY9KwpRSMSGC9xhRNa87FRv_g
REACT_APP_DEPLOY_URL=https://deploy-test-production-1630.up.railway.app
```

## Preview the website here
ogaTa.ai [Link](https://kriti2025-pi.vercel.app/)

---


